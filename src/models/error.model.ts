
export interface ErrorDescryption {
    code: string
    message: string

    debug(): string
}

/**
 * 
 * @param {string} code 
 * @param {string} message 
 * @returns 
 */
const genError = (code: string, message: string): ErrorDescryption => ({ 
    code: code,
    message: message,
    debug() { return `(error)[${code}] ${message}` }
})


export const ErrorDescryptions = {

    Client: {
        UnhandledError:     genError('E00', 'Unhandled client error, ask hubtwork@gmail.com'),
        // Configuration Errors, Invalid arguments ( 0x )
        InvalidUrl:         genError('E01', 'Invalid Url'),
        InvalidRequest:     genError('E02', 'Request configuration is invalid'),

        // Request Errors, generate by response ( 1x )
        UnexpectedResponse: genError('E11', 'Response with unexpected data format, ask hubtwork@gmail.com.'),
        NoResponse:         genError('E12', 'No response from server, please check network.'),
    },

    Http: {
        // http status code for services
        NoContent:          genError('204', 'Operation success, but no content.'),
        BadRequest:         genError('400', 'Bad Request, check your request.'),
        Unauthorized:       genError('401', 'Unauthorized access.'),
        Forbidden:          genError('403', 'Forbidden, check your authorization.'),
        NotFound:           genError('404', 'Endpoint Not Found, check your request.'),
        TooManyRequests:    genError('429', 'Too many requests sent, please try in a while.'),
        InternalError:      genError('500', 'Server Error, please try in a while.'),
    },

    UnhandledError:     genError('000', 'Unhandled error occurred, ask hubtwork@gmail.com'),

} as const

export const parseHttpError = (httpStatusCode: number): ErrorDescryption => {
    switch(httpStatusCode) {
        case 204: return ErrorDescryptions.Http.NoContent
        case 400: return ErrorDescryptions.Http.BadRequest
        case 401: return ErrorDescryptions.Http.Unauthorized
        case 403: return ErrorDescryptions.Http.Forbidden
        case 404: return ErrorDescryptions.Http.NotFound
        case 429: return ErrorDescryptions.Http.TooManyRequests
        case 500: return ErrorDescryptions.Http.InternalError
        default: return ErrorDescryptions.UnhandledError
    }
}


export class ClientError extends Error {
    private desc: ErrorDescryption

    /**
     * 
     * @param desc `string` Error cases which can be handled by NCP Client service
     */
    private constructor(desc: ErrorDescryption) {
        super()
        this.desc = desc

        // explicitly declare built-in class extension ( Error )
        Object.setPrototypeOf(this, ClientError.prototype)
    }
    
    public get(): ErrorDescryption { return this.desc }
    /**
     * 
     * @param desc error descryption
     * @returns {ClientError}
     */
    static e = (desc: ErrorDescryption): ClientError => new ClientError(desc)
}
