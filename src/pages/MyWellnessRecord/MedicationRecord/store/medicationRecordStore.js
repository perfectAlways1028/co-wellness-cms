import { findMedicationRecordService, updateMedicationRecordService, 
    deleteMedicationRecordService, findOneMedicationRecordService} from '../service/medicationRecordService'; 

import { observable, action, decorate, computed } from 'mobx';

class MedicationRecordStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

medicationRecords=[];

detailMedicationRecord = null;

currentAction=null;
totalCount=0;
limit=10;

findOneMedicationRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneMedicationRecordService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailMedicationRecord = response.data;
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

findAllMedicationRecords() {
  let filter = {
  }
  return findMedicationRecordService(filter)
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
findMedicationRecords(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findMedicationRecordService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.medicationRecords = response.data.data.medicationRecords;
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

updateMedicationRecord(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateMedicationRecordService(id, body)
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
deleteMedicationRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteMedicationRecordService(id)
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

decorate(MedicationRecordStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 medicationRecords: observable,
 detailMedicationRecord: observable,

 findMedicationRecords: action,
 findOneMedicationRecord: action,
 updateMedicationRecord: action,
 deleteMedicationRecord: action

});

export default new MedicationRecordStore();