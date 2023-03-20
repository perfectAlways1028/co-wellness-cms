import { findExerciseService, createExerciseService, updateExerciseService, 
    deleteExerciseService, findOneExerciseService} from '../service/exerciseService'; 

import { observable, action, decorate, computed } from 'mobx';

class ExerciseStore {
//observables

isLoading=false;
success=false;
error=null;

exercises=[];

detailExercise = null;

currentAction=null;
totalCount=0;
limit=10;

findOneExercise(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneExerciseService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailExercise = response.data;
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

findAllExercises() {
  let filter = {
  }
  return findExerciseService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           return response.data.exercise;
         }
     }))
     .catch(action((err) => {
       throw err;
     }))
     .finally(action(() => {}));

}
findExercises(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findExerciseService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.exercises = response.data.exercise;
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

createExercise(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createExerciseService(body)
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

updateExercise(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateExerciseService(id, body)
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
deleteExercise(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteExerciseService(id)
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

decorate(ExerciseStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 exercises: observable,
 detailExercise: observable,

 findExercises: action,
 findOneExercise: action,
 createExercise: action,
 updateExercise: action,
 deleteExercise: action

});

export default new ExerciseStore();