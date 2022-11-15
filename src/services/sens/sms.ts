import { Method } from "axios"
import { AuthKey, SmsServiceAuth } from "../../models/auth.model"
import { Message, MMS_File, SendMessageRequest } from "../../models/sms.model"
import { ApiPath } from "../../shared/path.shared"
import { NCPAuthKeyType, SMSserviceAuthType } from "../../types/auth_types"
import { SendSMSParamType } from "../../types/param_types"
import { SENS_preprocessed_SearchMessageRequest, SENS_preprocessed_SearchMessageResult, SENS_preprocessed_SendSMS } from "../../types/processing_types"
import { ApiClientResponse, SendSMSReturnType, SearchMessageRequestReturnType, SearchMessageResultReturnType } from "../../types/return_types"
import { SupportedServices } from "../../types/service_translator"
import { ApiClient, ApiRequest } from "../../utils/api.util"
import { generateApiSignature } from "../../utils/helper"

export class SMS {
  /**
   * The ApiClient for working with http request
   * 
   * @access private 
   * @type {ApiClient} 
   * @memberof SMS
   */
  private client: ApiClient
  
  
  /**
   * The account access Key for API authentication
   * 
   * @access private 
   * @type {NCPAuthKeyType} 
   * @memberof SMS
   */
  private ncpAuthKey: NCPAuthKeyType

  /**
   * The phoneNumber, serviceId for using SMS API
   * 
   * @access private 
   * @type {SMSserviceAuthType} 
   * @memberof SMS
   */
  private smsAuth: SMSserviceAuthType

  /**
   * Creates an instance of SMS service agent.
   * 
   * @param {string} baseURL The baseURL of each session ( based on service )
   * @param {NCPAuthKeyType} ncpAuthKey NCP API authentication data for using API
   * @param {SMSserviceAuthType} smsAuth Service identification for using SMS Service
   * @memberof SMS
   */
  constructor(
    baseUrl: string,
    ncpAuthKey: NCPAuthKeyType,
    smsAuth: SMSserviceAuthType
  ) {
    this.smsAuth = smsAuth
    this.ncpAuthKey = ncpAuthKey
    this.client = new ApiClient(baseUrl)
    
  }
  /**
   * Construct SendSMS Service apiRequest. Generate signature for signing, pass SendSMSParams to body.
   * Single / Multiple send mode supported.
   * @async
   * @access public
   * @param {(SendSMSParamType | SendSMSParamType[])} apiRequest - Message-reference Data with ( to, content ). Single / Multi value passing supported.
   * @param {(number | undefined)} countryCode - CountryCode for recipient. ( default : 82 )
   * @returns {Promise<ApiClientResponse<SendSMSReturnType>>} return Promise response of http request with current ApiRequest configs and handle errors
   * @memberof SMS
   */
  public async sendSMS(smsParam: SendSMSParamType | SendSMSParamType[], countryCode?: number): Promise<ApiClientResponse<SendSMSReturnType, SENS_preprocessed_SendSMS>> {
    // construct path and method
    const path = `/sms/v2/services/${this.smsAuth.serviceId}/messages`
    const method: Method = 'POST'
    // construct signature and headers
    const { timestamp, signature } = generateApiSignature({ method: method, url: path, ncpAuthKey: this.ncpAuthKey })
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': this.ncpAuthKey.accessKey,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    // construct message parameters and body
    countryCode = (countryCode === undefined) ? 82 : countryCode
    smsParam = (smsParam instanceof Array) ? smsParam : [smsParam]
    const body = {
      'type': 'SMS',
      'contentType': 'COMM',
      'countryCode': `${countryCode}`,
      'from': this.smsAuth.phone,
      'content': ' ',
      'messages': smsParam
    }
    const apiRequest: ApiRequest = {
      path: path,
      method: method,
      headers: headers,
      body: body,

      service: SupportedServices.SENS_SEND_SMS
    }
    return this.client.request<SendSMSReturnType, SENS_preprocessed_SendSMS>(apiRequest)
  }

  /**
   * Construct searchMessageRequest Service apiRequest. Generate signature for signing, pass requestId for search.
   * return the requestData for given requestId. It also returns messages info refer to the request.
   * @async
   * @access public
   * @param {string} requestId - requestId which get from response of sendSMS API
   * @returns {Promise<ApiClientResponse<SearchMessageRequestReturnType>>} return Promise response of http request with current ApiRequest configs and handle errors
   * @memberof SMS
   */
  public async searchMessageRequest(requestId: string): Promise<ApiClientResponse<SearchMessageRequestReturnType, SENS_preprocessed_SearchMessageRequest>> {
    // construct path and method
    const path = `/sms/v2/services/${this.smsAuth.serviceId}/messages?requestId=${requestId}`
    const method: Method = 'GET'
    // construct signature and headers
    const { timestamp, signature } = generateApiSignature({ method: method, url: path, ncpAuthKey: this.ncpAuthKey })
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': this.ncpAuthKey.accessKey,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    const apiRequest: ApiRequest = {
      path: path,
      method: method,
      headers: headers,

      service: SupportedServices.SENS_SEARCH_MESSAGE_REQUEST
    }
    return this.client.request<SearchMessageRequestReturnType, SENS_preprocessed_SearchMessageRequest>(apiRequest)
  }

  /**
   * Construct searchMessageResult Service apiRequest. Generate signature for signing, pass requestId for search.
   * return the requestData for given messageId. It also returns messages info refer to the message.
   * It's response data is more detail than searchMessageResult with completeTime, statuses, telcoCode, etc.
   * @async
   * @access public
   * @param {string} messageId - messageId which get from response of searchMessageRequest API
   * @returns {Promise<ApiClientResponse<SearchMessageRequestReturnType>>} return Promise response of http request with current ApiRequest configs and handle errors
   * @memberof SMS
   */
  public async searchMessageResult(messageId: string): Promise<ApiClientResponse<SearchMessageResultReturnType, SENS_preprocessed_SearchMessageResult>> {
    // construct path and method
    const path = `/sms/v2/services/${this.smsAuth.serviceId}/messages/${messageId}`
    const method: Method = 'GET'
    // construct signature and headers
    const { timestamp, signature } = generateApiSignature({ method: method, url: path, ncpAuthKey: this.ncpAuthKey })
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': this.ncpAuthKey.accessKey,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    const apiRequest: ApiRequest = {
      path: path,
      method: method,
      headers: headers,

      service: SupportedServices.SENS_SEARCH_MESSAGE_RESULT
    }
    return this.client.request<SearchMessageResultReturnType, SENS_preprocessed_SearchMessageResult>(apiRequest)
  }

  
}


/**
 * `Request Factory` for building SMS api request
 * 
 * Original sms api has just `Send Message`, `Lookup Message Request`, `Lookup Messsage Result`, 
 * `Lookup Reserved Message`, `Cancel Reserved Message`, `Cancel Scheduled Message`. but we separate
 * each request to specific purpose.
 * 
 * It will wrapped by request provider, `SMS`.
 * 
 * @class
 */
 class SmsRequestFactory {
    /**
     * Naver Cloud Platform account access Key for API authentication
     * 
     * @access private 
     * @type `ApiAuthKey`
     * @memberof SMS
     */
    private authKey: AuthKey
    /**
     * Registered phoneNumber, serviceId for using SMS API
     * 
     * @access private 
     * @type `SMSserviceAuthType`
     * @memberof SMS
     */
    private smsAuth: SmsServiceAuth
    constructor(authKey: AuthKey, smsAuth: SmsServiceAuth) {
        this.authKey = authKey
        this.smsAuth = smsAuth
    }

    private buildSendMessageRequest(): ApiRequest {
        const path = ApiPath.SMS.sendMessage(this.smsAuth.serviceId)
        const method: Method = 'POST'
        const { timestamp, signature } = generateApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
    public SendMessage(
        type: MessageType, contentType: ContentType,
        to: string|string[], content: string,
        subject?: string, files?: MMS_File[], 
    ): ApiRequest {
        const request = this.buildSendMessageRequest()
        const messages: Message[] = Array.isArray(to) ? to.map(x => ({ to: x })) : [{to: to}]
        const body: SendMessageRequest = {
            type: type,
            contentType: contentType,
            countryCode: "82",
            from: this.smsAuth.phone,
            subject: subject,
            content: content,
            messages: messages,
            files: files,
        }
        request.body = body
        return request
    }
    public ReserveMessage(
        type: MessageType, contentType: ContentType,
        to: string|string[], content: string, reserveTime: string,
        subject?: string, files?: MMS_File[], 
    ): ApiRequest {
        const request = this.buildSendMessageRequest()
        const messages: Message[] = Array.isArray(to) ? to.map(x => ({ to: x })) : [{to: to}]
        const body: SendMessageRequest = {
            reserveTime: reserveTime,
            type: type,
            contentType: contentType,
            countryCode: "82",
            from: this.smsAuth.phone,
            subject: subject,
            content: content,
            messages: messages,
            files: files,
        }
        request.body = body
        return request
    }
    public ScheduleMessage(
        type: MessageType, contentType: ContentType,
        to: string|string[], content: string, scheduleCode: string,
        subject?: string, files?: MMS_File[], 
    ): ApiRequest {
        const request = this.buildSendMessageRequest()
        const messages: Message[] = Array.isArray(to) ? to.map(x => ({ to: x })) : [{to: to}]
        const body: SendMessageRequest = {
            scheduleCode: scheduleCode,
            type: type,
            contentType: contentType,
            countryCode: "82",
            from: this.smsAuth.phone,
            subject: subject,
            content: content,
            messages: messages,
            files: files,
        }
        request.body = body
        return request
    }
    public LookupMessageRequest(requestId: string): ApiRequest {
        const path = ApiPath.SMS.lookupMessage(this.smsAuth.serviceId, requestId)
        const method: Method = 'GET'
        const { timestamp, signature } = generateApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
    public LookupMessageResult(messageId: string): ApiRequest {
        const path = ApiPath.SMS.lookupResult(this.smsAuth.serviceId, messageId)
        const method: Method = 'GET'
        const { timestamp, signature } = generateApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
    public LookupReservedMessage(reserveId: string): ApiRequest {
        const path = ApiPath.SMS.lookupReserved(this.smsAuth.serviceId, reserveId)
        const method: Method = 'GET'
        const { timestamp, signature } = generateApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
    public CancelReservedMessage(reserveId: string): ApiRequest {
        const path = ApiPath.SMS.cancelReserved(this.smsAuth.serviceId, reserveId)
        const method: Method = 'DELETE'
        const { timestamp, signature } = generateApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
    public CancelScheduledMessage(scheduleCode: string, messageId: string): ApiRequest {
        const path = ApiPath.SMS.cancelScheduled(this.smsAuth.serviceId, scheduleCode, messageId)
        const method: Method = 'DELETE'
        const { timestamp, signature } = generateApiSignature(method, path, this.authKey)
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.authKey.accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        }
        return {
            path: path,
            method: method,
            headers: headers,
        }
    }
}

/**
 * `Message Type` for each message's style
 * 
 * SMS, LMS, MMS currently supported - last checked : 2022.05.25
 * 
 * @enum `MessageType`
 */
 enum MessageType {
    SMS = 'SMS',
    LMS = 'LMS',
    MMS = 'MMS',
}
/**
 * `Content Type` for each message's style
 * 
 * COMMON, ADVERTISE currently supported - last checked : 2022.05.25
 * 
 * @enum `Content Type`
 */
enum ContentType {
    COMMON = 'COMM',
    ADVERTISE = 'AD',
}