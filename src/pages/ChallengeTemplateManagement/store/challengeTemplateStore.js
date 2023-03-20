import { findChallengeTemplateService, createChallengeTemplateService, updateChallengeTemplateService, 
    deleteChallengeTemplateService, findOneChallengeTemplateService, uploadImageService} from '../service/challengeTemplateService'; 

import { observable, action, decorate, computed } from 'mobx';

class ChallengeTemplateStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;


challengeTemplates = [];

detailChallengeTemplate = null;

currentAction=null;
totalTemplateCount = 0;
limit=10;

findOneChallengeTemplate(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneChallengeTemplateService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailChallengeTemplate = response.data;
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

findChallengeTemplates(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findChallengeTemplateService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.challengeTemplates = response.data.data;
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

createChallengeTemplate(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createChallengeTemplateService(body)
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

updateChallengeTemplate(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateChallengeTemplateService(id, body)
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
deleteChallengeTemplate(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteChallengeTemplateService(id)
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

decorate(ChallengeTemplateStore, {
  isLoadingImage: observable,
  successImage: observable,
  errorImage: observable,

 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalTemplateCount: observable,
 challengeTemplates: observable,
 detailChallengeTemplate: observable,

 findChallengeTemplates: action,
 findOneChallengeTemplate: action,
 createChallengeTemplate: action,
 updateChallengeTemplate: action,
 deleteChallengeTemplate: action,
 uploadImage: action,



});

export default new ChallengeTemplateStore();