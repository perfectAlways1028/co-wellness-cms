import { findStairService, updateStairService, 
    deleteStairService, findOneStairService} from '../service/stairService'; 

import { observable, action, decorate, computed } from 'mobx';

class StairStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

stairs=[];
target = null;
detailStair = null;

currentAction=null;
totalCount=0;
limit=10;

findOneStair(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneStairService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailStair = response.data;
       
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

findAllStairs() {
  let filter = {
  }
  return findStairService(filter)
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
  return findStairService({limit: 1})
  .then(action(response => {
    if(response && response.data) {
      this.target = response.data.target;
    } 
  }))
  .catch(action((err) => {
    throw err;
  }))
}
findStairs(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findStairService(filter)
     .then(action(response => {
       console.log("stair response:",response);
         if(response && response.data) {
           this.stairs = response.data.stairs;
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

updateStair(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateStairService(id, body)
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
deleteStair(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteStairService(id)
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

decorate(StairStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 stairs: observable,
 detailStair: observable,

 findStairs: action,
 findOneStair: action,
 createStair: action,
 updateStair: action,
 deleteStair: action,
 getTarget: action

});

export default new StairStore();