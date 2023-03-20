import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneJobService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/job/${id}`
});
}
export function findJobService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/job/find`,
      data: data,
  });
}

export function createJobService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/job`,
    data: data,
  });
}


export function updateJobService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/job/${id}`,
    data: data,
  });
}

export function deleteJobService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/job/${id}`,
  });
}

