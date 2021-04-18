
/**
 * NCPAuthKeyType
 * @memberof NCPClient
 * @alias NCPAuthKeyType
 */
export type NCPAuthKeyType = {
  accessKey: string
  secretKey: string
}

export type ApiClientResponse<T> = {
  isSuccess: boolean
  data?: T
  errorMessage?: {}
}

/**
 * SMSserviceAuthType
 * @memberof SMS
 * @alias SMSserviceAuthType
 */
export type SMSserviceAuthType = {
  phone:      string
  serviceId: string
}

/**
 * ApiSignatureParamType
 * @memberof SMS
 * @alias ApiSignatureParamType
 */
 export type ApiSignatureParamType = {
  method: string
  url: string
  ncpAuthKey: NCPAuthKeyType
}

/**
 * ApiSignatureReturnType
 * @memberof SMS
 * @alias ApiSignatureReturnType
 */
 export type ApiSignatureReturnType = {
  timestamp: string
  signature: string
}

