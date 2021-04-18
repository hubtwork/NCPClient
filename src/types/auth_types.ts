
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
 * @memberof generateApiSignature
 * @alias ApiSignatureParamType
 */
 export type ApiSignatureParamType = {
  method: string
  url: string
  ncpAuthKey: NCPAuthKeyType
}

/**
 * ApiSignatureReturnType
 * @memberof generateApiSignature
 * @alias ApiSignatureReturnType
 */
 export type ApiSignatureReturnType = {
  timestamp: string
  signature: string
}

