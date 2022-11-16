import axios, { Method } from "axios"
import { ApiRequest, ApiResponse } from "../../../models/api.model"
import { AuthKey, SmsServiceAuth } from "../../../models/auth.model"
import { ContentType, LookupMessageResponse, LookupReservedMessageResponse, LookupResultResponse, Message, MessageType, MMS_File, SendMessageRequest, SendMessageResponse } from "../../../models/sms.model"
import { SmsRepository } from "../../../repository/sms.interface"
import { BaseUrl } from "../../../shared/baseurl.shared"
import { ApiPath } from "../../../shared/path.shared"
import { ApiClient } from "../../../utils/api.util"
import { generateApiSignature } from "../../../utils/helper.util"

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
     * The RequestFactory for provide SMS api request
     * 
     * @access private
     * @class `SMSRequestFactory`
     * @memberof SMS
     */
     private requestFactory: SmsRequestFactory
  
    /**
     * Creates an instance of SMS service agent.
     * 
     * @param authKey `AuthKey` NCP API authentication data for using API
     * @param smsAuth `SmsServiceAuth` Service identification for using SMS Service
     * @memberof SMS
     */
    constructor(
        authKey: AuthKey,
        smsAuth: SmsServiceAuth,
    ) {
        this.client = new ApiClient(BaseUrl.SENS.SMS)
        this.requestFactory = new SmsRequestFactory(authKey, smsAuth)
    }
    /**
     * change authentication info of current sms service instance.
     * @param authKey `AuthKey` 
     * @param smsAuth `SmsServiceAuth` 
     */
    public changeAuthInfo(
        authKey: AuthKey,
        smsAuth: SmsServiceAuth,
    ) {
        this.requestFactory.setAuth(authKey, smsAuth)
    }

    // COMMON Messages
    public async sendSMS(to: string|string[], content: string, isAd: boolean = false): Promise<ApiResponse<SendMessageResponse>> {
        const contentType = (isAd) ? ContentType.ADVERTISE : ContentType.COMMON
        const apiRequest = this.requestFactory.SendMessage(MessageType.SMS, contentType, to, content)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async sendLMS(to: string|string[], subject: string, content: string, isAd: boolean = false): Promise<ApiResponse<SendMessageResponse>> {
        const contentType = (isAd) ? ContentType.ADVERTISE : ContentType.COMMON
        const apiRequest = this.requestFactory.SendMessage(MessageType.LMS, contentType, to, content, subject)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async sendMMS(to: string|string[], subject: string, content: string, isAd: boolean = false, files?: MMS_File[]): Promise<ApiResponse<SendMessageResponse>> {
        const contentType = (isAd) ? ContentType.ADVERTISE : ContentType.COMMON
        const apiRequest = this.requestFactory.SendMessage(MessageType.MMS, contentType, to, content, subject, files)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    // Reserve Message
    public async reserveSMS(to: string|string[], content: string, reserveTime: string, isAd: boolean = false): Promise<ApiResponse<SendMessageResponse>> {
        const contentType = (isAd) ? ContentType.ADVERTISE : ContentType.COMMON
        const apiRequest = this.requestFactory.ReserveMessage(MessageType.SMS, contentType, to, content, reserveTime)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async reserveLMS(to: string|string[], subject: string, content: string, reserveTime: string, isAd: boolean = false): Promise<ApiResponse<SendMessageResponse>> {
        const contentType = (isAd) ? ContentType.ADVERTISE : ContentType.COMMON
        const apiRequest = this.requestFactory.ReserveMessage(MessageType.LMS, contentType, to, content, reserveTime, subject)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async reserveMMS(to: string|string[], subject: string, content: string, reserveTime: string, isAd: boolean = false, files?: MMS_File[]): Promise<ApiResponse<SendMessageResponse>> {
        const contentType = (isAd) ? ContentType.ADVERTISE : ContentType.COMMON
        const apiRequest = this.requestFactory.ReserveMessage(MessageType.MMS, contentType, to, content, reserveTime, subject, files)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    // Schedule Message
    public async scheduleSMS(to: string|string[], content: string, scheduleCode: string, isAd: boolean = false): Promise<ApiResponse<SendMessageResponse>> {
        const contentType = (isAd) ? ContentType.ADVERTISE : ContentType.COMMON
        const apiRequest = this.requestFactory.ScheduleMessage(MessageType.SMS, contentType, to, content, scheduleCode)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async scheduleLMS(to: string|string[], subject: string, content: string, scheduleCode: string, isAd: boolean = false): Promise<ApiResponse<SendMessageResponse>> {
        const contentType = (isAd) ? ContentType.ADVERTISE : ContentType.COMMON
        const apiRequest = this.requestFactory.ScheduleMessage(MessageType.LMS, contentType, to, content, scheduleCode, subject)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    public async scheduleMMS(to: string|string[], subject: string, content: string, scheduleCode: string, isAd: boolean = false, files?: MMS_File[]): Promise<ApiResponse<SendMessageResponse>> {
        const contentType = (isAd) ? ContentType.ADVERTISE : ContentType.COMMON
        const apiRequest = this.requestFactory.ScheduleMessage(MessageType.MMS, contentType, to, content, scheduleCode, subject, files)
        return this.client.request<SendMessageResponse>(apiRequest)
    }
    // Lookup Methods
    public async lookupMessageRequest(requestId: string): Promise<ApiResponse<LookupMessageResponse>> {
        const apiRequest = this.requestFactory.LookupMessageRequest(requestId)
        return this.client.request<LookupMessageResponse>(apiRequest)
    }
    public async lookupMessageResult(messageId: string): Promise<ApiResponse<LookupResultResponse>> {
        const apiRequest = this.requestFactory.LookupMessageResult(messageId)
        return this.client.request<LookupResultResponse>(apiRequest)
    }
    public async lookupReservedMessage(reserveId: string): Promise<ApiResponse<LookupReservedMessageResponse>> {
        const apiRequest = this.requestFactory.LookupReservedMessage(reserveId)
        return this.client.request<LookupReservedMessageResponse>(apiRequest)
    }
    public async cancelReservedMessage(reserveId: string): Promise<ApiResponse<null>> {
        const apiRequest = this.requestFactory.CancelReservedMessage(reserveId)
        return this.client.request<null>(apiRequest)
    }
    public async cancelScheduledMessage(scheduleCode: string, messageId: string): Promise<ApiResponse<null>> {
        const apiRequest = this.requestFactory.CancelScheduledMessage(scheduleCode, messageId)
        return this.client.request<null>(apiRequest)
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
     * @type `SmsServiceAuth`
     * @memberof SMS
     */
    private smsAuth: SmsServiceAuth

    constructor(authKey: AuthKey, smsAuth: SmsServiceAuth) {
        this.authKey = authKey
        this.smsAuth = smsAuth
    }
    /**
     * change authentication of current factory instance
     * @param authKey `AuthKey` 
     * @param smsAuth `SmsServiceAuth` 
     */
    public setAuth(authKey: AuthKey, smsAuth: SmsServiceAuth) {
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
