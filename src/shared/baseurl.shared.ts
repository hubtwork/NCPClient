

export enum BaseURL {
  sens = 'https://sens.apigw.ntruss.com',
  naveropenapi = 'https://naveropenapi.apigw.ntruss.com'
}


const ApiUrl = {
    SENS: 'https://sens.apigw.ntruss.com',
    NaverOpenApi: 'https://naveropenapi.apigw.ntruss.com'
} as const

export const BaseUrl = {
    SENS: {
        SMS: `${ApiUrl.SENS}/sms/v2/services`,
    },
    OpenApi: {
        PAPAGO: `${ApiUrl.NaverOpenApi}/nmt/v1/translation`
    },

} as const