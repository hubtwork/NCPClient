const axios = require('axios');
import { ApiRequest, NCPClient } from '../utils/network_helper';
import { ncpClientAuthKey } from '../utils/type';

describe('NCP Client', () => {
  let ncp: NCPClient;

  beforeAll(() => {
    ncp = new NCPClient(
      {
        accessKey: "accessKey",
        secretKey: "secretKey"
      },
      "http://localhost:3000"
    )
  })

  test('create NCPClient', () => {
    expect(
      () =>
        new NCPClient(
          {
            accessKey: "accessKey",
            secretKey: "secretKey"
          },
          "http://localhost:3000"
        )
    ).not.toThrow()
  })

  test('request Test on Local', async () => {
    const apiRequest: ApiRequest = {
      path: '/static/schools',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    const response = await ncp.request(apiRequest)
    console.log(response.config)
    expect(response.status).toEqual(200)
  })
  
})