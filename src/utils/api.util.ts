import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ApiError, ApiErrorEnum } from './errors.util'
import { ApiRequest, ApiResponse } from '../models/api.model'
import { ClientError, ErrorDescryptions, parseHttpError } from '../models/error.model'


export class ApiClient {
  
  /**
   * The session expressed by Wrapped AxiosInstance
   * 
   * @access private
   * @type {AxiosInstance} 
   * @memberof ApiClient
   */
  private client: AxiosInstance

  /**
   * Creates an instance of ApiClient.
   * 
   * @param {string} baseURL The baseURL of each session ( based on service )
   * @param {(number | undefined)} timeout Timeout configuration ( millisecond )
   * @memberof ApiClient
   */
  constructor(
    baseURL: string,
    timeout: number = 2000
  )
  {
    this.client = axios.create({
      baseURL: baseURL,
      timeout: timeout,
    })
  }

  /**
   * Executing request and wrapping it with ApiClientResponse
   *  will return ApiClientResponse if success, with data else with error message
   * 
   * @template T - Data type matched with each API's response
   * @async
   * @access public
   * @param {ApiRequest} apiRequest - ApiRequest configs for request
   * @returns {Promise<ApiClientResponse<T>>} return Promise response of wrapped with error handling
   * @memberof ApiClient
   */
  public async request<T extends object | null>(apiRequest: ApiRequest): Promise<ApiResponse<T>> {
        try {
            const val = await this.createRequest<T>(apiRequest)
            return {
                isSuccess: true,
                data: val,
            }
        } catch (err) {
            const e: ClientError = (err instanceof ClientError) ? err : ClientError.e(ErrorDescryptions.UnhandledError)
            return {
                isSuccess: false,
                error: e.get(),
            }
        }
  }
  /**
   * Execute request and return Promise with error or response if success
   *  Wrapping axios-request with Promise's resolve / reject for error handling 
   * 
   * @template T - Data type matched with each API's response
   * @access private
   * @param {ApiRequest} apiRequest - ApiRequest configs for request
   * @returns {Promise<T>} return Promise response of http request with current ApiRequest configs and handle errors
   * @memberof ApiClient
   */
  private createRequest<T>(apiRequest: ApiRequest): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        this.urlRequest(apiRequest)
          .then((response: any) => {
            resolve(response.data as T)
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const httpError = parseHttpError(error.response.status)
                    reject(ClientError.e(httpError))
                } else if (error.request) {
                    reject(ClientError.e(ErrorDescryptions.Client.NoResponse))
                } else {
                    reject(ClientError.e(ErrorDescryptions.Client.InvalidRequest))
                }
            } else if (error instanceof ClientError) {
                // error when validating url
                reject(error)
            } else {
                // unexpected error
                reject(ClientError.e(ErrorDescryptions.UnhandledError))
            }

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

  /**
   * Return configured AxiosInstance's request execution
   *  Before launch axios-request, launch url validation if invalid, throw Error else return AxiosResponses
   * 
   * @access private
   * @param {ApiRequest} apiRequest - ApiRequest configs for request
   * @returns {Promise<AxiosResponse>} return Promise response of http request with current ApiRequest configs and handle errors
   * @memberof ApiClient
   */
  private urlRequest(apiRequest: ApiRequest) : Promise<AxiosResponse> {
    const { path, method, headers, body } = apiRequest
    // url validation
    if (!this.validateURL(this.client.defaults.baseURL + apiRequest.path)) throw ClientError.e(ErrorDescryptions.Client.InvalidUrl)
    return this.client.request({
      url: path,
      method: method,
      headers: headers,
      data: body,
    })
  }
  
  /**
   * URL validation using regex
   * @access private
   * @param url 
   * @returns {boolean}
   * @memberof ApiClient
   */
   private validateURL(url: string): boolean {
    var res = url.match(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)
    return (res !== null)
  }
}
