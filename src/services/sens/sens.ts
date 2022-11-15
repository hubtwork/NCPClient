import { AuthKey, SmsServiceAuth } from '../../models/auth.model'
import { SMS } from './sms'

export class SENS {

    /**
     * Get SENS Service agent.
     * @access public
     * @param {AuthKey} authKey NCP API authentication data for using API
     * @param {SmsServiceAuth} smsAuth Service identification for using SMS Service
     * @returns {SMS} return SMS Service agent
     * @memberof SENS
     */
    public static smsService(
        authKey: AuthKey,
        smsAuth: SmsServiceAuth
    ): SMS {
        return new SMS(authKey, smsAuth)
    }

}


