# NCP-Client
[![npm version](https://img.shields.io/npm/v/ncp-client.svg?style=flat-square)](https://www.npmjs.org/package/ncp-client) ![travisici](https://travis-ci.com/Hubtwork/NCPClient.svg?branch=master) [![install size](https://packagephobia.com/badge?p=ncp-client)](https://packagephobia.com/result?p=ncp-client) [![npm downloads](https://img.shields.io/npm/dm/ncp-client.svg?style=flat-square)](http://npm-stat.com/charts.html?package=ncp-client)

An easy-to-use typescript wrapper for [Naver Cloud Platform API](https://api.ncloud-docs.com/docs/en/common-ncpapi). With VersionUps, API wrappers will be added and updates.

**Notice ) ** Always welcome contributions for user's Productivity

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Types](#types)
- [API Response Statuses](#api-response-statuses)
- [Current Support](#current-support)

- [Credit](#credit)
- [License](#license)



## Installation

with npm

~~~bash
$ npm install ncp-client
~~~



## Usage

#### Import API Wrapper

~~~javascript
var ncpclient = require('ncp-client')
~~~

#### (SENS) SMS API

- **Common**

~~~javascript
// type your NCP API Authentication key pair
const ncpAuthKey = {
    accessKey: 'accessKey',
    secretKey: 'secretKey',
}
// type your SMS service key pair
const smsAuthKey = {
    phone: 'phoneNumber',
    serviceId: 'serviceId'
}
// create smsService with parameters
var smsService = new ncpclient.SMS(
    ncpAuthKey,
    smsAuthKey
)
~~~

- **SMS Send**

~~~javascript
// type your SMS send parameter ( countryCode is optional )
const sendSMSparam = {
  	to: 'recipient phoneNumber',
		content: 'message to send',
  	countryCode: '82'
}

async function sendMessage() {
    const {isSuccess, status, statusText, header, data} = await cs.sendSMS( sendSMSparam )
    // do something with response
}

~~~



## Types

Based on Typescript's type alias, several types for api are declared. At this step, you can only show what you will use at each usage.

**NCP Account**

~~~typescript
type NCPAuthKeyType = {
  // `accessKey` and `secretKey` are access key of 
  accessKey: string
  secretKey: string
}
~~~

**SMS Send**

~~~typescript
type SendSMSParamType = {
  // `to` is recipient's phone number
  to:           '01011112345'
  // `content` is text content what you want to send
  content:      'say hi for users'
  // `countryCode` is recipient's country code but 
  countryCode?: '82'
}

type SendSMSReturnType = {
  // `isSuccess` is boolean value that let you know if your request has been successful
  isSuccess:  boolean
  // `status` and `statusText` are the HTTP status code / message from the server response
  status:     number
  statusText: string
  // `header` and `data` are the header / body from the server response ( Only for seccessful Request )
  header?:    {}
  data?:      {}
}
~~~

 

## API Response statuses

API Response status provided by Naver Cloud Platform

| HTTP Status |              Desc               |
| :---------: | :-----------------------------: |
|     202     | Accept (Successfully requested) |
|     400     |           Bad Request           |
|     401     |          Unauthorized           |
|     403     |            Forbidden            |
|     404     |            Not Found            |
|     429     |        Too Many Requests        |
|     500     |      Internal Server Error      |



## Current Support

#### (SENS) SMS API v2

- **SMS Send**



## Credits

- [hubtwork](https://github.com/Hubtwork)



## License

[MIT License](https://github.com/Hubtwork/NCPClient/blob/master/LICENSE)

