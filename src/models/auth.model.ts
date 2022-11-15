


/**
 * `Authentication Builder` for NCP Services
 * 
 * @name AuthBuilder
 */
 export const AuthBuilder = {
    // API Scope
    /**
     * 
     * @param accessKey 
     * @param secretKey 
     * @returns 
     * Naver Cloud Platform API account authentication
     */
    API: (accessKey: string, secretKey: string): AuthKey => ({ accessKey, secretKey }),
    // Service Scope
    /**
     * 
     * @param phone 
     * @param serviceId 
     * @returns 
     * SMS Service param authentication
     */
    SMS: (phone: string, serviceId: string): SmsServiceAuth => ({ phone, serviceId }),
}


// -- API Scope
/**
 * `AuthKey` for Naver Cloud Platform API
 * read in (https://api.ncloud-docs.com/docs/common-ncpapi)
 * 
 * @name AuthKey
 * @member accessKey `string` private access key for account
 * @member secretKey `string` private secret key for account
 */
 export interface AuthKey {
    accessKey: string
    secretKey: string
}
/**
 * `AuthParams` in header for Naver Cloud Platform APIs.
 * read in (https://api.ncloud-docs.com/docs/common-ncpapi)
 * 
 * @name AuthParams
 * @member timestamp `string` x-ncp-apigw-timestamp
 * @member signature `string` x-ncp-apigw-signature-v2
 */
export interface AuthParams {
    timestamp: string
    signature: string
}


/**
 * `Authentication` for SMS Service
 * 
 * @name SMSserviceAuth
 * @member phone `string` registered phone number for sms service
 * @member serviceId `string` service id for sms service
 */
export interface SmsServiceAuth {
    phone: string
    serviceId: string
}

/**
 * `Authentication` for Naver Open API
 * 
 * @name NaverOpenApiAuth
 * @member clientId `string` client id for naver open api
 * @member clientSecret `string` secret key for naver open api
 */
export interface NaverOpenApiAuth {
    clientId: string
    clientSecret: string
}
