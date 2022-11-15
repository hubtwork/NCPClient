import { Method } from 'axios'
import { ErrorDescryption } from './error.model'

/**
 * ApiRequest configs for axios http request
 * 
 * @interface ApiRequest
 * @member path `string` url path for service request  
 * @member method `Method` HTTP Methods for service request ( GET, POST , ... )
 * @member headers `object?` HTTP Header for service request
 * @member body `object?` HTTP Body for service request
 */
export interface ApiRequest {
    path: string
    method: Method
    headers?: { [key: string]: string }
    body?: { [key: string]: any }
}

export interface ApiResponse<T> {
    isSuccess: boolean
    error?: ErrorDescryption
    data?: T
}