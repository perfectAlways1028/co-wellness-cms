import {
  findRewardService, createRewardService, updateRewardService,
  deleteRewardService, findOneRewardService, uploadImageService
} from '../service/rewardService';

import { observable, action, decorate, computed } from 'mobx';

class RewardStore {
  //observables

  isLoadingImage = false;
  successImage = false;
  errorImage = null;

  isLoading = false;
  success = false;
  error = null;

  rewards = [];

  detailReward = null;

  currentAction = null;
  totalCount = 0;
  limit = 10;

  editedData = {}

  setEditedData = newData => {
    this.editedData = {
      ...this.editedData,
      ...newData
    }
  }

  findOneReward(id) {
    this.isLoading = true;
    this.error = undefined;
    return findOneRewardService(id)
      .then(action(response => {

        if (response && response.data) {
          this.detailReward = response.data;
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

  findRewards(filter) {
    this.isLoading = true;
    this.error = undefined;
    return findRewardService(filter)
      .then(action(response => {
        console.log("response", response);
        if (response && response.data) {
          this.rewards = response.data.data;
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

  createReward(body) {
    this.isLoading = true;
    this.error = undefined;
    return createRewardService(body)
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

  updateReward(id, body) {
    this.isLoading = true;
    this.error = undefined;
    return updateRewardService(id, body)
      .then(action(response => {
        console.log("response", response);
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
  deleteReward(id) {
    this.isLoading = true;
    this.error = undefined;
    return deleteRewardService(id)
      .then(action(response => {
        console.log("response", response);
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
        console.log("response", response);
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

decorate(RewardStore, {
  isLoadingImage: observable,
  successImage: observable,
  errorImage: observable,
  editedData: observable,

  isLoading: observable,
  success: observable,
  error: observable,
  currentAction: observable,
  totalCount: observable,
  rewards: observable,
  detailReward: observable,

  findRewards: action,
  findOneReward: action,
  createReward: action,
  updateReward: action,
  deleteReward: action,
  uploadImage: action

});

export default new RewardStore();