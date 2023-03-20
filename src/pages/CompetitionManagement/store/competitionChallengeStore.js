import { findCompetitionChallengeService, createCompetitionChallengeService,
    deleteCompetitionChallengeService, findOneCompetitionChallengeService, uploadImageService} from '../service/competitionChallengeService'; 

import { observable, action, decorate, computed } from 'mobx';

class CompetitionChallengeStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

challenges=[];

detailChallenge = null;

currentAction=null;
totalCount=0;
totalTemplateCount = 0;
limit=10;

findOneCompetitionChallenge(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneCompetitionChallengeService(id)
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

findCompetitionChallenges(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findCompetitionChallengeService(filter)
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

createCompetitionChallenge(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createCompetitionChallengeService(body)
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


deleteCompetitionChallenge(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteCompetitionChallengeService(id)
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

decorate(CompetitionChallengeStore, {
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
 detailChallenge: observable,

 findCompetitionChallenges: action,
 findOneCompetitionChallenge: action,
 createCompetitionChallenge: action,
 updateCompetitionChallenge: action,
 deleteCompetitionChallenge: action,
 uploadImage: action,

 findCompetitionChallengeTemplates: action,
 createCompetitionChallengeTemplate: action,
 updateCompetitionChallengeTemplate: action,

});

export default new CompetitionChallengeStore();