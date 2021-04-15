import { SMS } from './clients/sens'
import { NCPAuthKeyType, SMSserviceAuthType, SendSMSParamType } from './utils/types'


let ncpAuthKey: NCPAuthKeyType = {
  accessKey: 'GCk1oT4Yu0SiByPg5rRN',
  secretKey: 'byszL5gtgauX6yRj4DCGHouGFp0HAH6atyQrDM50'
}
let smsAuth: SMSserviceAuthType = {
  phone: '01075187260',
  serviceId: 'ncp:sms:kr:260158038916:pandasaza'
}
let client = new SMS(
  ncpAuthKey,
  smsAuth
)

const parameter: SendSMSParamType = {
  to: '01075187260',
  content: 'test'
}

const foo = async () => {
  const response = await client.sendSMS( parameter )
  // write something after async function
  console.log(response)
}

foo()