import axios, { AxiosInstance, AxiosResponse, Method } from 'axios'

interface ApiRequest {
  path:     string
  method:   Method
  headers:  { [key: string]: string }
  body?:     { [key: string]: any }
}

async function urlRequest(client: AxiosInstance, apiRequest: ApiRequest) : Promise<AxiosResponse> {
  const { path, method, headers, body } = apiRequest
  // url validation
  if (!validateURL(client.defaults.baseURL + apiRequest.path)) throw new ApiError(ApiErrorEnum["invalidURL"])
  return client.request({
    url: path,
    method: method,
    headers: headers,
    data: body
  })
}

enum ApiErrorEnum {
  invalidURL = 'Invalid URL',
  httpStatusCode = `Unexpected HTTP Status Code : `,
  unexpectedResponse = 'Unexpected response from the server'
}

class ApiError extends Error {
  constructor(error: ApiErrorEnum, httpCode?: number) {
    httpCode === undefined ? super(error) : super(`${error} ${httpCode}`)
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

enum NcpError {
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  tooManyRequests = 429,
  internalServerError = 500
}

/**
 * URL validation using regex
 * @param url 
 * @returns 
 */
function validateURL(url: string) {
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
  return (res !== null)
}