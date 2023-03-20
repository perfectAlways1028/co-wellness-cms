import { findExerciseTargetRecordService, 
    deleteExerciseRecordService, findOneExerciseTargetRecordService} from '../service/exerciseRecordService'; 

import { observable, action, decorate, computed } from 'mobx';

class ExerciseRecordStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

exerciseRecords=[];
target = null;
detailExerciseRecord = null;

currentAction=null;
totalCount=0;
limit=10;

findOneExerciseTargetRecord(id, params) {
 this.isLoading = true;
 this.error = undefined;
 return findOneExerciseTargetRecordService(id, params)
   .then(action(response => {
       if(response && response.data) {
         this.detailExerciseRecordTarget = response.data.target;
         this.detailExerciseRecordList =  response.data.exerciseRecord
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

findExerciseTargetRecords(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findExerciseTargetRecordService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.exerciseRecords = response.data.target;
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

deleteExerciseRecord(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteExerciseRecordService(id)
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

decorate(ExerciseRecordStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 exerciseRecords: observable,
 detailExerciseRecord: observable,

 findExerciseRecords: action,
 findOneExerciseRecord: action,
 createExerciseRecord: action,
 updateExerciseRecord: action,
 deleteExerciseRecord: action

});

export default new ExerciseRecordStore();