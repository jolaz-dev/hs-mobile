import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, SafeAreaView, StyleSheet, ToastAndroid, Button} from 'react-native';

import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  MediaStream,
  MediaStreamConstraints,
  RTCSessionDescriptionType,
  RTCIceCandidate,
  RTCIceCandidateType,
  RTCSessionDescription,
} from 'react-native-webrtc';
import {getConfiguration} from '../configuration';
import {NavigationConsts} from '../consts/navigation-consts';

export function ViewDoorbellScreen() {
  const [ws, setWS] = React.useState<WebSocket | null>(null);
  const [rPiIPAddress, setRPiAddress] = React.useState<string | null>(null);
  const [localStream, setLocalStream] = React.useState<MediaStream>();
  const [remoteStream, setRemoteStream] = React.useState<MediaStream>();
  const [remoteICECandidates, setRemoteICECandidates] = React.useState<RTCIceCandidateType[]>([]);
  const [isRemoteDescriptionSet, setIsRemoteDescriptionSet] = React.useState(false);
  // You'll most likely need to use a STUN server at least. Look into TURN and decide if that's necessary for your project
  const [localPC, setLocalPC] = React.useState<RTCPeerConnection | null>(null);

  const [isMuted, setIsMuted] = React.useState(false);

  const navigation = useNavigation();

  const goToSettings = () => {
    navigation.navigate(NavigationConsts.RPI_SETTINGS);
  };

  const send = (what: string, data?: any, options?: any) => {
    const msg = {
      what,
      data: JSON.stringify(data),
      options: JSON.stringify(options),
    };
    console.log('➡️ Sending message: ', msg);
    ws?.send(JSON.stringify(msg));
  };

  React.useEffect(() => {
    if (!ws) return;

    ws.onopen = () => {
      console.log('🖥️ Connected to the Web Socket!');
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
            console.log('✔️ ICECandidate gathering has completed');
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
    // could also use "addEventListener" for these callbacks, but you'd need to handle removing them as well
    localPC.onicecandidate = e => {
      if (e.candidate) {
        send('addIceCandidate', e.candidate);
      }
    };
    localPC.onaddstream = ev => {
      console.log('🎞️ Adding stream:', ev);
      setRemoteStream(ev.stream);
    };
    localPC.addStream(localStream as MediaStream);
  }, [localPC]);

  const startLocalStream = async () => {
    setRPiAddress(await getConfiguration('RPI_ADDRESS'));
    if (!rPiIPAddress) {
      ToastAndroid.showWithGravity('You need to set RPi IP address first.', ToastAndroid.LONG, ToastAndroid.BOTTOM);
      return;
    }
    // isFront will determine if the initial camera should face user or environment
    // const isFront = true;
    // const devices = await mediaDevices.enumerateDevices();

    // const facing = isFront ? 'front' : 'environment';
    // const videoSourceId = devices.find(
    //   (device: any) => device.kind === 'videoinput' && device.facing === facing,
    // );
    // const facingMode = 'environment';
    const constraints: MediaStreamConstraints = {
      audio: true,
      // video: {
      //   mandatory: {
      //     minWidth: 500, // Provide your own width, height and frame rate here
      //     minHeight: 300,
      //     minFrameRate: 30,
      //   },
      //   facingMode,
      //   optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      // },
      video: false,
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream as MediaStream);
  };

  const startCall = async () => {
    // AddTrack not supported yet, so have to use old school addStream instead
    // newStream.getTracks().forEach(track => localPC.addTrack(track, newStream));
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

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) return;
    localStream?.getAudioTracks().forEach(track => {
      console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  const closeStreams = () => {
    send('hangup');
    localPC?.removeStream(localStream as MediaStream);
    localPC?.close();
    ws?.close();

    setLocalPC(null);
    setWS(null);

    setLocalStream(undefined);
    setRemoteStream(undefined);
  };

  //when somebody sends us an offer
  const handleReceivedOffer = async (offer: RTCSessionDescriptionType) => {
    console.log('🤝 Accepting Offer: ', offer);

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

  //when we got an ice candidate from a remote user
  const handleRemoteICECandidate = (newCandidate: RTCIceCandidateType) => {
    console.log('👇 Candidate received: ', newCandidate);
    setRemoteICECandidates([...remoteICECandidates, newCandidate]);

    if (isRemoteDescriptionSet) {
      remoteICECandidates.forEach(candidate => {
        localPC?.addIceCandidate(new RTCIceCandidate(candidate));
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!localStream && <Button title="Click to start stream" onPress={startLocalStream} />}
      {localStream && <Button title="Click to start call" onPress={startCall} disabled={!!remoteStream} />}

      {localStream && (
        <View style={styles.toggleButtons}>
          <Button title={`${isMuted ? 'Unmute' : 'Mute'}`} onPress={toggleMute} disabled={!remoteStream} />
        </View>
      )}

      {/* {localStream && (
        <View style={styles.rtcview}>
          <RTCView style={styles.rtc} streamURL={localStream.toURL()} />
        </View>
      )} */}
      <View style={styles.rtcview}>
        {remoteStream && <RTCView style={styles.rtc} streamURL={remoteStream.toURL()} />}
      </View>
      <Button title="Click to stop call" onPress={closeStreams} disabled={!remoteStream} />
      <Button title="Settings" onPress={goToSettings} disabled={remoteStream !== undefined} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnHangup: {
    color: 'red',
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  rtcview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    width: '80%',
  },
  rtc: {
    width: '100%',
    height: '100%',
  },
  toggleButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
