
/**
 * SendSMSReturnType
 * 
 * 2021. 4. 17 Changed
 * 
 * @memberof SMS
 * @alias SendSMSReturnType
 */
 export type SendSMSReturnType = {
  isSuccess:    boolean
  status:       number
  statusText:   string
  requestId?:   string
  requestTime?: string
};
