import { findOwnSetting, updateSetting} from '../service/settingService'; 

import { observable, action, decorate, computed } from 'mobx';

class SettingStore {
//observables

isLoading=false;
success=false;
error=null;

appSettings=null;

currentAction=null;

getSetting() {
 this.isLoading = true;
 this.error = undefined;
 return findOwnSetting()
   .then(action(response => {
       if(response && response.data) {
         this.appSettings = response.data.appSettings;
         this.success = true;
         return response.data.appSettings;
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

updateSetting(appSettings) {
 this.isLoading = true;
 this.error = undefined;
 return updateSetting({appSettings})
   .then(action(response => {
     console.log("response",response);
       this.success = true;
   
   }))
   .catch(action((err) => {
    console.log("err", err)
     this.error = err.message;
     this.success = false;
     throw err;
   }))
   .finally(action(() => { this.isLoading = false; }));
}

}

decorate(SettingStore, {

 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,

 getSetting: action,
 updateSetting: action,
});

export default new SettingStore();