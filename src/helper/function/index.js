//EVERY FUNCTION TO EXPORT. SUCH AS: CHECK IF PHONE NUMBER IS NUMBER

export function validatePhoneNumber(text) {
  //[0-9] and + symbol
  let regex = /^[0-9\+]+$/;
  return regex.test(String(text)); //return true or false.
}
