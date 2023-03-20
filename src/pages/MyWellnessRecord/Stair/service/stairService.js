import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneStairService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/stairs/${id}`
});
}
export function findStairService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/stairs`,
      params: data,
  });
}

export function updateStairService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/stairs/${id}`,
    data: data,
  });
}

export function deleteStairService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/stairs/${id}/delete`,
  });
}

