import { getAdminAccess, getFeatures, getRole } from '@helpers/storageHelper';
export function checkPermissionAllowed(page, permission) {
    const role = getRole()
    if(role == 'superadmin') return true;
    let loadedPermissions = getAdminAccess();
    let permissions = loadedPermissions || [];
    var valid = false;
    permissions.forEach(item => {
      if(item.page == page && item[permission] == true) {
        valid = true;
      }
    })
    
    return valid;
}

export function checkFeatureAllowed(feature) {
  const role = getRole()
  if(role == 'superadmin') return true;
  let loadedFeatures = getFeatures();
  let features = loadedFeatures || [];
  var valid = false;
  features.forEach(item => {
    if(item.feature == feature && item.active == true) {
      valid = true;
    }
  })
  
  return valid;
}
