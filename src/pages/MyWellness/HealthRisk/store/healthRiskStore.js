import { findHealthRiskService, createHealthRiskService, updateHealthRiskService, 
    deleteHealthRiskService, findOneHealthRiskService} from '../service/healthRiskService'; 

import { observable, action, decorate, computed } from 'mobx';

class HealthRiskStore {
//observables

isLoading=false;
success=false;
error=null;

healthRisks=[];

detailHealthRisk = null;

currentAction=null;
totalCount=0;
limit=10;

findOneHealthRisk(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneHealthRiskService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailHealthRisk = response.data;
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

findAllHealthRisks() {
  let filter = {
  }
  return findHealthRiskService(filter)
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
findHealthRisks(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findHealthRiskService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.healthRisks = response.data.data;
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

createHealthRisk(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createHealthRiskService(body)
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

updateHealthRisk(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateHealthRiskService(id, body)
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
deleteHealthRisk(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteHealthRiskService(id)
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

decorate(HealthRiskStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 healthRisks: observable,
 detailHealthRisk: observable,

 findHealthRisks: action,
 findOneHealthRisk: action,
 createHealthRisk: action,
 updateHealthRisk: action,
 deleteHealthRisk: action

});

export default new HealthRiskStore();