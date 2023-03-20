import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneSymptomService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/symptoms/${id}`
});
}
export function findSymptomService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/symptoms`,
      params: data,
  });
}

export function createSymptomService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/symptoms`,
    data: data,
  });
}


export function updateSymptomService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/symptoms/${id}`,
    data: data,
  });
}

export function deleteSymptomService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/symptoms/${id}/delete`,
  });
}

