import {
  findPointHistoryService,
  findOnePointHistoryService,
  injectCoin,
  bulkInjectCoin
} from '../service/pointHistoryService';

import { observable, action, decorate, computed } from 'mobx';

class PointHistoryStore {
  //observables

  isLoading = false;
  success = false;
  error = null;

  pointHistoryList = [];

  detailPointHistory = null;

  currentAction = null;
  totalCount = 0;
  limit = 10;

  editedData = {
    progress: 0
  }

  setEditedData = newData => {
    this.editedData = {
      ...this.editedData,
      ...newData,
    }
  }

  findOnePointHistory(id) {
    this.isLoading = true;
    this.error = undefined;
    return findOnePointHistoryService(id)
      .then(action(response => {

        if (response && response.data) {
          this.detailPointHistory = response.data;
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

  findPointHistory(filter) {
    this.isLoading = true;
    this.error = undefined;
    return findPointHistoryService(filter)
      .then(action(response => {
        if (response && response.data) {
          this.pointHistoryList = response.data.data;
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

  useInjectCoin(data) {
    this.isLoading = true;
    return injectCoin(data)
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

  useBulkInjectCoin(data) {
    this.isLoading = true;
    return bulkInjectCoin({
      data,
      onUploadProgress:
        progressEvent => {
          this.setEditedData({ progress: Math.round((100 * progressEvent.loaded) / progressEvent.total) })
        }
    })
      .then(action(response => {
        this.success = true;
        return response.data;
      }))
      .catch(action((err) => {
        this.success = false;
        this.error = err.message;

        throw err;
      }))
      .finally(action(() => {
        if (this.editedData.progress === 100) {
          setTimeout(
            () => {
              this.isLoading = false;
            }, 2000
          )
        }
      }));
  }

}

decorate(PointHistoryStore, {

  isLoading: observable,
  success: observable,
  error: observable,
  currentAction: observable,
  totalCount: observable,
  pointHistoryList: observable,
  detailPointHistory: observable,
  editedData: observable,

  findPointHistory: action,
  findOnePointHistory: action,

});

export default new PointHistoryStore();