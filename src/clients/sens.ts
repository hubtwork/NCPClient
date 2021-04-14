import { ApiRequest, BaseURL, NCPClient } from '../utils/network_helper'
import { NcpClientAuthType, sensSendSMSParameterType, sensSendSMSReturnType, SMSserviceAuthType } from '../utils/types'
import { makeSignature } from '../utils/helper'
import { Method } from 'axios'

export class SENS {
  
  private baseUrl: string = BaseURL.sens

  private client: NCPClient

  constructor(
    authKey: NcpClientAuthType
  ) {
    this.client = new NCPClient(authKey, this.baseUrl)
  }




}

export class Project {
  
}

export class SMS {

  private baseUrl: string
  private client: NCPClient
  
  private smsAuth: SMSserviceAuthType

  constructor(
    accountAuth: NcpClientAuthType,
    smsAuth: SMSserviceAuthType
  ) {
    this.smsAuth = smsAuth
    this.baseUrl = BaseURL.sens
    this.client = new NCPClient(accountAuth, this.baseUrl)
  }

  public async sendSMS(
    {
      to,
      content,
      countryCode = '82'
    }: sensSendSMSParameterType
  ): Promise<sensSendSMSReturnType>
  {
    const apiRequest = new APISendSMS(
      this.client.accountAuth,
      this.smsAuth.serviceId,
      this.smsAuth.phone,
      { to, content, countryCode }
    )
    try {
      const response = await this.client.request(apiRequest)
      if (response.status === 202) {
        return {
          success: true,
          status: response.status,
          msg: response.statusText,
        };
      } else {
        return {
          success: false,
          status: response.status,
          msg: response.statusText,
        };
      }
    } catch(error) {
      return {
        success: false,
        msg: error.response.statusText || 'Internal Server Error',
        status: error.response.status || 500,
      };
    }
  }
  
}

class APISendSMS implements ApiRequest {
  path: string
  method: Method = 'POST'
  headers: { [key: string]: string }
  body?: { [key: string]: any } | undefined

  constructor(
    accountAuth: NcpClientAuthType,
    serviceId: string,
    phone: string,
    { to, content, countryCode }: sensSendSMSParameterType,
  ) {
    this.path = `/sms/v2/services/${serviceId}/messages`
    const { accessKey, secretKey } = accountAuth
    const { timestamp, signature } = makeSignature({ method: this.method, url: this.path, accessKey, secretKey })
    this.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': accessKey,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    this.body = {
      'type': 'SMS',
      'contentType': 'COMM',
      'countryCode': countryCode,
      'from': phone,
      'content': content,
      'messages': [
        {
          'to': to,
        },
      ],
    }
  }
}