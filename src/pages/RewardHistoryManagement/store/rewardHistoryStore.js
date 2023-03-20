import {
  findRewardHistoryService
} from '../service/rewardHistoryService';

import { observable, action, decorate } from 'mobx';

class rewardHistoryStore {
  isLoading = false;
  success = false;
  error = null;

  rewardHistoryList = [];

  currentAction = null;
  totalCount = 0;
  limit = 10;
  offset = 0
  sort = "userName"

  employee = '';
  reward = '';
  startDate = '';
  endDate = '';
  query = '';
  status = '';

  editedData = {
    employee: '',
    reward: '',
    startDate: '',
    endDate: '',
    query: '',
    status: '',
  };

  setEditedData = newData => {
    this.editedData = {
      ...this.editedData,
      ...newData,
    }
  }

  setFilterEmployee = value => {
    this.offset = 0;
    this.employee = value
  }
  setFilterReward = value => {
    this.offset = 0;
    this.reward = value
  }
  setFilterStartDate = value => {
    this.offset = 0;
    this.startDate = value
  }
  setFilterEndDate = value => {
    this.offset = 0;
    this.endDate = value
  }
  setFilterQuery = value => {
    this.offset = 0;
    this.query = value
  }
  setFilterStatus = value => {
    this.offset = 0;
    this.status = value
  }

  onChangePage = (page) => {
    this.offset = this.limit * (page - 1)

    this.findRewardHistory();
  }

  findRewardHistory() {
    this.isLoading = true;
    this.error = undefined;

    return findRewardHistoryService({
      limit: this.limit,
      offset: this.offset,
      query: this.editedData.query,
      sort: this.sort,
      employee: this.editedData.employee,
      reward: this.editedData.reward,
      startDate: this.editedData.startDate ? new Date(this.editedData.startDate).toLocaleString("en-US", { timeZone: 'Asia/Jakarta' }) : this.editedData.startDate,
      endDate: this.editedData.endDate ? new Date(this.editedData.endDate).toLocaleString("en-US", { timeZone: 'Asia/Jakarta' }) : this.editedData.endDate,
      status: this.editedData.status,
    })
      .then(action(response => {
        if (response && response.data) {
          this.rewardHistoryList = response.data.data;
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

}
decorate(rewardHistoryStore, {

  isLoading: observable,
  success: observable,
  error: observable,
  currentAction: observable,
  totalCount: observable,
  rewardHistoryList: observable,
  employee: observable,
  reward: observable,
  startDate: observable,
  endDate: observable,
  query: observable,
  status: observable,
  offset: observable,
  editedData: observable,

  findRewardHistory: action,
});

export default new rewardHistoryStore();