import { findCompetitionService, createCompetitionService, updateCompetitionService, 
    deleteCompetitionService, findOneCompetitionService, uploadImageService, finalizeCompetitionCreationService } from '../service/competitionService'; 

import { observable, action, decorate, computed } from 'mobx';
import { Constants } from '../../../constants';

class CompetitionStore {
//observables
isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

competitions=[];
competitionID = null;
detailCompetition = null;

currentAction=null;
totalCount=0;
limit=10;

teamConfigration=Constants.teamConfigration.MANUALLY
availableAddCompetitionStep=1;

clearCompetition() {
  this.isLoadingImage=false;
  this.successImage=false;
  this.errorImage=null;

  this.isLoading=false;
  this.success=false;
  this.error=null;

  this.competitions=[];
  
  this.detailCompetition = null;
  this.competitionID = null;

  this.currentAction=null;
  this.totalCount=0;
  this.limit=10;

  this.teamConfigration=Constants.teamConfigration.MANUALLY
  this.availableAddCompetitionStep=1;
} 

finalizeCompetitionCreation() {
  let body = {
    competitionID: this.competitionID
  }
  this.isLoading = true;
  this.error = undefined;
  return finalizeCompetitionCreationService(body)
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

updateAvailableStep(value) {
  this.availableAddCompetitionStep = value;
}

updateTeamConfigration(value) {
  this.teamConfigration = value;
}

findOneCompetition(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneCompetitionService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailCompetition = response.data;
         this.competitionID = response.data.id;
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

findCompetitions(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findCompetitionService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.competitions = response.data.data;
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

createCompetition(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createCompetitionService(body)
   .then(action(response => {
    this.detailCompetition = response.data;
    this.competitionID = response.data.id;
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

updateCompetition(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateCompetitionService(id, body)
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
deleteCompetition(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteCompetitionService(id)
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

decorate(CompetitionStore, {
  isLoadingImage: observable,
  successImage: observable,
  errorImage: observable,

 isLoading: observable,
 success: observable,
 error: observable,

 currentAction: observable,
 totalCount: observable,
 competitions: observable,
 detailCompetition: observable,
 competitionID: observable,

 availableAddCompetitionStep: observable,
 teamConfigration: observable,

 updateAvailableStep: action,
 findCompetitions: action,
 findOneCompetition: action,
 createCompetition: action,
 updateCompetition: action,
 deleteCompetition: action,
 uploadImage: action,
 finalizeCompetitionCreation: action,
 
 updateTeamConfigration: action,
 clearCompetition: action
});

export default new CompetitionStore();