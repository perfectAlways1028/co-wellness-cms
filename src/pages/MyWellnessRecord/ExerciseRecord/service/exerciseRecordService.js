import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneExerciseTargetRecordService(id, data) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/exercise-records/target/${id}`,
    params: data,
});
}
export function findExerciseTargetRecordService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/exercise-records`,
      params: data,
  });
}

export function deleteExerciseRecordService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/exercise-records/${id}/delete`,
  });
}

