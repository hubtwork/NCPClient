import axios, { AxiosInstance, AxiosResponse, Method } from 'axios'
import { resolve } from 'node:path'
import { NCPAuthKeyType } from './types'

export class ApiClient {
  
  public readonly ncpAuthKey: NCPAuthKeyType

  private client: AxiosInstance

  constructor(
    ncpAuthKey: NCPAuthKeyType,
    baseURL: string,
    timeout: number = 2000
  )
  {
    this.ncpAuthKey = ncpAuthKey
    this.client = axios.create({
      baseURL: baseURL,
      timeout: timeout,
      
    })
  }

  public async request<T>(apiRequest: ApiRequest): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        urlRequest(this.client, apiRequest)
          .then((response: any) => {
            console.log(typeof response.data)
            resolve(response.data as T)
          })
          .catch((error) => {
            if (error.response) {
              reject(new ApiError(ApiErrorEnum["httpStatusCode"], error.response.status))
            } else if (error.request) {
              console.log(error.request)
              reject(error)
            } else {
              console.log('Error', error.message)
              reject(error)
            }
          })
    })
  }
}

type FailedRequest = {
  
}

export interface ApiRequest {
  path:     string
  method:   Method
  headers: { [key: string]: string }
  body?:     { [key: string]: any }
}

function urlRequest(client: AxiosInstance, apiRequest: ApiRequest) : Promise<AxiosResponse> {
  const { path, method, headers, body } = apiRequest
  // url validation
  //if (!validateURL(client.defaults.baseURL + apiRequest.path)) throw new ApiError(ApiErrorEnum["invalidURL"])
  return client.request({
    url: path,
    method: method,
    headers: headers,
    data: body
  })
}

function request() {

}

enum ApiErrorEnum {
  invalidURL = 'Invalid URL',
  httpStatusCode = `Unexpected HTTP Status Code :`,
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