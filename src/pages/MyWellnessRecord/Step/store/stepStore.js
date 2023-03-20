import { findStepService, updateStepService, 
    deleteStepService, findOneStepService} from '../service/stepService'; 

import { observable, action, decorate, computed } from 'mobx';

class StepStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

steps=[];
target = null;
detailStep = null;

currentAction=null;
totalCount=0;
limit=10;

findOneStep(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneStepService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailStep = response.data;
       
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

findAllSteps() {
  let filter = {
  }
  return findStepService(filter)
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
  return findStepService({limit: 1})
  .then(action(response => {
    if(response && response.data) {
      this.target = response.data.target;
    } 
  }))
  .catch(action((err) => {
    throw err;
  }))
}
findSteps(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findStepService(filter)
     .then(action(response => {
       console.log("step response:",response);
         if(response && response.data) {
           this.steps = response.data.steps;
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

updateStep(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateStepService(id, body)
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
deleteStep(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteStepService(id)
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

decorate(StepStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 steps: observable,
 detailStep: observable,

 findSteps: action,
 findOneStep: action,
 createStep: action,
 updateStep: action,
 deleteStep: action,
 getTarget: action

});

export default new StepStore();