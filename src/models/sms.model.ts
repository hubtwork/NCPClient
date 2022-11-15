

/**
 * `Message Type` for each message's style
 * 
 * SMS, LMS, MMS currently supported - last checked : 2022.11.16
 * 
 */
export const MessageType = {
    SMS: 'SMS',
    LMS: 'LMS',
    MMS: 'MMS',
} as const
/**
 * `Content Type` for each message's style
 * 
 * COMMON, ADVERTISE currently supported - last checked : 2022.11.16
 * 
 */
export const ContentType = {
    COMMON: 'COMM',
    ADVERTISE: 'AD',
} as const
/**
 * Base message type for send messaging
 */
export interface Message {
    to: string
    subject?: string
    content?: string
}
/**
 * Form for sending file in MMS on API Call
 */
export interface MMS_File {
    name: string
    body: string
}
/**
 * 
 */
export interface SendMessageRequest {
    type: string
    from: string
    content: string
    messages: Message[]
    // Optional
    // 
    subject?: string
    contentType?: string
    countryCode?: string
    // 
    files?: MMS_File[]
    //
    reserveTime?: string
    reserveTimeZone?: string
    scheduleCode?: string
}

/**
 * `Response` for **Send messages**
 * 
 * @name SendMessageResponse
 * @member requestId `string` unique request id
 * @member requestTime `string` datetime
 * @member statusCode `string` api status code based on http
 * @member statusName `string` **success** or **fail**
 */
 export interface SendMessageResponse {
    requestId: string
    requestTime: string
    statusCode: string
    statusName: string
}

/**
 * `Response` for **Lookup requested messages**
 * 
 * @name LookupMessageResponse
 * @member requestId `string` unique request id
 * @member statusCode `string` api status code based on http
 * @member statusName `string` **success** or **reserved**(waiting for sent) or **scheduled**(waiting for queueing) or **fail**
 * @member messages `MessageRequestData[]` individual message data included in **request id**
 */
 export interface LookupMessageResponse {
    requestId: string
    statusCode: string
    statusName: string
    messages: MessageRequestData[]
}
/**
 * `Data Object` for representing **Send Message Request**
 * 
 * @name MessageRequestData
 * @member messageId `string` unique message id
 * @member requestTime `string` datetime
 * @member contentType `string` **COMM**(common message) or **AD**(advertising message)
 * @member countryCode `string` country code
 * @member from `string` phone number that sent the message
 * @member to `string` phone number that received the message
 */
export interface MessageRequestData {
    messageId: string
    requestTime: string
    contentType: string
    countryCode: string
    from: string
    to: string
}


/**
 * `Response` for **Lookup message results**
 * 
 * @name LookupMessageResponse
 * @member statusCode `string` api status code based on http
 * @member statusName `string` **success** or **fail**
 * @member messages `MessageResultData[]` individual message result data included in **message id**
 */
export interface LookupResultResponse {
    statusCode: string
    statusName: string
    messages: MessageResultData[]
}
/**
 * `Data Object` for representing **Send Message Request**
 * 
 * @name MessageRequestData
 * @member requestTime `string` datetime
 * @member contentType `string` **COMM**(common message) or **AD**(advertising message)
 * @member content `string` message's sent content
 * @member countryCode `string` country code
 * @member from `string` phone number that sent the message
 * @member status `string` phone number that received the message
 * @member statusCode `string` statusCode for receipent
 * @member statusName `string` statusName that represent status code
 * @member completeTime `string` datetime when message sent
 * @member telcoCode `string` telecom company code that provide messaging service
 * @member files `MessageResultFile[]` files which is included in message
 */
export interface MessageResultData {
    requestTime: string
    contentType: string
    content: string
    countryCode: string
    from: string
    to: string
    status: string
    statusCode: string
    statusName: string
    completeTime: string
    telcoCode: string
    // only available for MMS
    files?: MessageResultFile[]
}
/**
 * `File Data` about included in message
 * 
 * @name MessageResultFile
 * @memeber name `string` provided file's name
 */
export interface MessageResultFile {
    name: string
}

/**
 * `Response` for **Lookup reserved message status**
 * 
 * @name LookupReservedMessageResponse
 * @member reserveId `string` unique id for reserved message
 * @member reserveTimeZone `string` timezone where reservation is head for
 * @member reserveTime `string` time that reservation has to be launched
 * @member reserveStatus `string` reservation status : **READY** or **PROCESSING** or **CANCELED** or **FAIL** or **DONE** or **STALE**
 */
export interface LookupReservedMessageResponse {
    reserveId: string
    reserveTimeZone: string
    reserveTime: string
    reserveStatus: string
}
