import { findBloodGlucoseTargetRecordService, 
    deleteBloodGlucoseRecordService, findOneBloodGlucoseTargetRecordService} from '../service/bloodGlucoseRecordService'; 

import { observable, action, decorate, computed } from 'mobx';

class BloodGlucoseRecordStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

bloodGlucoseRecords=[];
target = null;
detailBloodGlucoseRecord = null;

currentAction=null;
totalCount=0;
limit=10;

findOneBloodGlucoseTargetRecord(id, params) {
 this.isLoading = true;
 this.error = undefined;
 return findOneBloodGlucoseTargetRecordService(id, params)
   .then(action(response => {
       if(response && response.data) {
         this.detailBloodGlucoseRecordTarget = response.data.target;
         this.detailBloodGlucoseRecordList =  response.data.bloodGlucoseRecord
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

findBloodGlucoseTargetRecords(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findBloodGlucoseTargetRecordService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.bloodGlucoseRecords = response.data.target;
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

deleteBloodGlucoseRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteBloodGlucoseRecordService(id)
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

decorate(BloodGlucoseRecordStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 bloodGlucoseRecords: observable,
 detailBloodGlucoseRecord: observable,

 findBloodGlucoseRecords: action,
 findOneBloodGlucoseRecord: action,
 createBloodGlucoseRecord: action,
 updateBloodGlucoseRecord: action,
 deleteBloodGlucoseRecord: action

});

export default new BloodGlucoseRecordStore();