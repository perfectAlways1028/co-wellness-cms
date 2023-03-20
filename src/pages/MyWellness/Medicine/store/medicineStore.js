import { findMedicineService, createMedicineService, updateMedicineService, 
    deleteMedicineService, findOneMedicineService} from '../service/medicineService'; 

import { observable, action, decorate, computed } from 'mobx';

class MedicineStore {
//observables

isLoading=false;
success=false;
error=null;

medicines=[];

detailMedicine = null;

currentAction=null;
totalCount=0;
limit=10;

findOneMedicine(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneMedicineService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailMedicine = response.data;
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

findAllMedicines() {
  let filter = {
  }
  return findMedicineService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           return response.data.medicine;
         }
     }))
     .catch(action((err) => {
       throw err;
     }))
     .finally(action(() => {}));

}
findMedicines(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findMedicineService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.medicines = response.data.medicine;
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

createMedicine(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createMedicineService(body)
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

updateMedicine(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateMedicineService(id, body)
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
deleteMedicine(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteMedicineService(id)
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

decorate(MedicineStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 medicines: observable,
 detailMedicine: observable,

 findMedicines: action,
 findOneMedicine: action,
 createMedicine: action,
 updateMedicine: action,
 deleteMedicine: action

});

export default new MedicineStore();