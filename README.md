# NCP-Client
[![npm version](https://img.shields.io/npm/v/ncp-client.svg?style=flat-square)](https://www.npmjs.org/package/ncp-client) ![travisici](https://travis-ci.com/Hubtwork/NCPClient.svg?branch=master) [![install size](https://packagephobia.com/badge?p=ncp-client)](https://packagephobia.com/result?p=ncp-client) [![npm downloads](https://img.shields.io/npm/dm/ncp-client.svg?style=flat-square)](http://npm-stat.com/charts.html?package=ncp-client)

An easy-to-use typescript wrapper for [Naver Cloud Platform API](https://api.ncloud-docs.com/docs/en/common-ncpapi). With VersionUps, API wrappers will be added and updates.

**Notice )** Always welcome contributions for user's Productivity

## Table of Contents

- [Dependency](#dependency)
- [Installation](#installation)
- [Usage](#usage)
- [Types](#types)
- [API Response Statuses](#api-response-statuses)
- [Current Support](#current-support)

- [Credit](#credit)
- [License](#license)



## Dependency

- axios
- crypto



## Installation

with npm

~~~bash
$ npm install ncp-client
~~~



## Usage

#### Import API Wrapper

~~~javascript
var { SENS } = require('ncp-client')
~~~

#### [ SENS ] SMS API

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
// create SENS api container and get smsService agent.
const sens = new SENS()
const smsService = sens.smsService(ncpAuthKey, smsAuthKey)
~~~

- **SMS Send**

~~~javascript
// type your SMS send parameter 
const sendSMSparam = {
    to: 'recipient phoneNumber',
    content: 'message to send'
}
// to send to multiple people 
const multipleSMSparam = [
  { to: 'r1', content: 'c1'},
  { to: 'r2', content: 'c2'},
  { to: 'r3', content: 'c3'}
]

async function sendMessage() {
  	// if you don't pass countryCode, default countryCode is 82.
    const {isSuccess, data, errorMessage } = await smsService.sendSMS( sendSMSparam, countryCode )
    // write something after async function
    if (isSuccess) {
        // do something with data
    } else {
        // handle with errorMessage
    }
}

~~~



## Types 

**Note)** Introduced types are what you have to create or handle in use *NCP-Client*

Based on Typescript's type alias, several types for api are declared. At this step, you can only show what you will use at each usage.

**Common**

~~~typescript
// NCP api authentication key
type NCPAuthKeyType = {
  // `accessKey` and `secretKey` are access key of 
  accessKey: string
  secretKey: string
}

// Common return value for all NCP api request
type ApiClientResponse<T> = {
  isSuccess: boolean
  // If success, handle with it
  data?: T
  // If failed, handle with it
  errorMessage?: {}
}
~~~

**Send SMS**

~~~typescript
type SendSMSParamType = {
  // `to` is recipient's phone number
  to:           string
  // `content` is text content what you want to send
  content:      string
}

type SendSMSReturnType = {
  // `statusCode` and `statusText` are the HTTP status code / message from the server response
  statusCode: string
  statusText: string
  // `requestId` represents current succesful request's key, `requestTime` represents Datetime string
  requestId:   string
  requestTime: string
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

