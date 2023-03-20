/**
 * Store the value
 * @param cname Cookie name
 * @param cvalue Cookie value
 * @param exp Expiration date, in mili second
 */
export function setCookie(cname, cvalue, exp) {
  const date = new Date();
  date.setTime(date.getTime() + exp);
  const expires = date.toUTCString();
  document.cookie = `${cname}=${cvalue};expires=${expires}`;
}

/**
 * function that returns the value of a specified cookie
 * @param cname Cookie name
 */
export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
}

export function deleteCookiesByName(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}
