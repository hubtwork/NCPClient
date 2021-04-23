

/**
 * Enum for API Error represented.
 * Covering from client's error or validation to error for server response
 * @readonly
 * @enum {string} Error Messages
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