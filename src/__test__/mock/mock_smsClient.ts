import { Method } from "axios"
import { SendSMSParamType } from "../../types/param_types"
import { SendSMSReturnType } from "../../types/return_types"
import { generateApiSignature } from "../../utils/helper"
import { NCPAuthKeyType, SMSserviceAuthType, ApiClientResponse } from "../../utils/types"
import { ApiRequest, MockApiClient } from "./mock_apiClient"


export class MockSMS {

  private client: MockApiClient
  
  private ncpAuthKey: NCPAuthKeyType
  private smsAuth: SMSserviceAuthType

  constructor(
    baseUrl: string,
    ncpAuthKey: NCPAuthKeyType,
    smsAuth: SMSserviceAuthType
  ) {
    this.smsAuth = smsAuth
    this.ncpAuthKey = ncpAuthKey
    this.client = new MockApiClient(ncpAuthKey, baseUrl)
  }

  public async sendSMS(smsParam: SendSMSParamType | SendSMSParamType[], countryCode?: number): Promise<ApiClientResponse<SendSMSReturnType>> {
    // construct path and method
    const path = `/sms/v2/services/${this.smsAuth.serviceId}/messages`
    const method: Method = 'POST'
    // construct signature and headers
    const { timestamp, signature } = generateApiSignature({ method: method, url: path, ncpAuthKey: this.ncpAuthKey })
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': this.ncpAuthKey.accessKey,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    // construct message parameters and body
    smsParam = (smsParam instanceof Array) ? smsParam : [smsParam]
    const body = {
      'type': 'SMS',
      'contentType': 'COMM',
      'countryCode': countryCode,
      'from': this.smsAuth.phone,
      'content': ' ',
      'messages': smsParam
    }
    const apiRequest: ApiRequest = {
      path: path,
      method: method,
      headers: headers,
      body: body
    }
    return this.client.request<SendSMSReturnType>(apiRequest)
  }
}