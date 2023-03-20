import { findSleepService, updateSleepService, 
    deleteSleepService, findOneSleepService} from '../service/sleepService'; 

import { observable, action, decorate, computed } from 'mobx';

class SleepStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

sleeps=[];
target = null;
detailSleep = null;

currentAction=null;
totalCount=0;
limit=10;

findOneSleep(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneSleepService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailSleep = response.data;
       
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

findAllSleeps() {
  let filter = {
  }
  return findSleepService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           return response.data;
         }
     }))
     .catch(action((err) => {
       throw err;
     }))
     .finally(action(() => {}));

}

getTarget() {
  return findSleepService({limit: 1})
  .then(action(response => {
    if(response && response.data) {
      this.target = response.data.target;
    } 
  }))
  .catch(action((err) => {
    throw err;
  }))
}
findSleeps(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findSleepService(filter)
     .then(action(response => {
       console.log("sleep response:",response);
         if(response && response.data) {
           this.sleeps = response.data.sleeps;
           this.target = response.data.target;
           this.totalCount = response.data.count;
           this.success = true;
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

updateSleep(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateSleepService(id, body)
   .then(action(response => {
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
deleteSleep(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteSleepService(id)
   .then(action(response => {
     console.log("response",response);
       this.success = true;
   }))
   .catch(action((err) => {

     this.success = false;
     this.error = err.message;
     throw err;
   }))
   .finally(action(() => { this.isLoading = false; }));
}


}

decorate(SleepStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 sleeps: observable,
 detailSleep: observable,

 findSleeps: action,
 findOneSleep: action,
 createSleep: action,
 updateSleep: action,
 deleteSleep: action,
 getTarget: action

});

export default new SleepStore();