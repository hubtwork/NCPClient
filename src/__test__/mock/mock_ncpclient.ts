import axios, { AxiosResponse } from "axios"
import { ApiRequest } from "../../utils/network_helper"
import { NCPAuthKeyType } from "../../utils/types"

export class MockNCPClient {

  public readonly ncpAuthKey: NCPAuthKeyType
  private baseURL: string
  constructor(
    ncpAuthKey: NCPAuthKeyType,
    baseUrl: string
  ) {
    this.ncpAuthKey = ncpAuthKey
    this.baseURL = baseUrl
  }

  /**
   * ApiRequest execution
   * 
   * @param {ApiRequest} endpoint - ApiRequest configs for http request
   * @returns {Promise<AxiosResponse>} - return Promise response of http request with current ApiRequest configs
   * 
   */
  public async request(endpoint: ApiRequest): Promise<AxiosResponse> {
    const { path, method, headers, body } = endpoint
    return axios({
      baseURL: this.baseURL,
      url: path,
      method: method,
      headers: headers,
      data: body
    })
  }

}