import { findPrescriptionService, updatePrescriptionService, 
    deletePrescriptionService, findOnePrescriptionService} from '../service/prescriptionService'; 

import { observable, action, decorate, computed } from 'mobx';

class PrescriptionStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

prescriptions=[];

detailPrescription = null;

currentAction=null;
totalCount=0;
limit=10;

findOnePrescription(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOnePrescriptionService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailPrescription = response.data;
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

findAllPrescriptions() {
  let filter = {
  }
  return findPrescriptionService(filter)
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
findPrescriptions(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findPrescriptionService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.prescriptions = response.data.prescriptions;
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

updatePrescription(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updatePrescriptionService(id, body)
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
deletePrescription(id) {
 this.isLoading = true;
 this.error = undefined;
 return deletePrescriptionService(id)
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

decorate(PrescriptionStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 prescriptions: observable,
 detailPrescription: observable,

 findPrescriptions: action,
 findOnePrescription: action,
 updatePrescription: action,
 deletePrescription: action

});

export default new PrescriptionStore();