import { findDietTargetRecordService, 
    deleteDietRecordService, findOneDietTargetRecordService} from '../service/dietRecordService'; 

import { observable, action, decorate, computed } from 'mobx';

class DietRecordStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

dietRecords=[];
target = null;
detailDietRecord = null;

currentAction=null;
totalCount=0;
limit=10;

findOneDietTargetRecord(id, params) {
 this.isLoading = true;
 this.error = undefined;
 return findOneDietTargetRecordService(id, params)
   .then(action(response => {
       if(response && response.data) {
         this.detailDietRecordTarget = response.data.target;
         this.detailDietRecordList =  response.data.dietRecord
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

findDietTargetRecords(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findDietTargetRecordService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.dietRecords = response.data.target;
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

deleteDietRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteDietRecordService(id)
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

decorate(DietRecordStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 dietRecords: observable,
 detailDietRecord: observable,

 findDietRecords: action,
 findOneDietRecord: action,
 createDietRecord: action,
 updateDietRecord: action,
 deleteDietRecord: action

});

export default new DietRecordStore();