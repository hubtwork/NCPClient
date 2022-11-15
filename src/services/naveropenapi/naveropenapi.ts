import { BaseURL } from "../../shared/baseurl.shared"
import { NaverOpenApiAuthType } from "../../types/auth_types"
import { PAPAGO } from "./papago"


export class NaverOpenAPI {
  
  private baseUrl: string = BaseURL.naveropenapi
  /**
   * Get PAPAGO Service agent.
   * @access public
   * @param {NaverOpenApiAuthType} apiAuth Service identification for using NaverOpenApi
   * @returns {PAPAGO} return PAPAGO Service agent
   * @memberof NaverOpenAPI
   */
  public papagoService(
    openApiAuth: NaverOpenApiAuthType
  ): PAPAGO {
    return new PAPAGO(this.baseUrl, openApiAuth)
  }

}