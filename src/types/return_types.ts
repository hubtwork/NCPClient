

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


export type SearchMessageRequestReturnType = {
  requestId: string
  statusCode: string
  statusName: string
  messages: MessageRequestType[]
}

type MessageRequestType = {
  messageId: string
  requestTime: string
  contentType: string
  countryCode: string
  from: string
  to: string
}

export type SearchMessageResulReturnType = {
  statusCode: string
  statusName: string
  messages: MessageResultType[]
}

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
  // MMS only
  files?: { name: string }[]
}