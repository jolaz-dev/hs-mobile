import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Button} from 'react-native';

import WebView from 'react-native-webview';
import {useWebRTC} from '../clients/webrtc';
import {getConfigurationSync} from '../configuration';
import {NavigationConsts} from '../consts/navigation-consts';

export function ViewDoorbellScreen() {
  const webRTC = useWebRTC();
  const navigation = useNavigation();
  const [rPiIPAddress] = useState<string | null>(getConfigurationSync('RPI_ADDRESS'));

  const goToSettings = () => {
    navigation.navigate(NavigationConsts.RPI_SETTINGS);
  };

  const formatHtml = () => {
    return (
      '<html><body><img src="' +
      rPiIPAddress +
      '" width="100%" style="background-color: white; min-height: 100%; min-width: 100%; position: fixed; top: 0; left: 0;"></body></html>'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!webRTC.localStream && <Button title="Click to start stream" onPress={webRTC.prepare} />}
      {webRTC.localStream && (
        <Button
          title="Click to start call"
          onPress={webRTC.startCall}
          disabled={!!webRTC.remoteStream}
        />
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
      <View style={styles.rtcview}>
        <WebView
          style={styles.rtc}
          automaticallyAdjustContentInsets={true}
          scalesPageToFit={false}
          startInLoadingState={false}
          contentInset={{top: 0, right: 0, left: 0, bottom: 0}}
          scrollEnabled={false}
          source={{html: formatHtml(), baseUrl: '/'}}
        />
      </View>
      <Button title="Click to stop call" onPress={webRTC.endCall} disabled={!webRTC.remoteStream} />
      <Button
        title="Settings"
        onPress={goToSettings}
        disabled={webRTC.remoteStream !== undefined}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
  toggleButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
