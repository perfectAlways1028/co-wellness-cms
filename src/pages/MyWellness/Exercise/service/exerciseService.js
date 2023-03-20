import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneExerciseService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/exercises/${id}`
});
}
export function findExerciseService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/exercises`,
      params: data,
  });
}

export function createExerciseService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/exercises`,
    data: data,
  });
}


export function updateExerciseService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/exercises/${id}`,
    data: data,
  });
}

export function deleteExerciseService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/exercises/${id}/delete`,
  });
}

