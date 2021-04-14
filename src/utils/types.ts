

/**
 * NcpClientAuthType
 * @memberof NCPClient
 * @alias NcpClientAuthType
 */
export type NcpClientAuthType = {
  accessKey: string
  secretKey: string
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
  accessKey: string
  secretKey: string
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

/**
 * SendSMSParamType
 * @memberof SMS
 * @alias SendSMSParamType
 */
export type SendSMSParamType = {
  to:           string
  content:      string
  countryCode?: string
}

/**
 * SendSMSReturnType
 * @memberof SMS
 * @alias SendSMSReturnType
 */
export type SendSMSReturnType = {
  success: boolean
  msg:    string
  status: number
};
