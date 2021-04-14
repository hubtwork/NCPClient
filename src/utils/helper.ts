import crypto from 'crypto'
import { apiSignatureParams, apiSignatureType } from './types';

export class Helper {

  
}

/**
 * 
 * NCP API Signature Constructor
 *  - doc : https://api.ncloud-docs.com/docs/en/common-ncpapi
 *  
 * @param {string} method - NCP API service method
 * @param {string} url - NCP API service url ( include query string )
 * @param {string} accessKey - NCP Account access key id ( from portal or Sub Account )
 * @param {string} secretKey - NCP Account secret key id ( from portal or Sub Account )
 * 
 * @return {apiSignatureType}
 *         Caculated api signature for NCP services 
 *         Format : { Current_timestamp, Caculated_signature }
 */

export function makeSignature({
  method,
  url,
  accessKey,
  secretKey
}: apiSignatureParams): apiSignatureType {
  
  const signParams: string[] = []
  const space = ' ';				// one space
	const newLine = '\n';				// new line
	var timestamp = Date.now().toString()			// current timestamp (epoch)

  var hmac = crypto.createHmac('sha256', secretKey);
  
	signParams.push(method);
	signParams.push(space);
	signParams.push(url);
	signParams.push(newLine);
	signParams.push(timestamp);
	signParams.push(newLine);
  signParams.push(accessKey);

  const signature: string = hmac.update(signParams.join('')).digest('base64')
  
  return {
    timestamp,
    signature
  }
}