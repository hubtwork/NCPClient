import { SMS } from './clients/sens'
import { NcpClientAuthType, sensSendSMSParameterType, smsEnrolledUserType } from './utils/type'


let userAccount: NcpClientAuthType = {
  accessKey: 'GCk1oT4Yu0SiByPg5rRN',
  secretKey: 'byszL5gtgauX6yRj4DCGHouGFp0HAH6atyQrDM50'
}
let smsAccount: smsEnrolledUserType = {
  phone: '01075187260',
  serviceId: 'ncp:sms:kr:260158038916:pandasaza'
}
let client = new SMS(
  auth
)

const phone = '0107'
const parameter: sensSendSMSParameterType = {
  to: '01075187260',
  content: 'test',
  countryCode: '82'
}

const foo = async () => {
  const response = await client.sendSMS( parameter )
  // write something after async function
  console.log(response)
}

foo()