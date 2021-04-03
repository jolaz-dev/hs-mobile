import {TextInputProps} from 'react-native';

export type FieldValuesState = {[key: string]: string};
export type FieldValidator = (text: string) => string;
export type FieldsWithKey = {[key: string]: Field};
export type ValidationErrorsState = {[key: string]: string};

export interface Field {
  label: string;
  inputProps?: TextInputProps;
  validators?: FieldValidator[];
}
