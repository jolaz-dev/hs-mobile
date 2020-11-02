import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, SafeAreaView, Button, StyleSheet} from 'react-native';

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

export function App() {
  return (
    <SafeAreaView style={styles.container}>
      {!localStream && (
        <Button title="Click to start stream" onPress={startLocalStream} />
      )}
      {localStream && (
        <Button
          title="Click to start call"
          onPress={startCall}
          disabled={!!remoteStream}
        />
      )}

      {localStream && (
        <View style={styles.toggleButtons}>
          <Button
            title={`${isMuted ? 'Unmute' : 'Mute'} stream`}
            onPress={toggleMute}
            disabled={!remoteStream}
          />
        </View>
      )}

      {/* {localStream && (
        <View style={styles.rtcview}>
          <RTCView style={styles.rtc} streamURL={localStream.toURL()} />
        </View>
      )} */}
      <View style={styles.rtcview}>
        {remoteStream && (
          <RTCView style={styles.rtc} streamURL={remoteStream.toURL()} />
        )}
      </View>
      <Button
        title="Click to stop call"
        onPress={closeStreams}
        disabled={!remoteStream}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#313131',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    fontSize: 30,
  },
  rtcview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    width: '80%',
    backgroundColor: 'black',
  },
  rtc: {
    width: '80%',
    height: '100%',
  },
  toggleButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
