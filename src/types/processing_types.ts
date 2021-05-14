import { MessageResultType } from "./return_types"

/**
 * PAPAGOlanguageSupports
 * 
 * @memberof languageSupportValidation
 * @alias PAPAGOlanguageSupports
 */
export const PAPAGOlanguageSupports = {
  ko: ['en', 'ja', 'zh-CN', 'zh-TW', 'vi', 'id', 'th', 'de', 'ru', 'es', 'it', 'fr'],
  en: ['ko', 'ja', 'fr', 'zh-CN', 'zh-TW'],
  ja: ['ko', 'en', 'zh-CN', 'zh-TW'],
  'zh-CN': ['ko', 'en', 'ja', 'zh-TW'],
  'zh-TW': ['ko', 'en', 'ja', 'zh-CN'],
  vi: ['ko', ],
  id: ['ko', ],
  th: ['ko',],
  de: ['ko',],
  ru: ['ko',],
  es: ['ko',],
  it: ['ko'],
  fr: ['ko', 'en']
}

/**
 * PAPAGOlanguages
 * 
 * @memberof languageSupportValidation
 * @alias PAPAGOlanguages
 */
export enum PAPAGOlanguages {
  korean = 'ko',
  english = 'en',
  ja = 'ja',
  simplifiedChinese = 'zh-CN',
  traditionalChinese = 'zh-TW',
  vietnamese = 'vi',
  indonesian = 'id',
  thai = 'th',
  german = 'de',
  russian = 'ru',
  spanish = 'es',
  italian = 'it',
  french = 'fr'
}


export type SENS_preprocessed_SendSMS = {
  result: string,
  requestId: string
}

export type SENS_preprocessed_SearchMessageRequest = {
  result: string,
  requestId: string,
  messageIds: string[]
}

export type SENS_preprocessed_SearchMessageResult = {
  result: string,
  messages: MessageResultType[]
}

export type PAPAGO_preprocessed_Translation = {
  source: string,
  target: string,
  translated: string
}

export type PAPAGO_preprocessed_LanguageDetction = {
  detected: string
}

export type PAPAGO_preprocessed_KoreanNameRomanizer = {
  firstName: string
  bestMatched: object
}