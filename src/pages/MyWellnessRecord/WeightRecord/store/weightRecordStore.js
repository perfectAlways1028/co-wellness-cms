import { findWeightRecordService, updateWeightRecordService, 
    deleteWeightRecordService, findOneWeightRecordService} from '../service/weightRecordService'; 

import { observable, action, decorate, computed } from 'mobx';

class WeightRecordStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

weightRecords=[];
target = null;
detailWeightRecord = null;

currentAction=null;
totalCount=0;
limit=10;

findOneWeightRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneWeightRecordService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailWeightRecord = response.data;
       
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

findAllWeightRecords() {
  let filter = {
  }
  return findWeightRecordService(filter)
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
findWeightRecords(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findWeightRecordService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.weightRecords = response.data.data.weightRecord;
           this.target = response.data.data.target;
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

updateWeightRecord(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateWeightRecordService(id, body)
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
deleteWeightRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteWeightRecordService(id)
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

decorate(WeightRecordStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 weightRecords: observable,
 detailWeightRecord: observable,

 findWeightRecords: action,
 findOneWeightRecord: action,
 createWeightRecord: action,
 updateWeightRecord: action,
 deleteWeightRecord: action

});

export default new WeightRecordStore();