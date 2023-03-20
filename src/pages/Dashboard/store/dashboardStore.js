import { findDashboardInfoService, findMCUInfoService } from '../service/dashboardService';
import { observable, action, decorate, computed } from 'mobx';
class DashboardStore {
  //observables
  isLoading = false;
  success = false;
  error = null;

  userInfo = {
    total: 0,
    active: 0,
    inActive: 0
  }

  coinInfo = {
    total: 0,
    issued: 0,
    redeemed: 0
  }
  dailyUser = {
    total: 0,
    active: 0,
    inactive: 0
  }
  weeklyUser = {
    total: 0,
    active: 0,
    inactive: 0
  }
  monthlyUser = {
    total: 0,
    active: 0,
    inactive: 0
  }
  dailyUserData = [];
  weeklyUserData = [];
  monthlyUserData = [];

  challengeInfo = {
    total: 0,
    joining: 0,
    nonJoining: 0
  }
  competitionInfo = {
    total: 0,
    withDiamond: 0,
    withoutDiamond: 0
  }
  ongoingChallenges = []
  averageSleeps = {
    lastWeek: 0,
    yesterday: 0
  }
  averageSteps = {
    lastWeek: 0,
    yesterday: 0
  }
  averageStairs = {
    lastWeek: 0,
    yesterday: 0
  }
  notSyncedData = []
  syncedData = []

  currentAction = null;

  findMCUInfo() {
    return findMCUInfoService()
      .then(action(response => {
        if (response && response.data) {
          return response.data;
        }

      }))
      .catch(action((err) => {
        throw err;
      }))
      .finally(action(() => { }));
  }
  findDashboardInfo(filter) {
    this.isLoading = true;
    this.error = undefined;
    return findDashboardInfoService(filter)
      .then(action(response => {
        if (response && response.data) {
          let info = response.data;
          this.userInfo = {
            total: info.users.totalActive + info.users.totalInactive,
            active: info.users.totalActive,
            inActive: info.users.totalInactive
          }
          this.coinInfo = {
            total: info.coins.totalIssued + info.coins.totalRedeemed,
            issued: info.coins.totalIssued,
            redeemed: info.coins.totalRedeemed
          }
          this.ongoingChallenges = info.challenges || [];
          this.challengeInfo = {
            total: info.normalChallenge.challengeCnt,
            joining: info.normalChallenge.joining,
            nonJoining: info.normalChallenge.notJoining
          }
          this.competitionInfo = {
            total: info.competition.competitionCnt,
            withDiamond: info.competition.withDiamond,
            withoutDiamond: info.competition.withoutDiamond,
          }
          this.averageSleeps = {
            lastWeek: info.averageSleeps.lastWeekAverage ? info.averageSleeps.lastWeekAverage : 0,
            yesterday: info.averageSleeps.yesterdayAverage ? info.averageSleeps.yesterdayAverage : 0
          }
          this.averageSteps = {
            lastWeek: info.averageSteps.lastWeekAverage ? info.averageSteps.lastWeekAverage : 0,
            yesterday: info.averageSteps.yesterdayAverage ? info.averageSteps.yesterdayAverage : 0
          }
          this.averageStairs = {
            lastWeek: info.averageStairs.lastWeekAverage ? info.averageStairs.lastWeekAverage : 0,
            yesterday: info.averageStairs.yesterdayAverage ? info.averageStairs.yesterdayAverage : 0
          }
          this.dailyUser = {
            total: info.dailyActiveEmployee[0].totalActive + info.dailyActiveEmployee[0].totalinactive,
            active: info.dailyActiveEmployee[0].totalActive,
            inactive: info.dailyActiveEmployee[0].totalinactive
          }
          this.weeklyUser = {
            total: info.weeklyActiveEmployee[0].totalActive + info.weeklyActiveEmployee[0].totalinactive,
            active: info.weeklyActiveEmployee[0].totalActive,
            inactive: info.weeklyActiveEmployee[0].totalinactive
          }
          this.monthlyUser = {
            total: info.monthlyActiveEmployee[0].totalActive + info.monthlyActiveEmployee[0].totalinactive,
            active: info.monthlyActiveEmployee[0].totalActive,
            inactive: info.monthlyActiveEmployee[0].totalinactive
          }
          this.dailyUserData = info.dailyActiveEmployee;
          this.weeklyUserData = info.weeklyActiveEmployee;
          this.monthlyUserData = info.monthlyActiveEmployee;

          this.notSyncedData = info.notSyncEmployees || [];
          this.syncedData = info.syncEmployees || [];
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


}

decorate(DashboardStore, {

  isLoading: observable,
  success: observable,
  error: observable,
  currentAction: observable,
  userInfo: observable,
  coinInfo: observable,
  challengeInfo: observable,
  competitionInfo: observable,
  notSyncedData: observable,
  syncedData: observable,
  ongoingChallenges: observable,
  averageSleeps: observable,
  averageStairs: observable,
  averageSteps: observable,
  dailyUser: observable,
  weeklyUser: observable,
  monthlyUser: observable,
  dailyUserData: observable,
  weeklyUserData: observable,
  monthlyUserData: observable,
  findDashboardInfo: action,
  findMCUInfo: action

});

export default new DashboardStore();