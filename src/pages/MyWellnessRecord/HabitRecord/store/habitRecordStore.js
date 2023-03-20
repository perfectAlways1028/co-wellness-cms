import { findHabitRecordService, 
    deleteHabitRecordService, findOneHabitRecordService} from '../service/habitRecordService'; 

import { observable, action, decorate, computed } from 'mobx';

class HabitRecordStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

habitRecords=[];
target = null;
detailHabitRecord = null;

currentAction=null;
totalCount=0;
limit=10;

findOneHabitRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneHabitRecordService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailHabitRecord = response.data;
       
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

findHabitRecords(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findHabitRecordService(filter)
     .then(action(response => {
       console.log("habitRecord response:",response);
         if(response && response.data) {
           this.habitRecords = response.data.habitRecord;
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


deleteHabitRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteHabitRecordService(id)
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

decorate(HabitRecordStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 habitRecords: observable,
 detailHabitRecord: observable,

 findHabitRecords: action,
 findOneHabitRecord: action,
 deleteHabitRecord: action,
});

export default new HabitRecordStore();