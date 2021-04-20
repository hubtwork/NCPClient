import { BaseURL } from "../../shared/baseurl"
import { NaverOpenApiAuthType } from "../../types/auth_types"
import { PAPAGO } from "./papago"


export class NaverOpenAPI {
  
  private baseUrl: string = BaseURL.naveropenapi
  
  public papagoService(
    openApiAuth: NaverOpenApiAuthType
  ): PAPAGO {
    return new PAPAGO(this.baseUrl, openApiAuth)
  }

}