import { findChallengeService, createChallengeService, updateChallengeService, 
    deleteChallengeService, findOneChallengeService, uploadImageService, createChallengeFromTemplateService} from '../service/challengeService'; 

import { observable, action, decorate, computed } from 'mobx';

class ChallengeStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

challenges=[];
challengeTemplates = [];

detailChallenge = null;

currentAction=null;
totalCount=0;
totalTemplateCount = 0;
limit=10;

findChallengeTemplates(filter) {
  this.isLoading = true;
  this.error = undefined;
  filter.isTemplate = true;
  return findChallengeService(filter)
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

createFromTemplate(id, body) {
  this.isLoading = true;
  this.error = undefined;
  return createChallengeFromTemplateService(id, body)
    .then(action(response => {
        if(response && response.data) {
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

findOneChallenge(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneChallengeService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailChallenge = response.data;
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

findChallenges(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findChallengeService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.challenges = response.data.data;
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

createChallenge(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createChallengeService(body)
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

updateChallenge(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateChallengeService(id, body)
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
deleteChallenge(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteChallengeService(id)
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

decorate(ChallengeStore, {
  isLoadingImage: observable,
  successImage: observable,
  errorImage: observable,

 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 totalTemplateCount: observable,
 challenges: observable,
 challengeTemplates: observable,
 detailChallenge: observable,

 findChallenges: action,
 findOneChallenge: action,
 createChallenge: action,
 updateChallenge: action,
 deleteChallenge: action,
 uploadImage: action,

 findChallengeTemplates: action,
 createChallengeTemplate: action,
 updateChallengeTemplate: action,

});

export default new ChallengeStore();