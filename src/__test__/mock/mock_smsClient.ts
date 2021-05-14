import { Method } from "axios"
import { NCPAuthKeyType, SMSserviceAuthType } from "../../types/auth_types"
import { SendSMSParamType } from "../../types/param_types"
import { SENS_preprocessed_SendSMS } from "../../types/processing_types"
import { ApiClientResponse, SearchMessageRequestReturnType, SearchMessageResultReturnType, SendSMSReturnType } from "../../types/return_types"
import { SupportedServices } from "../../types/service_translator"
import { generateApiSignature } from "../../utils/helper"
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
    this.client = new MockApiClient(baseUrl)
  }

  public async sendSMS(smsParam: SendSMSParamType | SendSMSParamType[], countryCode?: number): Promise<ApiClientResponse<SendSMSReturnType, SENS_preprocessed_SendSMS>> {
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
      body: body,

      service: SupportedServices.SENS_SEND_SMS
    }
    return this.client.request<SendSMSReturnType, SENS_preprocessed_SendSMS>(apiRequest)
  }

  public async searchMessageRequest(requestId: string): Promise<ApiClientResponse<SearchMessageRequestReturnType>> {
    // construct path and method
    const path = `/sms/v2/services/${this.smsAuth.serviceId}/messages?requestId=${requestId}`
    const method: Method = 'GET'
    // construct signature and headers
    const { timestamp, signature } = generateApiSignature({ method: method, url: path, ncpAuthKey: this.ncpAuthKey })
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': this.ncpAuthKey.accessKey,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    const apiRequest: ApiRequest = {
      path: path,
      method: method,
      headers: headers
    }
    return this.client.request<SearchMessageRequestReturnType>(apiRequest)
  }

  public async searchMessageResult(messageId: string): Promise<ApiClientResponse<SearchMessageResultReturnType>> {
    // construct path and method
    const path = `/sms/v2/services/${this.smsAuth.serviceId}/messages/${messageId}`
    const method: Method = 'GET'
    // construct signature and headers
    const { timestamp, signature } = generateApiSignature({ method: method, url: path, ncpAuthKey: this.ncpAuthKey })
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': this.ncpAuthKey.accessKey,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    const apiRequest: ApiRequest = {
      path: path,
      method: method,
      headers: headers
    }
    return this.client.request<SearchMessageResultReturnType>(apiRequest)
  }


}