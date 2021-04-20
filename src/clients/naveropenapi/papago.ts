import { Method } from "axios"
import { NaverOpenApiAuthType } from "../../types/auth_types"
import { ApiClient, ApiRequest } from "../../utils/api_request"
import { PAPAGOlanguages, PAPAGOlanguageSupports } from '../../types/processing_types'
import { ApiClientResponse, PapagoTranslationReturnType } from "../../types/return_types"


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
    return this.client.request<PapagoTranslationReturnType>(apiRequest)
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