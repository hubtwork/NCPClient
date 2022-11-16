import { ApiResponse } from "../models/api.model"
import { ContentType, LookupMessageResponse, LookupReservedMessageResponse, LookupResultResponse, MessageType, MMS_File, SendMessageResponse } from "../models/sms.model"

export interface SmsRepository {
    /**
     * 
     * @param type 
     * @param contentType 
     * @param to 
     * @param content 
     * @param subject 
     * @param files 
     */
    sendMessage(
        type: MessageType, contentType: ContentType,
        to: string|string[], content: string,
        subject?: string, files?: MMS_File[], 
    ): Promise<ApiResponse<SendMessageResponse>>
    /**
     * 
     * @param type 
     * @param contentType 
     * @param to 
     * @param content 
     * @param reserveTime 
     * @param subject 
     * @param files 
     */
    reserveMessage(
        type: MessageType, contentType: ContentType,
        to: string|string[], content: string, reserveTime: string,
        subject?: string, files?: MMS_File[], 
    ): Promise<ApiResponse<SendMessageResponse>>
    /**
     * 
     * @param type 
     * @param contentType 
     * @param to 
     * @param content 
     * @param scheduleCode 
     * @param subject 
     * @param files 
     */
    scheduleMessage(
        type: MessageType, contentType: ContentType,
        to: string|string[], content: string, scheduleCode: string,
        subject?: string, files?: MMS_File[], 
    ): Promise<ApiResponse<SendMessageResponse>>
    /**
     * 
     * @param requestId 
     */
    lookupMessageRequest(
        requestId: string
    ): Promise<ApiResponse<LookupMessageResponse>>
    /**
     * 
     * @param messageId 
     */
    lookupMessageResult(
        messageId: string
    ): Promise<ApiResponse<LookupResultResponse>>
    /**
     * 
     * @param reserveId 
     */
    lookupReservedMessage(
        reserveId: string
    ): Promise<ApiResponse<LookupReservedMessageResponse>>
    /**
     * 
     * @param reserveId 
     */
    cancelReservedMessage(
        reserveId: string
    ): Promise<ApiResponse<null>>
    /**
     * 
     * @param scheduleCode 
     * @param messageId 
     */
    cancelScheduledMessage(
        scheduleCode: string, messageId: string
    ): Promise<ApiResponse<null>>
}
