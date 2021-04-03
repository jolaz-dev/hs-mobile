import React, {useState} from 'react';
import {KeyboardAvoidingView, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {FormField} from './Field';
import {SubmitButton} from './SubmitButton';
import {FieldValuesState, FieldsWithKey, ValidationErrorsState} from './types';
import {hasValidationError, validateFields} from './validation';

interface Props {
  fields: FieldsWithKey;
  initialValues?: FieldValuesState;
  buttonText?: string;
  action: (...values: string[]) => void | Promise<void>;
}

const getInitialState = (fieldKeys: string[], initialValues?: FieldValuesState) => {
  const state = initialValues || {};
  fieldKeys.forEach(key => {
    if (!state[key]) state[key] = '';
  });

  return state;
};

export function Form({action, fields, buttonText, initialValues}: Props) {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys, initialValues));
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrorsState>(
    getInitialState(fieldKeys),
  );

  const onChangeValue = (key: string, value: string) => {
    const newState = {...values, [key]: value};
    setValues(newState);
  };

  const getValues = () => {
    return fieldKeys.sort().map(key => values[key]);
  };

  const submit = async () => {
    setErrorMessage('');
    setValidationErrors(getInitialState(fieldKeys));

    const errors = validateFields(fields, values);
    if (hasValidationError(errors)) {
      return setValidationErrors(errors);
    }
    try {
      await action(...getValues());
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {fieldKeys.map(key => {
        return (
          <FormField
            key={key}
            fieldName={key}
            field={fields[key]}
            error={validationErrors[key]}
            onChangeText={onChangeValue}
            value={values[key]}
          />
        );
      })}
      <Text style={styles.error}>{errorMessage}</Text>
      <SubmitButton title={buttonText || 'Submit'} onPress={submit} />
    </KeyboardAvoidingView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15@ms',
  },
  error: {
    marginBottom: '20@ms',
    height: '17.5@ms',
  },
});

// See https://scottdomes.com/react-native-sexy-forms/ :)
