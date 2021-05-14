

/**
 * ApiClientResponse
 * @template T Data extracted from successful response
 * @memberof ApiClient
 * @alias ApiClientResponse
 */
export type ApiClientResponse<T, P> = {
  isSuccess: boolean
  data?: T
  preprocessed?: P
  errorMessage?: {}
}

/**
 * SendSMSReturnType
 * 
 * 2021. 4. 17 Changed
 * 
 * @memberof SMS
 * @alias SendSMSReturnType
 */
 export type SendSMSReturnType = {
  statusCode:   string
  statusName:   string
  requestId:   string
  requestTime: string
}

/**
 * SearchMessageRequestReturnType
 * 
 * @memberof SMS
 * @alias SearchMessageRequestReturnType
 */
export type SearchMessageRequestReturnType = {
  requestId: string
  statusCode: string
  statusName: string
  messages: MessageRequestType[]
}

/**
 * MessageRequestType
 * 
 * @memberof SearchMessageRequestReturnType
 * @alias MessageRequestType
 */
type MessageRequestType = {
  messageId: string
  requestTime: string
  contentType: string
  countryCode: string
  from: string
  to: string
}

/**
 * SearchMessageResultReturnType
 * 
 * @memberof SMS
 * @alias SearchMessageResultReturnType
 */
export type SearchMessageResultReturnType = {
  statusCode: string
  statusName: string
  messages: MessageResultType[]
}

/**
 * MessageResultType
 * 
 * @memberof SearchMessageResultReturnType
 * @alias MessageResultType
 */
export type MessageResultType = {
  requestTime: string
  contentType: string
  content: string
  countryCode: string
  from: string
  to: string
  status: string
  statusCode: string
  statusMessage: string
  statusName: string
  completeTime: string
  // ISP
  telcoCode: string
}

/**
 * PapagoTranslationReturnType
 * 
 * @memberof PAPAGO
 * @alias PapagoTranslationReturnType
 */
export type PapagoTranslationReturnType = {
  message: PapagoTranslationMessageType
}

/**
 * PapagoTranslationMessageType
 * 
 * @memberof PapagoTranslationReturnType
 * @alias PapagoTranslationMessageType
 */
type PapagoTranslationMessageType = {
  '@type': string,
  '@service': string,
  '@version': string,
  result: PapagoTranslationResultType
}

/**
 * PapagoTranslationResultType
 * 
 * @memberof PapagoTranslationMessageType
 * @alias PapagoTranslationResultType
 */
type PapagoTranslationResultType = {
  srcLangType: string
  tarLangType: string
  translatedText: string
}

/**
 * PapagoDetectLanguageReturnType
 * 
 * @memberof PAPAGO
 * @alias PapagoDetectLanguageReturnType
 */
export type PapagoDetectLanguageReturnType = {
  langCode: string
}

/**
 * PapagoKoreanNameRomanizerReturnType
 * 
 * @memberof PAPAGO
 * @alias PapagoKoreanNameRomanizerReturnType
 */
export type PapagoKoreanNameRomanizerReturnType = {
  aResult : PapagoKoreanNameRomanizerResultType[]
}

/**
 * PapagoKoreanNameRomanizerResultType
 * 
 * @memberof PapagoKoreanNameRomanizerReturnType
 * @alias PapagoKoreanNameRomanizerResultType
 */
type PapagoKoreanNameRomanizerResultType = {
  sFirstName: string
  aItems: PapagoKoreanNameRomanizerItemType[]
}

/**
 * PapagoKoreanNameRomanizerItemType
 * 
 * @memberof PapagoKoreanNameRomanizerResultType
 * @alias PapagoKoreanNameRomanizerItemType
 */
type PapagoKoreanNameRomanizerItemType = {
  name: string
  score: string
}