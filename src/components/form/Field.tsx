import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Field} from './types';

interface Props {
  fieldName: string;
  field: Field;
  value: string;
  onChangeText: (fieldName: string, value: string) => void;
  error: string;
}

export function FormField({fieldName, field, value, onChangeText, error}: Props) {
  return (
    <View style={styles.inputContainer}>
      <Text>{field.label}</Text>
      <TextInput
        style={styles.input}
        {...field.inputProps}
        value={value}
        onChangeText={text => onChangeText(fieldName, text)}
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  input: {
    height: '40@ms',
    width: '300@ms',
    paddingHorizontal: '5@ms',
    color: 'black',
    backgroundColor: 'white',
    marginBottom: '5@ms',
  },
  inputContainer: {
    marginBottom: '20@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  error: {textAlign: 'center', height: '17.5@ms'},
});
