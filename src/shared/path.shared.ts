



export const ApiPath = {
    SMS: {
        sendMessage: (serviceId: string) => `/${serviceId}/messages`,
        lookupMessage: (serviceId: string, requestId: string) => `/${serviceId}/messages?requestId=${requestId}`,
        lookupResult: (serviceId: string, messageId: string) => `/${serviceId}/messages/${messageId}`,
        lookupReserved: (serviceId: string, reserveId: string) => `/${serviceId}/reservations/${reserveId}/reserve-status`,
        cancelReserved: (serviceId: string, reserveId: string) => `/${serviceId}/reservations/${reserveId}`,
        cancelScheduled: (serviceId: string, scheduleCode: string, messageId: string) => `/${serviceId}/schedules/${scheduleCode}/messages/${messageId}`,
    },


} as const