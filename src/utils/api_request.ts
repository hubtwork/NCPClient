import axios, { Method } from 'axios'

interface ApiRequest {
  path:     string
  method:   Method
  headers:  { [key: string]: string }
  body?:     { [key: string]: any }
}

enum ApiError {
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  tooManyRequests = 429,
  internalServerError = 500
}

/**
 * URL validation using regex
 * @param url 
 * @returns 
 */
function isValidURL(url: string) {
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
  return (res !== null)
}