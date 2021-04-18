## Changes

## v 1.0.4 ( 2021. 4. 18 )

#### ApiRequest clarity guaranteed

- `ApiRequest` will be used more clearly to request **http requests**
- `ApiRequest` represent **root Interface that defines the configuration** for the request

#### ApiClient, the request Wrapper added

- After this updates, no pure `axiosInstance.request` will be used

- `ApiClient` , custom request wrapper **handles errors** and **return uniformed custom response**

- **Error Handling** - url validation, error response from server / other reasons

- **Uniformed Response** 

  ~~~typescript
  type ApiClientResponse = {
    isSuccess: boolean
    // if isSuccess, will contain data and no errorMessage
    data?: T
    // if isFailed, will contain errorMessage and no data
    errorMessage?: {}
  }
  ~~~

#### [ SENS - SMS service ] SendSMS support Multi-mode

- `sendSMS` will support **sending SMS to multiple people**
- User can pass param `SendSMSParamType[]` if want to send to multiple SMS at the same time

#### Ensure API Service scalability 

  - Other NCP API Service will be added continuously, so consider **scalability**.

- `SMS` Service agent can be generated like below

  ~~~javascript
  var { SENS } = require('ncp-client')
  ...
  const sens = new SENS()
  const smsService = sens.smsService(ncpAuthKey, smsAuthKey)
  ~~~

  

