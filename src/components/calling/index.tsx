import React from 'react';
import {Platform, NativeModules} from 'react-native';
import RNCallKeep, {AnswerCallPayload, EndCallPayload} from 'react-native-callkeep';
import {NavigationConsts} from '../../consts/navigation-consts';
import * as RootNavigation from '../../navigation/root-navigation';

export class CallingScreen extends React.Component {
  constructor(props: React.ReactPropTypes) {
    super(props);

    // Add RNCallKeep Events
    RNCallKeep.addEventListener('answerCall', this.onAnswerCallAction);
    RNCallKeep.addEventListener('endCall', this.onEndCallAction);
  }

  reportEndCallWithUUID = (callUUID: string, reason: number) => {
    RNCallKeep.reportEndCallWithUUID(callUUID, reason);
  };

  // Event Listener Callbacks

  onAnswerCallAction = ({callUUID}: AnswerCallPayload) => {
    if (Platform.OS === 'android') {
      const {CallkeepHelperModule} = NativeModules;
      CallkeepHelperModule.startActivity();
      RNCallKeep.endCall(callUUID);
    }
    RootNavigation.navigate(NavigationConsts.VIEW_DOORBELL);
  };

  onEndCallAction = ({callUUID}: EndCallPayload) => {
    RNCallKeep.endCall(callUUID);
  };

  render() {
    return null;
  }
}
