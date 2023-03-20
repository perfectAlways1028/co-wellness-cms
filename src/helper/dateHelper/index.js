import Moment from 'moment';

export function convertDateForDB(dateString, dateFormat) {
    if(!dateString) return null;
    var momentObj = Moment(dateString);
    var momentString = momentObj.toISOString();
    return momentString
}
export function convertDateForLocale(dateString, dateFormat) {
    var momentObj = Moment(dateString);
    var momentString = momentObj.toLocaleString();
    return momentString
}
  
export function convertDateToDisplay(dateString, dateFormat) {
    if(!dateString) return null;
    var momentObj = Moment(dateString);
    var momentString = momentObj.format('DD MMM YYYY')
    return momentString
}
export function convertDatetimeToDisplay(dateString, dateFormat) {
    if(!dateString) return null;
    var momentObj = Moment(dateString);
    var momentString = momentObj.format('DD MMM YYYY HH:mm:ss')
    return momentString
}