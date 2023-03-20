import { findJobService, createJobService, updateJobService, 
    deleteJobService, findOneJobService} from '../service/jobService'; 

import { observable, action, decorate, computed } from 'mobx';

class JobStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

jobs=[];

detailJob = null;

currentAction=null;
totalCount=0;
limit=10;

findOneJob(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneJobService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailJob = response.data;
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

findAllJobs(filter) {

  return findJobService(filter ? filter : {})
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           return response.data.data;
         }
     }))
     .catch(action((err) => {
       throw err;
     }))
     .finally(action(() => {}));

}
findJobs(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findJobService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.jobs = response.data.data;
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

createJob(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createJobService(body)
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

updateJob(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateJobService(id, body)
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
deleteJob(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteJobService(id)
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

decorate(JobStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 jobs: observable,
 detailJob: observable,

 findJobs: action,
 findOneJob: action,
 createJob: action,
 updateJob: action,
 deleteJob: action

});

export default new JobStore();