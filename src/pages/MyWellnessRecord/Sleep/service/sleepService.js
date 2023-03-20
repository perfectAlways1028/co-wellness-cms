import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneSleepService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/sleeps/${id}`
});
}
export function findSleepService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/sleeps`,
      params: data,
  });
}

export function updateSleepService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/sleeps/${id}`,
    data: data,
  });
}

export function deleteSleepService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/sleeps/${id}/delete`,
  });
}

