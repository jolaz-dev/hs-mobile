import {FieldValidator, FieldValuesState, FieldsWithKey, ValidationErrorsState} from './types';

export const validateField = (validators: FieldValidator[], value: string) => {
  let error = '';
  validators.forEach(validator => {
    const validationError = validator(value);
    if (validationError) {
      error = validationError;
    }
  });
  return error;
};

export const validateFields = (fields: FieldsWithKey, values: FieldValuesState) => {
  const errors: ValidationErrorsState = {};
  const fieldKeys = Object.keys(fields);
  fieldKeys.forEach(key => {
    const field = fields[key];
    const validators = field.validators;
    const value = values[key];
    if (validators && validators.length > 0) {
      const error = validateField(validators, value);

      if (error) {
        errors[key] = error;
      }
    }
  });

  return errors;
};

export const hasValidationError = (errors: ValidationErrorsState) => {
  return Object.values(errors).find(error => error.length > 0);
};
