import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, SafeAreaView, StyleSheet, Button} from 'react-native';

import {RTCView} from 'react-native-webrtc';
import {useWebRTC} from '../clients/webrtc';
import {NavigationConsts} from '../consts/navigation-consts';

export function ViewDoorbellScreen() {
  const webRTC = useWebRTC();
  const navigation = useNavigation();

  const goToSettings = () => {
    navigation.navigate(NavigationConsts.RPI_SETTINGS);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!webRTC.localStream && <Button title="Click to start stream" onPress={webRTC.prepare} />}
      {webRTC.localStream && (
        <Button title="Click to start call" onPress={webRTC.startCall} disabled={!!webRTC.remoteStream} />
      )}

      {webRTC.localStream && (
        <View style={styles.toggleButtons}>
          <Button
            title={`${webRTC.muted ? 'Unmute' : 'Mute'}`}
            onPress={webRTC.toggleMute}
            disabled={!webRTC.remoteStream}
          />
        </View>
      )}

      {/* {localStream && (
        <View style={styles.rtcview}>
          <RTCView style={styles.rtc} streamURL={localStream.toURL()} />
        </View>
      )} */}
      <View style={styles.rtcview}>
        {webRTC.remoteStream && <RTCView style={styles.rtc} streamURL={webRTC.remoteStream.toURL()} />}
      </View>
      <Button title="Click to stop call" onPress={webRTC.endCall} disabled={!webRTC.remoteStream} />
      <Button title="Settings" onPress={goToSettings} disabled={webRTC.remoteStream !== undefined} />
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
