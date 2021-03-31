import {I18nManager} from 'react-native';
import i18n from 'i18n-js';
import {memoize} from 'lodash';
import {LanguageCodesType, LanguageTokens, Language} from './types';

export const DEFAULT_LANGUAGE: keyof LanguageCodesType = 'en';

export const translationGetters: {[k in keyof LanguageCodesType]: () => any} = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('./locales/en/translations.json'),
  ptBR: () => require('./locales/pt-br/translations.json'),
};

export const translate = memoize(
  (key: keyof LanguageTokens, config?: i18n.TranslateOptions) => i18n.t(key, config),
  (key: keyof LanguageTokens, config?: i18n.TranslateOptions) =>
    config ? key + JSON.stringify(config) : key,
);

export const t = translate;

export const setI18nConfig = (codeLang?: keyof LanguageCodesType) => {
  // fallback if no available language fits
  const fallback: Language = {languageTag: DEFAULT_LANGUAGE, isRTL: false};
  const lang: Language | null = codeLang ? {languageTag: codeLang, isRTL: false} : null;

  const {languageTag, isRTL} = lang ? lang : fallback;

  // clear translation cache
  translate.cache.clear && translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;

  return languageTag;
};
