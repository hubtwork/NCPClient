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

    if (source.length === 0) return this.client.request<PapagoTranslationReturnType>(apiRequest, new ServiceError("Empty Text, please check it"))
    if (target.length === 0) return this.client.request<PapagoTranslationReturnType>(apiRequest, new ServiceError("Empty Text, please check it"))
    return this.client.request<PapagoTranslationReturnType>(apiRequest)
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
    if (text.length === 0) return this.client.request<PapagoDetectLanguageReturnType>(apiRequest, new ServiceError("Empty Text, please check it"))

    return this.client.request<PapagoDetectLanguageReturnType>(apiRequest)
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
    return this.client.request<PapagoKoreanNameRomanizerReturnType>(apiRequest)
  }

  private languageSupportValidation(source: PAPAGOlanguages, target: PAPAGOlanguages): boolean {
    const sourceSupports = Object.keys(PAPAGOlanguageSupports)
    // language support validation
    if (!sourceSupports.includes(source)) {
      // given source is unsupported
      return false
    }
    else if (!PAPAGOlanguageSupports[source].includes(target)) {
      // given target not found in source's supports
      return false
    }
    return true
  }
}