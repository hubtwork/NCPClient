import { Method } from "axios"
import { NaverOpenApiAuthType } from "../../types/auth_types"
import { ApiClient, ApiRequest } from "../../utils/api_request"
import { PAPAGOlanguages, PAPAGOlanguageSupports, PAPAGO_preprocessed_KoreanNameRomanizer, PAPAGO_preprocessed_LanguageDetction, PAPAGO_preprocessed_Translation } from '../../types/processing_types'
import { ApiClientResponse, PapagoDetectLanguageReturnType, PapagoKoreanNameRomanizerReturnType, PapagoTranslationReturnType } from "../../types/return_types"
import { ServiceError } from "../../utils/errors"
import { SupportedServices } from "../../types/service_translator"


export class PAPAGO {
  /**
   * The account clientId / clientSecret key pair for NaverOpenAPI authentication
   * 
   * @access private 
   * @type {NaverOpenApiAuthType} 
   * @memberof PAPAGO
   */
  private openApiAuth: NaverOpenApiAuthType
  
  /**
   * The ApiClient for working with http request
   * 
   * @access private 
   * @type {ApiClient} 
   * @memberof PAPAGO
   */
  private client: ApiClient

  /**
   * Creates an instance of PAPAGO service agent.
   * 
   * @param {string} baseURL The baseURL of each session ( based on service )
   * @param {NaverOpenApiAuthType} apiAuth Service identification for using NaverOpenApi
   * @memberof PAPAGO
   */
  constructor(
    baseUrl: string,
    openApiAuth: NaverOpenApiAuthType
  ) {
    this.client = new ApiClient(baseUrl)
    this.openApiAuth = openApiAuth
  }

  /**
   * Construct Translation Service apiRequest. pass source, target language and text want to translate.
   * Input parameter validation is implemented which handles API service Error beforehand request.
   * @async
   * @access public
   * @param {string} source - text's language which want to translate.
   * @param {string} target - language which want to be translated.
   * @param {string} text - text which want to be translated.
   * @returns {Promise<ApiClientResponse<PapagoTranslationReturnType>>} return Promise response of http request with current ApiRequest configs and handle errors
   * @memberof PAPAGO
   */
  public async translation(source: string, target: string, text: string): Promise<ApiClientResponse<PapagoTranslationReturnType, PAPAGO_preprocessed_Translation>> {
    const path = 'nmt/v1/translation'
    const method: Method = 'POST'
    // construct signature and headers
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'X-NCP-APIGW-API-KEY-ID': this.openApiAuth.clientId,
      'X-NCP-APIGW-API-KEY': this.openApiAuth.clientSecret
    }
    const body = {
      source: source,
      target: target,
      text: text
    }
    const apiRequest: ApiRequest = {
      path: path,
      method: method,
      headers: headers,
      body: body,

      service: SupportedServices.PAPAGO_TRANSLATION
    }

    let serviceError: ServiceError | undefined = this.languageSupportValidation(source, target, text)
    return this.client.request<PapagoTranslationReturnType, PAPAGO_preprocessed_Translation>(apiRequest, serviceError)
  }

  /**
   * Construct Detect Language Service apiRequest. pass text want to detect language.
   * Input parameter validation is implemented which handles API service Error beforehand request.
   * @async
   * @access public
   * @param {string} text - text which want to detect language.
   * @returns {Promise<ApiClientResponse<PapagoDetectLanguageReturnType>>} return Promise response of http request with current ApiRequest configs and handle errors
   * @memberof PAPAGO
   */
  public async detectLanguage(text: string): Promise<ApiClientResponse<PapagoDetectLanguageReturnType, PAPAGO_preprocessed_LanguageDetction>> {
    const path = 'langs/v1/dect'
    const method: Method = 'POST'
    // construct signature and headers
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'X-NCP-APIGW-API-KEY-ID': this.openApiAuth.clientId,
      'X-NCP-APIGW-API-KEY': this.openApiAuth.clientSecret
    }
    const body = {
      query: text
    }
    const apiRequest: ApiRequest = {
      path: path,
      method: method,
      headers: headers,
      body: body,

      service: SupportedServices.PAPAGO_LANGUAGE_DETECTION
    }

    let serviceError: ServiceError | undefined = this.detectLanguageValidation(text)
    return this.client.request<PapagoDetectLanguageReturnType, PAPAGO_preprocessed_LanguageDetction>(apiRequest, serviceError)
  }

  /**
   * Construct Korean Name Romanizer Service apiRequest. pass korean name to be romanized analyzation.
   * Input parameter validation is implemented which handles API service Error beforehand request.
   * @async
   * @access public
   * @param {string} koreanName - koreanName which is to be romanized.
   * @returns {Promise<ApiClientResponse<PapagoKoreanNameRomanizerReturnType>>} return Promise response of http request with current ApiRequest configs and handle errors
   * @memberof PAPAGO
   */
  public async koreanNameRominizer(koreanName: string): Promise<ApiClientResponse<PapagoKoreanNameRomanizerReturnType, PAPAGO_preprocessed_KoreanNameRomanizer>> {
    const path = `krdict/v1/romanization?query=${encodeURI(koreanName)}`
    const method: Method = 'GET'
    // construct signature and headers
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'X-NCP-APIGW-API-KEY-ID': this.openApiAuth.clientId,
      'X-NCP-APIGW-API-KEY': this.openApiAuth.clientSecret
    }
    const apiRequest: ApiRequest = {
      path: path,
      method: method,
      headers: headers,

      service: SupportedServices.PAPAGO_KOREAN_NAME_ROMANIZER
    }

    let serviceError: ServiceError | undefined = this.koreanNameRomanizerValidation(koreanName)
    return this.client.request<PapagoKoreanNameRomanizerReturnType, PAPAGO_preprocessed_KoreanNameRomanizer>(apiRequest, serviceError)
  }

  /**
   * Parameter validation for translation Service. 
   * It provides source / target validations with languagesupports, and text validation for length allowable by service.
   * @access private
   * @param {string} source - text's language which want to translate.
   * @param {string} target - language which want to be translated.
   * @param {string} text - text which want to be translated.
   * @returns {ServiceError | undefined} return ServiceError of each error if parameter violate API rules.
   * @memberof PAPAGO
   */
  private languageSupportValidation(source: string, target: string, text: string): ServiceError | undefined {
    // get all Support Languages for translation api 
    const languageSupports: string[] = Object.values(PAPAGOlanguages)
    if (source.length === 0) return new ServiceError("Source parameter is needed, please check it")
    else if (!(languageSupports.includes(source))) return new ServiceError("Unsupported source language, please check it")
    else if (target.length === 0) return new ServiceError("Target parameter is needed, please check it")
    else if (!(languageSupports.includes(target))) return new ServiceError("Unsupported target language, please check it")
    else if (source === target) return new ServiceError("Source and target are identical, please check it")
    else if (!(Object.entries(PAPAGOlanguageSupports).filter(function (s) { return s[0] === source }).map(function (s) { return s[1] })[0].includes(target))) return new ServiceError("There is no source–to-target translator, please check it")
    else if (text.length === 0) return new ServiceError("Text parameter is needed, please check it")
    else if (text.length > 5000) return new ServiceError("Text parameter exceeds the maximum length, please check it")
    return undefined
  }
  
  /**
   * Parameter validation for translation Service. 
   * It provides text validation for length allowable by service.
   * @access private
   * @param {string} text - text which want to detect language.
   * @returns {ServiceError | undefined} return ServiceError of each error if parameter violate API rules.
   * @memberof PAPAGO
   */
  private detectLanguageValidation(text: string): ServiceError | undefined {
    // for detectLanguage, text parameter is needed
    if (text.length === 0) return new ServiceError("Text parameter is needed, please check it")
    return undefined
  }

  /**
   * Parameter validation for translation Service. 
   * It provides name string validation for length, rules allowable by service by regex.
   * @access private
   * @param {string} name - koreanName which is to be romanized.
   * @returns {ServiceError | undefined} return ServiceError of each error if parameter violate API rules.
   * @memberof PAPAGO
   */
  private koreanNameRomanizerValidation(name: string): ServiceError | undefined {
    // for koreanNameRomanazier, name parameter is needed and is to be only korean
    if (name.length === 0) return new ServiceError("KoreanName parameter is needed, please check it")
    else if (!((/^[가-힣]+$/).test(name))) return new ServiceError("Only full Korean name parameter with no white space is allowed, please check it")
    return undefined
  }

}