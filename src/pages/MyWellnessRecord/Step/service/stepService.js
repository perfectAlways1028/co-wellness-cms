import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneStepService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/steps/${id}`
});
}
export function findStepService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/steps`,
      params: data,
  });
}

export function updateStepService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/steps/${id}`,
    data: data,
  });
}

export function deleteStepService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/steps/${id}/delete`,
  });
}

