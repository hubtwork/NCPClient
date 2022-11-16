import { ApiResponse } from '../../models/api.model';
import { MessageType, ContentType, MMS_File, SendMessageResponse, LookupMessageResponse, LookupResultResponse, LookupReservedMessageResponse } from '../../models/sms.model';
import { SmsRepository } from '../../repository/sms.interface';

export class TestSmsRepository implements SmsRepository {
    sendMessage(type: MessageType, contentType: ContentType, to: string | string[], content: string, subject?: string | undefined, files?: MMS_File[] | undefined): Promise<ApiResponse<SendMessageResponse>> {
        throw new Error('Method not implemented.');
    }
    reserveMessage(type: MessageType, contentType: ContentType, to: string | string[], content: string, reserveTime: string, subject?: string | undefined, files?: MMS_File[] | undefined): Promise<ApiResponse<SendMessageResponse>> {
        throw new Error('Method not implemented.');
    }
    scheduleMessage(type: MessageType, contentType: ContentType, to: string | string[], content: string, scheduleCode: string, subject?: string | undefined, files?: MMS_File[] | undefined): Promise<ApiResponse<SendMessageResponse>> {
        throw new Error('Method not implemented.');
    }
    lookupMessageRequest(requestId: string): Promise<ApiResponse<LookupMessageResponse>> {
        throw new Error('Method not implemented.');
    }
    lookupMessageResult(messageId: string): Promise<ApiResponse<LookupResultResponse>> {
        throw new Error('Method not implemented.');
    }
    lookupReservedMessage(reserveId: string): Promise<ApiResponse<LookupReservedMessageResponse>> {
        throw new Error('Method not implemented.');
    }
    cancelReservedMessage(reserveId: string): Promise<ApiResponse<null>> {
        throw new Error('Method not implemented.');
    }
    cancelScheduledMessage(scheduleCode: string, messageId: string): Promise<ApiResponse<null>> {
        throw new Error('Method not implemented.');
    }

}