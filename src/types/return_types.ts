

/**
 * ApiClientResponse
 * @template T Data extracted from successful response
 * @memberof ApiClient
 * @alias ApiClientResponse
 */
export type ApiClientResponse<T> = {
  isSuccess: boolean
  data?: T
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
  statusText:   string
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
type MessageResultType = {
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



export type PapagoTranslationReturnType = {
  message: PapagoTranslationMessageType
}

type PapagoTranslationMessageType = {
  '@type': string,
  '@service': string,
  '@version': string,
  result: PapagoTranslationResultType
}

type PapagoTranslationResultType = {
  srcLangType: string
  tarLangType: string
  translatedText: string
}