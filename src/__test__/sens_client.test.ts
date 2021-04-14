
import { SMS } from '../clients/sens'
import { ncpClientAuthType, smsEnrolledUserType } from '../utils/type';

describe('SMS client test', () => {
  let client: SMS;

  beforeAll(() => {
    const accountAuth: ncpClientAuthType = {
      accessKey: "accessKey",
      secretKey: "secretKey"
    }
    const smsAuth: smsEnrolledUserType = {
      
    }
    client = new SMS(
      {
      },
      {
        phone: '01075187260',
        serviceId: 'ncp:sms:kr:260158038916:pandasaza'
      })
  })
    
  test('send Message Test', async () => {
    
    const response = await client.sendSMS({
      to: '01075187260',
      content: 'test',
      countryCode: '82'
    })
    
    console.log(response.msg)
  })
    
})
