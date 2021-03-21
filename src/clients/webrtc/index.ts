import React from 'react';

import {
  RTCPeerConnection,
  mediaDevices,
  MediaStream,
  MediaStreamConstraints,
  RTCSessionDescriptionType,
  RTCIceCandidate,
  RTCIceCandidateType,
  RTCSessionDescription,
} from 'react-native-webrtc';
import {getConfiguration} from '../../configuration';

export const useWebRTC = (): {
  muted: boolean;
  toggleMute: () => void;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
  prepare: () => Promise<void>;
  startCall: () => Promise<void>;
  endCall: () => void;
} => {
  const [ws, setWS] = React.useState<WebSocket | null>(null);
  const [rPiIPAddress, setRPiAddress] = React.useState<string | null>(null);
  const [localStream, setLocalStream] = React.useState<MediaStream>();
  const [remoteStream, setRemoteStream] = React.useState<MediaStream>();
  const [remoteICECandidates, setRemoteICECandidates] = React.useState<RTCIceCandidateType[]>([]);
  const [isRemoteDescriptionSet, setIsRemoteDescriptionSet] = React.useState(false);
  const [localPC, setLocalPC] = React.useState<RTCPeerConnection | null>(null);

  const [muted, setIsMuted] = React.useState(false);

  const send = (what: string, data?: any, options?: any) => {
    const msg = {
      what,
      data: JSON.stringify(data),
      options: JSON.stringify(options),
    };
    console.debug('➡️ Sending message: ', msg);
    ws?.send(JSON.stringify(msg));
  };

  React.useEffect(() => {
    if (!ws) return;

    ws.onopen = () => {
      console.debug('🖥️ Connected to the Web Socket!');
      send('call', null, {
        force_hw_vcodec: false,
        trickle_ice: true,
      });
    };

    ws.onmessage = ev => {
      const msg = JSON.parse(ev.data);

      switch (msg.what) {
        case 'offer':
          handleReceivedOffer(JSON.parse(msg.data));
          break;
        case 'iceCandidate':
          if (msg.data !== '') {
            handleRemoteICECandidate(JSON.parse(msg.data));
          } else {
            console.debug('✔️ ICECandidate gathering has completed');
          }
          break;
        case 'message': {
          console.warn('⚠️ A message was received:', msg);
        }
        default:
          break;
      }
    };
    ws.onerror = err => {
      console.error('🛑 Error on WebSocket: ', err);
    };
  }, [ws]);

  React.useEffect(() => {
    if (!localPC) return;
    localPC.onicecandidate = e => {
      if (e.candidate) {
        send('addIceCandidate', e.candidate);
      }
    };
    localPC.onaddstream = ev => {
      console.debug('🎞️ Adding stream:', ev);
      setRemoteStream(ev.stream);
    };
    localPC.addStream(localStream as MediaStream);
  }, [localPC]);

  const prepare = async () => {
    const newAddress = await getConfiguration('RPI_ADDRESS');
    setRPiAddress(newAddress);
    if (!rPiIPAddress) {
      // TODO: We need some error throwing/handling here
      console.debug('You need to set RPi IP address first.');
      return;
    }

    const constraints: MediaStreamConstraints = {
      audio: true,
      video: false,
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream as MediaStream);
  };

  const startCall = async () => {
    const newLocalPC = new RTCPeerConnection({
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302', `stun:${rPiIPAddress}:3478`],
        },
      ],
    });
    setLocalPC(newLocalPC);
    setWS(new WebSocket(`ws://${rPiIPAddress}:8080/stream/webrtc`));
  };

  const toggleMute = () => {
    if (!remoteStream) return;
    localStream?.getAudioTracks().forEach(track => {
      console.debug(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  const endCall = () => {
    send('hangup');
    localPC?.removeStream(localStream as MediaStream);
    localPC?.close();
    ws?.close();

    setLocalPC(null);
    setWS(null);

    setLocalStream(undefined);
    setRemoteStream(undefined);
  };

  const handleReceivedOffer = async (offer: RTCSessionDescriptionType) => {
    console.debug('🤝 Accepting Offer: ', offer);

    try {
      await localPC?.setRemoteDescription(new RTCSessionDescription(offer));
      setIsRemoteDescriptionSet(true);

      const answer = await localPC?.createAnswer();
      localPC?.setLocalDescription(answer as RTCSessionDescriptionType);

      send('answer', answer);
    } catch (err) {
      console.error('🛑 Received Offer Error:', err);
    }
  };

  const handleRemoteICECandidate = (newCandidate: RTCIceCandidateType) => {
    console.debug('👇 Candidate received: ', newCandidate);
    setRemoteICECandidates([...remoteICECandidates, newCandidate]);

    if (isRemoteDescriptionSet) {
      remoteICECandidates.forEach(candidate => {
        localPC?.addIceCandidate(new RTCIceCandidate(candidate));
      });
    }
  };

  return {
    muted,
    toggleMute,
    localStream,
    remoteStream,
    prepare,
    startCall,
    endCall,
  };
};
