import { findPackageService, createPackageService, updatePackageService, 
         deletePackageService, findOnePackgeService, updateAdminAccessService, findAdminAccessService } from '../service/packageService'; 
import { observable, action, decorate, computed } from 'mobx';
class PackageStore {
    //observables
    isLoading=false;
    success=false;
    error=null;

    packages=[];
    allPackages = [];

    detailPackage = null;

    adminAccesses = [];

    currentAction=null;
    totalCount=0;
    limit=10;

    findOnePackage(id) {
      this.isLoading = true;
      this.error = undefined;
      return findOnePackgeService(id)
        .then(action(response => {
          console.log("response",response);
            if(response && response.data) {
              this.detailPackage = response.data;
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
    findAllPackages(){
      let filter = {
      }
      this.isLoading = true;
      this.error = undefined;
      return findPackageService(filter)
        .then(action(response => {
          console.log("response",response);
            if(response && response.data) {
              this.allPackages = response.data.data;
            
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
    findPackages(filter) {
        this.isLoading = true;
        this.error = undefined;
        return findPackageService(filter)
          .then(action(response => {
            console.log("response",response);
              if(response && response.data) {
                this.packages = response.data.data;
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

    createPackage(body) { 
      this.isLoading = true;
      this.error = undefined;
      return createPackageService(body)
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

    updatePackage(id, body) {
      this.isLoading = true;
      this.error = undefined;
      return updatePackageService(id, body)
        .then(action(response => {
          console.log("response",response);
            this.success = true;
        
        }))
        .catch(action((err) => {
          this.error = err.message;
          this.success = false;
          throw err;
        }))
        .finally(action(() => { this.isLoading = false; }));
    }
    deletePackage(id) {
      this.isLoading = true;
      this.error = undefined;
      return deletePackageService(id)
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

    findAdminAccess(id) {
      this.isLoading = true;
      this.error = undefined;
      return findAdminAccessService(id)
        .then(action(response => {
          console.log("response",response);
            if(response && response.data) {
              this.adminAccesses = response.data;
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
  
    updateAdminAccess(id, data) {
      this.isLoading = true;
      this.error = undefined;
      return updateAdminAccessService(id, data)
        .then(action(response => {
          console.log("response",response);
            if(response && response.data) {
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
  }
  
  decorate(PackageStore, {
      isLoading: observable,
      success: observable,
      error: observable,
      currentAction: observable,
      totalCount: observable,
      packages: observable,
      allPackages: observable,
      detailPackage: observable,
      adminAccesses: observable,

      findPackages: action,
      findOnePackage: action,
      createPackage: action,
      updatePackage: action,
      deletePackage: action

    });
  
  export default new PackageStore();