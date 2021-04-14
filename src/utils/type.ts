


export type apiSignatureType = {
  timestamp: string
  signature: string
}

export type apiSignatureParams = {
  method: string
  url: string
  accessKey: string
  secretKey: string
}

export type ncpClientAuthKey = {
  accessKey: string
  secretKey: string
}