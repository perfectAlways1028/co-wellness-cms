import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneSymptomRecordService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/symptoms-records/${id}`
});
}
export function findSymptomRecordService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/symptoms-records`,
      params: data,
  });
}

export function updateSymptomRecordService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/symptoms-records/${id}`,
    data: data,
  });
}

export function deleteSymptomRecordService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/symptoms-records/${id}/delete`,
  });
}

