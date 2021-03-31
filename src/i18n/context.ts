import React from 'react';
import {LocalizationContextType} from './types';
import * as appi18n from './';

const defaultContextValue: LocalizationContextType = {
  t: appi18n.t,
  locale: appi18n.DEFAULT_LANGUAGE,
};

const LocalizationContext = React.createContext<LocalizationContextType>(defaultContextValue);

export default LocalizationContext;
