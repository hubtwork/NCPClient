

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
  requestId?:   string
  requestTime?: string
};
