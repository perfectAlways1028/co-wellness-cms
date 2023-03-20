import { findDepartmentService, createDepartmentService, updateDepartmentService, 
    deleteDepartmentService, findOneDepartmentService} from '../service/departmentService'; 

import { observable, action, decorate, computed } from 'mobx';

class DepartmentStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

departments=[];

detailDepartment = null;

currentAction=null;
totalCount=0;
limit=10;

findOneDepartment(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneDepartmentService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailDepartment = response.data;
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

findAllDepartments(filter) {
  
  return findDepartmentService(filter ? filter : {})
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
findDepartments(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findDepartmentService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.departments = response.data.data;
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

createDepartment(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createDepartmentService(body)
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

updateDepartment(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateDepartmentService(id, body)
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
deleteDepartment(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteDepartmentService(id)
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

decorate(DepartmentStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 departments: observable,
 detailDepartment: observable,

 findDepartments: action,
 findOneDepartment: action,
 createDepartment: action,
 updateDepartment: action,
 deleteDepartment: action

});

export default new DepartmentStore();