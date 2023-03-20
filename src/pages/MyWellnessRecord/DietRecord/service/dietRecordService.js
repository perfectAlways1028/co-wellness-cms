import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneDietTargetRecordService(id, data) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/diet-records/target/${id}`,
    params: data,
});
}
export function findDietTargetRecordService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/diet-records`,
      params: data,
  });
}

export function deleteDietRecordService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/diet-records/${id}/delete`,
  });
}

