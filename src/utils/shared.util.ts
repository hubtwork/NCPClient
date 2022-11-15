

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
}

/**
 * formatted 
 * 
 */
export function formatDate(date: Date) {
    return (
        [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
        [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')
    )
}