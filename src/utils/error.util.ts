




export interface ErrorType {
    code: string
    message: string
}

/**
 * 
 * @param {string} code 
 * @param {string} message 
 * @returns 
 */
const genError = (code: string, message: string): ErrorType => ({ code: code, message: message })


export const ErrorCode = {

    Client: {
        // Configuration Errors, Invalid arguments ( 0x )
        InvalidUrl:         genError('E01', 'Invalid Url'),
        InvalidRequest:     genError('E02', 'Request configuration is invalid'),

        // Request Errors, generate by response ( 1x )
        UnexpectedResponse: genError('E11', 'Response with unexpected data format, ask hubtwork@gmail.com.'),
        NoResponse:         genError('E12', 'No response from server, please check network.'),
    },

    Http: {
        // http status code for services
        NoContent:          genError('H204', 'Operation success, but no content.'),
        BadRequest:         genError('H400', 'Bad Request, check your request.'),
        Unauthorized:       genError('H401', 'Unauthorized access.'),
        Forbidden:          genError('H403', 'Forbidden, check your authorization.'),
        NotFound:           genError('H404', 'Endpoint Not Found, check your request.'),
        TooManyRequests:    genError('H429', 'Too many requests sent, please try in a while.'),
        InternalError:      genError('H500', 'Server Error, please try in a while.'),
    },

}

export class ClientError extends Error {
    private error: ErrorType
    /**
     * 
     * @param error `string` Error cases which can be handled by NCP Client service
     */
    constructor(error: ErrorType) {
        super()
        this.error = error
        Object.setPrototypeOf(this, ClientError.prototype)
    }
    get(): ErrorType {
        return this.error
    }
}
