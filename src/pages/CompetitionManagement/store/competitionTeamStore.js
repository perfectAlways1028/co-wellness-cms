import { findCompetitionTeamService, createCompetitionTeamService,  
    deleteCompetitionTeamService, automaticallyGenerateTeamsService } from '../service/competitionTeamService'; 

import { findCompetitionTeamEmployeeService, findEmployeesNotInCompetitionService, bulkCreateCompetitionTeamEmployeeService, deleteCompetitionTeamEmployeeService } from '../service/competitionTeamEmployeeService'
import { observable, action, decorate, computed } from 'mobx';
import { Constants } from '../../../constants';

import { constructHierachy } from '../helper';
 
class CompetitionTeamStore {
//observables
isLoading=false;
success=false;
error=null;

teams=[];
teamEmployees = [];
employees = [];

currentAction=null;
totalCount=0;
limit=10;

   
bulkCreateCompetitionTeamEmployee(body) { 
  this.isLoading = true;
  this.error = undefined;
  return bulkCreateCompetitionTeamEmployeeService(body)
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

findEmployeesNotInCompetition(filter) {
  this.isLoading = true;
  this.error = undefined;
  return findEmployeesNotInCompetitionService(filter)
    .then(action(response => {
        if(response && response.data) {
          this.employees = response.data.data;
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

findCompetitionTeamEmployees(filter) {
  this.isLoading = true;
  this.error = undefined;
  return findCompetitionTeamEmployeeService(filter)
    .then(action(response => {
        if(response && response.data) {
          this.teamEmployees = constructHierachy(this.teams, response.data.data);
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

deleteCompetitionTeamEmployee(id) {
  this.isLoading = true;
  this.error = undefined;
  return deleteCompetitionTeamEmployeeService(id)
    .then(action(response => {
        this.success = true;
    }))
    .catch(action((err) => {
 
      this.success = false;
      this.error = err.message;
      throw err;
    }))
    .finally(action(() => { this.isLoading = false; }));
 }

findCompetitionTeams(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findCompetitionTeamService(filter)
     .then(action(response => {
         if(response && response.data) {
           this.teams = response.data.data;
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

generateTeams(body) { 
    this.isLoading = true;
    this.error = undefined;
    return automaticallyGenerateTeamsService(body)
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


createCompetitionTeam(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createCompetitionTeamService(body)
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

deleteCompetitionTeam(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteCompetitionTeamService(id)
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

decorate(CompetitionTeamStore, {

 isLoading: observable,
 success: observable,
 error: observable,

 currentAction: observable,
 teamEmployees: observable,
 employees: observable,
 teams: observable,

 findCompetitionTeams: action,
 findEmployeesNotInCompetition: action,
 createCompetitionTeam: action,
 deleteCompetitionTeam: action,
 generateTeams: action,
});

export default new CompetitionTeamStore();