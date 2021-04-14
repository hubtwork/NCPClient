import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, Method } from 'axios'
import { ncpClientAuthKey } from './type'

//  sms : `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`
//  push : `https://sens.apigw.ntruss.com/push/v2/services/${serviceId}/users`

/**
 *
 *
 * @export
 * @class NCPClient
 */
export class NCPClient {

  /**
   * The account access Key for API authentication
   *
   * @type {string}
   * @memberof NCPClient
   */
  public readonly accessKey: string

  /**
   * The account  key for API authentication
   *
   * @type {string}
   * @memberof NCPClient
   */
  public readonly secretKey: string

  /**
   * The axios instance for Web Client
   *
   * @private
   * @type {AxiosInstance}
   * @memberof NCPClient
   */
  private client: AxiosInstance
  
  /**
   * Creates an instance of ApiClient.
   * @memberof NCPClient
   */
  constructor(
    authKey: ncpClientAuthKey,
    baseUrl: string
  ) {
    const { accessKey, secretKey } = authKey
    this.accessKey = accessKey
    this.secretKey = secretKey
    this.client = axios.create({
      baseURL: baseUrl
    })
  }
  
  public async request(endpoint: ApiRequest): Promise<AxiosResponse> {
    const { path, method, headers, body } = endpoint
    return this.client.request({
      url: path,
      method: method,
      headers: headers,
      data: body
    })
  }

}

export interface ApiRequest {
  path:     string
  method:   Method
  headers:  { [key: string]: string }
  body?:     { [key: string]: any }
}

export enum ApiError {
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  tooManyRequests = 429,
  internalServerError = 500
}


export enum BaseURL {
  sens = 'https://sens.apigw.ntruss.com/',

}