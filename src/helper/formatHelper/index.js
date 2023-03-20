
export function formatCurrency(num) {
    return 'Rp. ' + ((num) ? num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "-")
}

export function convertMilisecondsToHours(miliseconds) {
    return Math.floor( Number(miliseconds) / 3600000 )
}

export function convertHoursToMiliseconds(hours) {
    return 3600000 * Number(hours);
}