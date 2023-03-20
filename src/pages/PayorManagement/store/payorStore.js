import { findPayorService, createPayorService, updatePayorService, 
    deletePayorService, findOnePayorService, uploadImageService, payorAdminChangePasswordService, findMCUPayorService} from '../service/payorService'; 

import { observable, action, decorate, computed } from 'mobx';

class PayorStore {
//observables
isLoading=false;
success=false;
error=null;

payors=[];

mcuPayors = [];

detailPayor = null;

currentAction=null;
totalCount=0;
limit=10;

findOnePayor(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOnePayorService(id)
   .then(action(response => {
     console.log("response",response);
       if(response && response.data) {
         this.detailPayor = response.data;
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

findPayors(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findPayorService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.payors = response.data.data;
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

findMCUPayors() {
  this.isLoading = true;
  this.error = undefined;
  return findMCUPayorService()
    .then(action(response => {
  
        if(response && response.data) {
          this.mcuPayors = response.data;
          this.success = true;
          return response.data;
        } else {
            this.success = false;
            this.error = 'No data.';
        }
        
    }))
    .catch(action((err) => {
      console.log("mcu err", err);
      this.success = false;
      this.error = err.message;
      throw err;
    }))
    .finally(action(() => { this.isLoading = false; }));
}

findAllPayors() {
  this.isLoading = true;
  this.error = undefined;
  let filter = {
  }
  return findPayorService(filter)
    .then(action(response => {
      console.log("response",response);
        if(response && response.data) {
          this.allPayors = response.data.data;
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


createPayor(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createPayorService(body)
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

updatePayor(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updatePayorService(id, body)
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
deletePayor(id) {
 this.isLoading = true;
 this.error = undefined;
 return deletePayorService(id)
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

uploadImage(path, type) {
  this.isLoadingImage = true;
  this.errorImage = undefined;
  return uploadImageService(path, type)
   .then(action(response => {
     console.log("response",response);
       this.successImage = true;
       return response.data;
   }))
   .catch(action((err) => {
     this.successImage = false;
     this.errorImage = err.message;
     throw err;
   }))
   .finally(action(() => { this.isLoadingImage = false; }));
}

payorAdminChangePassword(payorAdminID, oldPassword, newPassword) {
  this.isLoading = true;
  this.error = undefined;
  return payorAdminChangePasswordService( payorAdminID, {oldPassword, newPassword} )
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

}

decorate(PayorStore, {
  isLoadingImage: observable,
  successImage: observable,
  errorImage: observable,

 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 payors: observable,
 allPayors: observable,
 detailPayor: observable,
 mcuPayors: observable,

 findPayors: action,
 findOnePayor: action,
 createPayor: action,
 updatePayor: action,
 deletePayor: action,
 uploadImage: action,
 findAllPayors: action,
 findMCUPayors: action,

});

export default new PayorStore();