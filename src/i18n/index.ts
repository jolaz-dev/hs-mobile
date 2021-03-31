import {I18nManager} from 'react-native';
import i18n from 'i18n-js';
import {memoize} from 'lodash';
import * as RNLocalize from 'react-native-localize';
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

  // Use RNLocalize to detect the user system language
  const {languageTag, isRTL} = lang
    ? lang
    : RNLocalize.findBestAvailableLanguage(
        Object.keys(translationGetters).map(tag =>
          tag.length === 4 ? `${tag.substr(0, 2)}-${tag.substr(2, 2)}` : tag,
        ),
      ) || fallback;

  // clear translation cache
  translate.cache.clear && translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {
    [languageTag]: translationGetters[languageTag.replace('-', '') as keyof LanguageCodesType](),
  };
  i18n.locale = languageTag;

  return languageTag as keyof LanguageCodesType;
};
