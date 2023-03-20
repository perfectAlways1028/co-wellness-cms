import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneBloodGlucoseTargetRecordService(id, data) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/blood-glucose-records/target/${id}`,
    params: data,
});
}
export function findBloodGlucoseTargetRecordService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/blood-glucose-records`,
      params: data,
  });
}

export function deleteBloodGlucoseRecordService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/blood-glucose-records/${id}/delete`,
  });
}

