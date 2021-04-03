import React from 'react';
import {TouchableWithoutFeedback, View, Text, GestureResponderEvent} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  title: string;
  onPress: (ev: GestureResponderEvent) => void;
}

export function SubmitButton({title, onPress}: Props) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: '#3F5EFB',
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    width: '250@ms',
    elevation: 4,
    borderRadius: 8,
    height: '50@ms',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '80@ms',
  },
  text: {
    color: 'white',
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
});
