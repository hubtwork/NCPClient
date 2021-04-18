import axios, { AxiosResponse, Method } from 'axios'
import { NCPAuthKeyType } from '../../types/auth_types'
import { ApiClientResponse } from '../../types/return_types'

export class MockApiClient {
  
  public readonly ncpAuthKey: NCPAuthKeyType

  private baseURL: string
  private timeout: number

  constructor(
    ncpAuthKey: NCPAuthKeyType,
    baseURL: string,
    timeout: number = 2000
  )
  {
    this.ncpAuthKey = ncpAuthKey
    this.baseURL = baseURL
    this.timeout = timeout
  }

  public async request<T>(apiRequest: ApiRequest): Promise<ApiClientResponse<T>> {
    try {
      const val = await this.createRequest<T>(apiRequest)
      return {
        isSuccess: true,
        data: val
      }
    } catch (error) {
      return {
        isSuccess: false,
        errorMessage: error.message
      }
    }
  }

  private async createRequest<T>(apiRequest: ApiRequest): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        this.urlRequest(apiRequest)
          .then((response: any) => {
            resolve(response.data as T)
          })
          .catch((error) => {
            if (error.response) {
              reject(new ApiError(ApiErrorEnum["httpStatusCode"], error.response.status))
            } else if (error.request) {
              reject(new ApiError(ApiErrorEnum["noResponseFromServer"]))
            } else {
              reject(new ApiError(ApiErrorEnum["requestConfigurationError"]))
            }
          })
    })
  }

  private urlRequest(apiRequest: ApiRequest) : Promise<AxiosResponse> {
    const { path, method, headers, body } = apiRequest
    // url validation
    if (!this.validateURL(this.baseURL + apiRequest.path)) throw new ApiError(ApiErrorEnum["invalidURL"])
    return axios({
      baseURL: this.baseURL,
      timeout: this.timeout,
      
      url: path,
      method: method,
      headers: headers,
      data: body
    })
  }
  
  /**
   * URL validation using regex
   * @param url 
   * @returns 
   */
  private validateURL(url: string): boolean {
    var res = url.match(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)
    return (res !== null)
  }
}

export interface ApiRequest {
  path:     string
  method:   Method
  headers: { [key: string]: string }
  body?:     { [key: string]: any }
}


enum ApiErrorEnum {
  invalidURL = 'Invalid URL',
  httpStatusCode = `Unexpected HTTP Status Code :`,
  unexpectedResponse = 'Unexpected response from the server',
  noResponseFromServer = 'No response from the server',
  requestConfigurationError ='Error occured during setup request'
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