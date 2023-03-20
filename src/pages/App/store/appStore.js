import { findOwnAdminAccessService, findOwnFeaturesService, findMePayorAdminService } from '../service/appService'; 
import { setAdminAccess, setFeatures } from '@helpers/storageHelper';
import { observable, action, decorate, computed } from 'mobx';

class AppStore {
//observables

isLoading=false;
success=false;
error=null;

currentAction=null;
adminAccesses = null;
features = null;
payorAdmin = null;
payor = null;
user = null;
package = null;

findOwnFeatures() {
  this.isLoading = true;
  this.error = undefined;
  return findOwnFeaturesService()
    .then(action(response => {
      console.log("response",response);
        if(response && response.data) {
          this.features = response.data.packageFeatures;
          setFeatures(response.data.packageFeatures);
          this.success = true;
          return response.data.packageFeatures;
        } else {
            this.success = false;
            this.error = 'No data.';
        }
        
    }))
    .catch(action((err) => {
      this.success = false;
      this.error = err.message;
      throw err;
    }))
    .finally(action(() => { this.isLoading = false; }));
}

findOwnAdminAccess() {
    this.isLoading = true;
    this.error = undefined;
    return findOwnAdminAccessService()
      .then(action(response => {
        console.log("response",response);
          if(response && response.data) {
            this.adminAccesses = response.data;
            setAdminAccess(response.data);
            this.success = true;
            return response.data;
          } else {
              this.success = false;
              this.error = 'No data.';
          }
          
      }))
      .catch(action((err) => {
        this.success = false;
        this.error = err.message;
        throw err;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }
  findMePayorAdmin() {
    this.isLoading = true;
    this.error = undefined;
    return findMePayorAdminService()
      .then(action(response => {
        console.log("response",response);
          if(response && response.data) {
            this.payorAdmin = response.data;
            this.user = response.data.user;
            this.payor = response.data.payor;
            this.package = response.data.package;
            this.success = true;
            return response.data;
          } else {
              this.success = false;
              this.error = 'No data.';
          }
          
      }))
      .catch(action((err) => {
        this.success = false;
        this.error = err.message;
        throw err;
      }))
      .finally(action(() => { this.isLoading = false; }));
   }
}


decorate(AppStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 payorAdmin: observable,
  payor: observable,
  user: observable,
  package: observable,

 findOwnAdminAccess: action,
 findMePayorAdmin: action

});

export default new AppStore();