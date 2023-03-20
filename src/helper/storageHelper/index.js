

export function setRole(role) {
    window.localStorage.setItem('corporate_role', role)
}
export function getRole() {
    return window.localStorage.getItem('corporate_role');
}
export function setToken(token) {
    window.localStorage.setItem('corporate_current_token', token);
}
export function getToken() {
    return window.localStorage.getItem('corporate_current_token')
}

export function setPayorID(payorID) {
    window.localStorage.setItem('corporate_payor_id', payorID)
}

export function getPayorID() {
    return window.localStorage.getItem('corporate_payor_id')
}

export function setFeatures(features) {
    console.log("features", features);
    window.localStorage.setItem('features', JSON.stringify(features));
}
export function getFeatures(features) {
    let featuresJSON =  window.localStorage.getItem('features');
    if(featuresJSON) {
        return JSON.parse(featuresJSON);
    }else return null;
}


export function setAdminAccess(permissions) {
    console.log("permissions", permissions);
    window.localStorage.setItem('permissions', JSON.stringify(permissions));
}
export function getAdminAccess(permissions) {
    let permissionsJSON =  window.localStorage.getItem('permissions');
    if(permissionsJSON) {
        return JSON.parse(permissionsJSON);
    }else return null;
}

export function clearStorage() {
    window.localStorage.removeItem('corporate_role');
    window.localStorage.removeItem('corporate_current_token');
    window.localStorage.removeItem('corporate_payor_id');
    window.localStorage.removeItem('permissions');
}