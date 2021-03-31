import i18n from 'i18n-js';
import React from 'react';

export type LanguageCodesType = {
  en: string;
  ptBR: string;
};

export type Language = {
  languageTag: keyof LanguageCodesType;
  isRTL: boolean;
};

export type LanguageTokens = {
  ViewDoorBell: string;
  MainGate: string;
  Settings: string;
};

export interface LocalizationContextType {
  t: (token: keyof LanguageTokens, options?: i18n.TranslateOptions) => string;
  locale: keyof LanguageCodesType;
  setLocale?: React.Dispatch<React.SetStateAction<keyof LanguageCodesType>>;
}
