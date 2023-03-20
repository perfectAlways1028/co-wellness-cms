import { findLeaderboardCompetitionPointHistoryService, findLeaderboardCompetitionTeamEmployeeService, findLeaderboardCompetitionTeamService } from '../service/competitionLeaderboardService'; 

import { observable, action, decorate, computed } from 'mobx';
import { Constants } from '../../../constants';

class CompetitionLeaderboardStore {
//observables


isLoading=false;
success=false;
error=null;


currentAction=null;
limit=10;

teams=[];
teamTotalCount=0;

members=[];
memberTotalCount=0;

pointHistoryRecords=[];
pointHistoryCount=0;

findCompetitionTeams(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findLeaderboardCompetitionTeamService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.teams = response.data.data;
           this.teamTotalCount = response.data.count;
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

findCompetitionTeamMembers(filter) {
    this.isLoading = true;
    this.error = undefined;
    return findLeaderboardCompetitionTeamEmployeeService(filter)
      .then(action(response => {
        console.log("response",response);
          if(response && response.data) {
            this.members = response.data.data;
            this.memberTotalCount = response.data.count;
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

 findCompetitionPointHistory(filter) {
    this.isLoading = true;
    this.error = undefined;
    return findLeaderboardCompetitionPointHistoryService(filter)
      .then(action(response => {
        console.log("response",response);
          if(response && response.data) {
            this.pointHistoryRecords = response.data.data;
            this.pointHistoryTotalCount = response.data.count;
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

decorate(CompetitionLeaderboardStore, {
 isLoading: observable,
 success: observable,
 error: observable,

 currentAction: observable,
 totalCount: observable,

 teams: observable,
 teamTotalCount: observable,

 members: observable,
 memberTotalCount: observable,

 pointHistoryRecords: observable,
 pointHistoryCount: observable,
 
 findCompetitionTeams: action,
 findCompetitionTeamMembers: action,
 findCompetitionPointHistory: action

});

export default new CompetitionLeaderboardStore();