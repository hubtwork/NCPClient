


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

    Common: {
        // Configuration Errors, Invalid arguments ( 0x )
        InvalidUrl:         genError('E01', 'Invalid Url'),
        InvalidRequest:     genError('E02', 'Request configuration is invalid'),

        // Request Errors, generate by response ( 1x )
        UnexpectedResponse: genError('E11', 'Response with unexpected data format, ask hubtwork@gmail.com.'),
        NoResponse:         genError('E12', 'No response from server, please check network.'),
    },

    SENS: {

    }

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



/**
 * Enum for API Error represented.
 * Covering from client's error or validation to error for server response
 * @readonly
 * @param {string} Error - Messages
 * 
 * ErrorCode Description
 * 
 */

 export enum ApiErrorEnum {
  invalidURL = 'Invalid URL',
  httpStatusCode = `Unexpected HTTP Status Code :`,
  unexpectedResponse = 'Unexpected response from the server',
  noResponseFromServer = 'No response from the server',
  requestConfigurationError ='Error occured during setup request'
}

export class ApiError extends Error {
  constructor(error: ApiErrorEnum, httpCode?: number) {
    httpCode === undefined ? super(error) : super(`${error} ${httpCode}`)
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export class ServiceError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage)
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}


/**
 * Enum for Errors by http status code which provided by NCP SENS API
 * @readonly
 * @enum {number} Http Status Code
 */
 enum SENS_Error {
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  tooManyRequests = 429,
  internalServerError = 500
 }

 /**
 * Enum for Errors by http status code which provided by NCP PAPAGO API
 * @readonly
 * @enum {number} Http Status Code
 */
  enum PAPAGO_Error {
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    tooManyRequests = 429,
    internalServerError = 500
  }