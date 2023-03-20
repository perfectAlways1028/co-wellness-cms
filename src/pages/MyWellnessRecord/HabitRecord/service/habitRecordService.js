import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneHabitRecordService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/habit-records/${id}`
});
}
export function findHabitRecordService(data) {
  return axios.Get({
      url: `${config.baseUrl}/admin/v1/habit-records`,
      params: data,
  });
}

export function deleteHabitRecordService(id) {
  return  axios.Put({
    url: `${config.baseUrl}/admin/v1/habit-records/${id}/delete`,
  });
}

