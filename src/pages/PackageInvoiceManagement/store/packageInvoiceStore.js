import { findPackageInvoiceService, createPackageInvoiceService, findOnePackageInvoiceService } from '../service/packageInvoiceService'; 
import { observable, action, decorate, computed } from 'mobx';
class PackageStore {
//observables

isLoading=false;
success=false;
error=null;

packageInvoices=[];

detailPackageInvoice = null;

currentAction=null;
totalCount=0;
limit=10;

findPackageInvoiceForPayor(payorID) {
  this.currentAction = 'find-all';
  let filter = {
    payorID: payorID,
    isAvailable: true
  }

  this.isLoading = true;
  this.error = undefined;
  return findPackageInvoiceService(filter)
    .then(action(response => {
        if(response && response.data) {
          return response.data.data;
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
findAllPackageInvoices() {
  this.currentAction = 'find-all';
  this.isLoading = true;
  let filter = {}

  this.isLoading = true;
  this.error = undefined;
  return findPackageInvoiceService(filter)
    .then(action(response => {
        if(response && response.data) {
          return response.data.data;
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

findPackageInvoices(filter) {
  this.currentAction = 'find';
   this.isLoading = true;
   this.error = undefined;
   return findPackageInvoiceService(filter)
     .then(action(response => {
         if(response && response.data) {
           this.packageInvoices = response.data.data;
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

findOnePackageInvoice(id) {
  this.currentAction = 'find-one';
  this.isLoading = true;
  this.error = undefined;
  return findOnePackageInvoiceService(id)
    .then(action(response => {
      console.log("response",response);
        if(response && response.data) {
          this.detailPackageInvoice = response.data;
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

createPackageInvoice(body) { 
  this.currentAction = 'create';
  this.isLoading = true;
  this.error = undefined;
  return createPackageInvoiceService(body)
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

decorate(PackageStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 packageInvoices: observable,
 detailPackageInvoice: observable,


 findPackageInvoices: action,
 findAllPackageInvoices: action,
 findOnePackageInvoice: action,
 createPackageInvoice: action,
 findPackageInvoiceForPayor: action

});

export default new PackageStore();