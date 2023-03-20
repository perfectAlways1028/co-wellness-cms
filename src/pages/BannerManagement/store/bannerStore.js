import { findBannerService, createBannerService, updateBannerService, 
    deleteBannerService, findOneBannerService, uploadImageService} from '../service/bannerService'; 

import { observable, action, decorate, computed } from 'mobx';

class BannerStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

banners=[];

detailBanner = null;

currentAction=null;
totalCount=0;
limit=10;

findOneBanner(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneBannerService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailBanner = response.data;
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

findBanners(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findBannerService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.banners = response.data.data;
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

createBanner(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createBannerService(body)
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

updateBanner(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateBannerService(id, body)
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
deleteBanner(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteBannerService(id)
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

}

decorate(BannerStore, {
  isLoadingImage: observable,
  successImage: observable,
  errorImage: observable,

 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 banners: observable,
 detailBanner: observable,

 findBanners: action,
 findOneBanner: action,
 createBanner: action,
 updateBanner: action,
 deleteBanner: action,
 uploadImage: action

});

export default new BannerStore();