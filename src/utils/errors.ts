

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