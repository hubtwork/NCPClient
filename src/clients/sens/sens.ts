import { BaseURL } from '../../shared/baseurl'
import { NCPAuthKeyType, SMSserviceAuthType } from '../../types/auth_types'
import { SMS } from './sms'

export class SENS {
  
  private baseUrl: string = BaseURL.sens
  /**
   * Get SendSMS Service agent.
   * @access public
   * @param {NCPAuthKeyType} ncpAuthKey NCP API authentication data for using API
   * @param {SMSserviceAuthType} smsAuth Service identification for using SMS Service
   * @returns {SMS} return SMS Service agent
   * @memberof SENS
   */
  public smsService(
    ncpAuthKey: NCPAuthKeyType,
    smsAuth: SMSserviceAuthType
  ): SMS {
    return new SMS(this.baseUrl, ncpAuthKey, smsAuth)
  }

}



export class Project {
  
}