import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOnePrescriptionService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/prescriptions/${id}`
});
}
export function findPrescriptionService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/prescriptions`,
      params: data,
  });
}

export function updatePrescriptionService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/prescriptions/${id}`,
    data: data,
  });
}

export function deletePrescriptionService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/prescriptions/${id}/delete`,
  });
}

