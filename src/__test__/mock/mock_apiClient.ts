import axios, { AxiosResponse, Method } from 'axios'
import { ApiClientResponse, PapagoDetectLanguageReturnType, PapagoKoreanNameRomanizerReturnType, PapagoTranslationReturnType } from '../../types/return_types'
import { ResponseTranslator, SupportedServices } from '../../types/service_translator'
import { ServiceError } from '../../utils/errors'

export class MockApiClient {

  private baseURL: string
  private timeout: number

  constructor(
    baseURL: string,
    timeout: number = 2000
  )
  {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  public async request<T extends object, P extends object>(apiRequest: ApiRequest, serviceError?: ServiceError): Promise<ApiClientResponse<T, P>> {
    try {
      if (serviceError) throw serviceError
      const val = await this.createRequest<T>(apiRequest)
      const preprocessed = this.preprocessingServerResponse(val, apiRequest) as P
      return {
        isSuccess: true,
        data: val,
        preprocessed: preprocessed
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

  private preprocessingServerResponse(val: object, apiRequest: ApiRequest) {
    switch(apiRequest.service) {
      case SupportedServices.PAPAGO_TRANSLATION:
        return ResponseTranslator.papagoTranslation(val as PapagoTranslationReturnType)
      case SupportedServices.PAPAGO_LANGUAGE_DETECTION:
        return ResponseTranslator.papagoLanguageDetection(val as PapagoDetectLanguageReturnType)
      case SupportedServices.PAPAGO_KOREAN_NAME_ROMANIZER:
        return ResponseTranslator.papagoKoreanNameRomanizer(val as PapagoKoreanNameRomanizerReturnType)
      default : 
        return {}
    }
  }
}

export interface ApiRequest {
  path:     string
  method:   Method
  headers: { [key: string]: string }
  body?:     { [key: string]: any }

  service?: SupportedServices
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