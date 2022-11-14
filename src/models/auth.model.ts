


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
    API: (accessKey: string, secretKey: string): ApiAuthKey => ({ accessKey, secretKey }),
    // Service Scope
    /**
     * 
     * @param phone 
     * @param serviceId 
     * @returns 
     * SMS Service param authentication
     */
    SMS: (phone: string, serviceId: string): SMSserviceAuth => ({ phone, serviceId }),
}


// -- API Scope
/**
 * `Authentication` for Naver Cloud Platform API
 * 
 * @name ApiAuthKey
 * @member accessKey `string` private access key for account
 * @member secretKey `string` private secret key for account
 */
 export type ApiAuthKey = {
    accessKey: string
    secretKey: string
}

// -- Service Scope
/**
 * `Authentication` for SMS Service
 * 
 * @name SMSserviceAuth
 * @member phone `string` registered phone number for sms service
 * @member serviceId `string` service id for sms service
 */
export type SMSserviceAuth = {
    phone: string
    serviceId: string
}

// -- API Signature Scope
/**
 * `API Signature` for Naver Cloud Platform Services.
 * 
 * @name ApiSignature
 * @member timestamp `string` timestamp
 * @member signature `string` encrypted signature
 */
export type ApiSignature = {
    timestamp: string
    signature: string
}
