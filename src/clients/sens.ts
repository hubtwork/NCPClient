import { ApiRequest, BaseURL, NCPClient } from '../utils/network_helper'
import { NCPAuthKeyType, SendSMSParamType, SendSMSReturnType, SMSserviceAuthType } from '../utils/types'
import { generateApiSignature } from '../utils/helper'
import { Method } from 'axios'

export class SENS {
  
  private baseUrl: string = BaseURL.sens

  private client: NCPClient

  constructor(
    ncpAuthKey: NCPAuthKeyType
  ) {
    this.client = new NCPClient(ncpAuthKey, this.baseUrl)
  }

}

export class Project {
  
}