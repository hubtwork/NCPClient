

//  sms : `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`
//  push : `https://sens.apigw.ntruss.com/push/v2/services/${serviceId}/users`


interface API {
  path:     string
  method:   string
  headers:  { [key: string]: string }
  body:     { [key: string]: any }
}

