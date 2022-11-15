


interface SmsRepository {
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
}
