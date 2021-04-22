import { Method } from "axios"
import { NaverOpenApiAuthType } from "../../types/auth_types"
import { ApiClient, ApiRequest } from "../../utils/api_request"
import { PAPAGOlanguages, PAPAGOlanguageSupports } from '../../types/processing_types'
import { ApiClientResponse, PapagoDetectLanguageReturnType, PapagoKoreanNameRomanizerReturnType, PapagoTranslationReturnType } from "../../types/return_types"
import { ServiceError } from "../../utils/errors"


export class PAPAGO {

  private openApiAuth: NaverOpenApiAuthType

  private client: ApiClient

  constructor(
    baseUrl: string,
    openApiAuth: NaverOpenApiAuthType
  ) {
    this.client = new ApiClient(baseUrl)
    this.openApiAuth = openApiAuth
  }

  public async translation(source: string, target: string, text: string): Promise<ApiClientResponse<PapagoTranslationReturnType>> {
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
      body: body
    }

    let serviceError: ServiceError | undefined = this.languageSupportValidation(source, target, text)
    
    return this.client.request<PapagoTranslationReturnType>(apiRequest, serviceError)
  }

  public async detectLanguage(text: string): Promise<ApiClientResponse<PapagoDetectLanguageReturnType>> {
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
      body: body
    }
    let serviceError: ServiceError | undefined = this.detectLanguageValidation(text)
    
    return this.client.request<PapagoDetectLanguageReturnType>(apiRequest, serviceError)
  }

  public async koreanNameRominizer(koreanName: string): Promise<ApiClientResponse<PapagoKoreanNameRomanizerReturnType>> {
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
      headers: headers
    }

    let serviceError: ServiceError | undefined = this.koreanNameRomanizerValidation(koreanName)
    return this.client.request<PapagoKoreanNameRomanizerReturnType>(apiRequest, serviceError)
  }

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
    else if (target.length > 5000) return new ServiceError("Text parameter exceeds the maximum length, please check it")
    return undefined
  }
  
  private detectLanguageValidation(text: string): ServiceError | undefined {

    if (text.length === 0) return new ServiceError("Empty Text, please check it")
    return undefined
  }

  private koreanNameRomanizerValidation(name: string): ServiceError | undefined {

    return undefined
  }

}