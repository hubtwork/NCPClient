import { Method } from "axios"
import { SendSMSParamType } from "../../types/param_types"
import { SendSMSReturnType } from "../../types/return_types"
import { generateApiSignature } from "../../utils/helper"
import { NCPClient, BaseURL, ApiRequest } from "../../utils/network_helper"
import { SMSserviceAuthType, NCPAuthKeyType } from "../../utils/types"

export class SMS {

  private baseUrl: string
  private client: NCPClient
  
  private smsAuth: SMSserviceAuthType
  
  /**
   * 
   * Construct SMS Service Manager
   * 
   * @template {NCPAuthKeyType} NCPAuthKeyType - NCP API Authentication Key Pair
   * @param {string} accessKey Access Key ID
   * @param {string} secretKey Secret Key
   * 
   * @template {SMSserviceAuthType} SMSserviceAuthType - NCP SMS Service Required Key Pair
   * @param {string} phone Registered Caller ID ( Phone Number )
   * @param {string} serviceId OPEN API serviceId
   * 
   * @memberof SMS
   */
  constructor(
    ncpAuthKey: NCPAuthKeyType,
    smsAuth: SMSserviceAuthType
  ) {
    this.smsAuth = smsAuth
    this.baseUrl = BaseURL.sens
    this.client = new NCPClient(ncpAuthKey, this.baseUrl)
  }


  /**
   * 
   * Service - Send SMS message
   * 
   * @template {SendSMSParamType} SendSMSParamType - NCP SMS Service Message 
   * @param {string} to Recipient's phone number
   * @param {string} content Message content to send
   * @param {?string} countryCode Recipient's country code (default 82)
   * 
   * @template {SendSMSReturnType} SendSMSReturnType - NCP SMS Service responses
   * @returns {boolean} isSuccess Check if request is successful
   * @returns {number} status Http status code from response
   * @returns {string} statusText Http status text from response 
   * @returns {?jsonObject} data Data from response ( If request is successful )
   * 
   * @memberof SMS
   */
  public async sendSMS(
    smsParam: SendSMSParamType
  ): Promise<SendSMSReturnType>
  {
    // construct Api Request for sendSMS service.
    const apiRequest = new APISendSMS(
      this.client.ncpAuthKey,
      this.smsAuth,
      smsParam
    )
    try {
      const response = await this.client.request(apiRequest)
      if (response.status === 202) {
        return {
          isSuccess: true,  
          status: response.status,
          statusText: response.statusText,
          requestId: response.data.requestId,
          requestTime: response.data.requestTime
        }
      } else {
        return {
          isSuccess: false,  
          status: response.status,
          statusText: response.statusText,
        }
      }
    } catch (error) {
      return {
        isSuccess: false,
        status: error.response.status || 500,
        statusText: error.response.statusText || 'Internal Server Error',
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
    ncpAuthKey: NCPAuthKeyType,
    smsAuth: SMSserviceAuthType,
    smsParam: SendSMSParamType,
  ) {
    const { accessKey, secretKey } = ncpAuthKey
    const { phone, serviceId } = smsAuth
    const { to, content } = smsParam
    const countryCode = '82'
    this.path = `/sms/v2/services/${serviceId}/messages`
    const { timestamp, signature } = generateApiSignature({ method: this.method, url: this.path, ncpAuthKey })
    this.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': accessKey,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    // construct recipient list
    /*
    const recipients: {}[] = []
    for (var recipient of to) {
      recipients.push({'to': recipient,})
    }
    */
    this.body = {
      'type': 'SMS',
      'contentType': 'COMM',
      'countryCode': countryCode,
      'from': phone,
      'content': content,
      'messages': [{
        to: to,
      },
      ],
    }
  }
}