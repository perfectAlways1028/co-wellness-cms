import { findSymptomRecordService, updateSymptomRecordService, 
    deleteSymptomRecordService, findOneSymptomRecordService} from '../service/symptomRecordService'; 

import { observable, action, decorate, computed } from 'mobx';

class SymptomRecordStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

symptomsRecord=[];

detailSymptomRecord = null;

currentAction=null;
totalCount=0;
limit=10;

findOneSymptomRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneSymptomRecordService(id)
   .then(action(response => {
       if(response && response.data) {
         console.log("response", response);
         this.detailSymptomRecord = response.data;
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

findAllSymptomRecords() {
  let filter = {
  }
  return findSymptomRecordService(filter)
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
findSymptomRecords(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findSymptomRecordService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.symptomsRecord = response.data.data.symptomsRecords;
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

updateSymptomRecord(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateSymptomRecordService(id, body)
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
deleteSymptomRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteSymptomRecordService(id)
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

decorate(SymptomRecordStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 symptomsRecord: observable,
 detailSymptomRecord: observable,

 findSymptomRecords: action,
 findOneSymptomRecord: action,
 createSymptomRecord: action,
 updateSymptomRecord: action,
 deleteSymptomRecord: action

});

export default new SymptomRecordStore();