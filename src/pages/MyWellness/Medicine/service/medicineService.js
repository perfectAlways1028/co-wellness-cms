import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneMedicineService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/medicines/${id}`
});
}
export function findMedicineService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/medicines`,
      params: data,
  });
}

export function createMedicineService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/medicines`,
    data: data,
  });
}


export function updateMedicineService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/medicines/${id}`,
    data: data,
  });
}

export function deleteMedicineService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/medicines/${id}/delete`,
  });
}

