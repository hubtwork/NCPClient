import { lstat } from "node:fs";
import { PAPAGO_preprocessed_KoreanNameRomanizer, PAPAGO_preprocessed_LanguageDetction, PAPAGO_preprocessed_Translation, SENS_preprocessed_SearchMessageRequest, SENS_preprocessed_SendSMS } from "./processing_types";
import { PapagoDetectLanguageReturnType, PapagoKoreanNameRomanizerReturnType, PapagoTranslationReturnType, SearchMessageRequestReturnType, SearchMessageResultReturnType, SendSMSReturnType } from "./return_types";


export enum SupportedServices {
    // SENS
    // SMS
    SENS_SEND_SMS = "SensSendSMS",
    SENS_SEARCH_MESSAGE_REQUEST = "SensSearchMessageRequest",
    SENS_SEARCH_MESSAGE_RESULT = "SensSearchMessageResult",

    // NaverOpenAPI
    // PAPAGO
    PAPAGO_TRANSLATION = "PapagoTranslation",
    PAPAGO_LANGUAGE_DETECTION = "PapagoLanguageDetection",
    PAPAGO_KOREAN_NAME_ROMANIZER = "PapagoKoreanNameRomanizer"
}

export class ResponseTranslator {

    // SENS
    public static sensSendSMS(val: SendSMSReturnType): SENS_preprocessed_SendSMS {
        return {
            result: val.statusCode,
            requestId: val.requestId
        }
    }
    public static sensSearchMessageRequest(val: SearchMessageRequestReturnType): SENS_preprocessed_SearchMessageRequest {
        return {
            result: val.statusName,
            requestId: val.requestId,
            messageIds: val.messages.map(it => it.messageId)
        }
    }
    public static sensSearchMessageResult(val: SearchMessageResultReturnType) {
        const messages = val.messages
        return {
            result: val.statusName,
            messages: messages
        }
    }

    // PAPAGO
    public static papagoTranslation(val: PapagoTranslationReturnType): PAPAGO_preprocessed_Translation {
        const result = val.message.result
        return {
            source: result.srcLangType,
            target: result.tarLangType,
            translated: result.translatedText
        }
    }
    public static papagoLanguageDetection(val: PapagoDetectLanguageReturnType): PAPAGO_preprocessed_LanguageDetction {
        return {
            detected: val.langCode 
        }
    }
    public static papagoKoreanNameRomanizer(val: PapagoKoreanNameRomanizerReturnType): PAPAGO_preprocessed_KoreanNameRomanizer {
        const result = val.aResult[0]
        return {
            firstName: result.sFirstName,
            bestMatched: result.aItems[0]
        }
    }

}