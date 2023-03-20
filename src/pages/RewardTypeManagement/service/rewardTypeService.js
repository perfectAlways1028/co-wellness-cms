import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneRewardTypeService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/rewardCategory/${id}`
});
}
export function findRewardTypeService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/rewardCategory/find`,
      data: data,
  });
}

export function createRewardTypeService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/rewardCategory`,
    data: data,
  });
}


export function updateRewardTypeService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/rewardCategory/${id}`,
    data: data,
  });
}

export function deleteRewardTypeService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/rewardCategory/${id}`,
  });
}
