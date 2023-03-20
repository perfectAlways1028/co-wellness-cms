import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneWeightRecordService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/weight-records/${id}`
});
}
export function findWeightRecordService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/weight-records`,
      params: data,
  });
}

export function updateWeightRecordService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/weight-records/${id}`,
    data: data,
  });
}

export function deleteWeightRecordService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/weight-records/${id}/delete`,
  });
}

