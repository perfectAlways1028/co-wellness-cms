import { findSymptomService, createSymptomService, updateSymptomService, 
    deleteSymptomService, findOneSymptomService} from '../service/symptomService'; 

import { observable, action, decorate, computed } from 'mobx';

class SymptomStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

symptoms=[];

detailSymptom = null;

currentAction=null;
totalCount=0;
limit=10;

findOneSymptom(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneSymptomService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailSymptom = response.data;
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

findAllSymptoms() {
  let filter = {
  }
  return findSymptomService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           return response.data.symptoms;
         }
     }))
     .catch(action((err) => {
       throw err;
     }))
     .finally(action(() => {}));

}
findSymptoms(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findSymptomService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.symptoms = response.data.symptoms;
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

createSymptom(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createSymptomService(body)
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

updateSymptom(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateSymptomService(id, body)
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
deleteSymptom(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteSymptomService(id)
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

decorate(SymptomStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 symptoms: observable,
 detailSymptom: observable,

 findSymptoms: action,
 findOneSymptom: action,
 createSymptom: action,
 updateSymptom: action,
 deleteSymptom: action

});

export default new SymptomStore();