import { findRewardTypeService, createRewardTypeService, updateRewardTypeService, 
    deleteRewardTypeService, findOneRewardTypeService} from '../service/rewardTypeService'; 

import { observable, action, decorate, computed } from 'mobx';

class RewardTypeStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

rewardTypes=[];

detailRewardType = null;

currentAction=null;
totalCount=0;
limit=10;

findOneRewardType(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneRewardTypeService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailRewardType = response.data;
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
findAllRewardTypes() {
  this.isLoading = true;
  this.error = undefined;
  return findRewardTypeService({})
    .then(action(response => {
      console.log("response",response);
        if(response && response.data) {
          this.allRewardTypes = response.data.data;
         
          this.success = true;
          return response.data.data;
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
findRewardTypes(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findRewardTypeService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.rewardTypes = response.data.data;
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

createRewardType(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createRewardTypeService(body)
   .then(action(response => {
     this.success = true;
     return response.data;
   }))
   .catch(action((err) => {
     this.success = false;
     this.error = err.message;
     
     throw err;
   }))
   .finally(action(() => { this.isLoading = false; }));
}

updateRewardType(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateRewardTypeService(id, body)
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
deleteRewardType(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteRewardTypeService(id)
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

decorate(RewardTypeStore, {
  isLoadingImage: observable,
  successImage: observable,
  errorImage: observable,

 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 rewardTypes: observable,
 allRewardTypes: observable,
 detailRewardType: observable,

 findRewardTypes: action,
 findOneRewardType: action,
 createRewardType: action,
 updateRewardType: action,
 deleteRewardType: action,
 findAllRewardTypes: action

});

export default new RewardTypeStore();