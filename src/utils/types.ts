
/**
 * NCPAuthKeyType
 * @memberof NCPClient
 * @alias NCPAuthKeyType
 */
export type NCPAuthKeyType = {
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
  isSuccess:  boolean
  status:     number
  statusText: string
  header?:    {}
  data?:      {}
};
