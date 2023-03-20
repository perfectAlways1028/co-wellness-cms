import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneMedicationRecordService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/medication-records/${id}`
});
}
export function findMedicationRecordService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/medication-records`,
      params: data,
  });
}

export function updateMedicationRecordService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/medication-records/${id}`,
    data: data,
  });
}

export function deleteMedicationRecordService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/medication-records/${id}/delete`,
  });
}

