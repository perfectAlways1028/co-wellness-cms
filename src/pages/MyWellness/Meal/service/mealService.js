import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneMealService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/meals/${id}`
});
}
export function findMealService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/meals`,
      params: data,
  });
}

export function createMealService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/meals`,
    data: data,
  });
}


export function updateMealService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/meals/${id}`,
    data: data,
  });
}

export function deleteMealService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/meals/${id}/delete`,
  });
}

