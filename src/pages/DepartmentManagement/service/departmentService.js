import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneDepartmentService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/department/${id}`
});
}
export function findDepartmentService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/department/find`,
      data: data,
  });
}

export function createDepartmentService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/department`,
    data: data,
  });
}


export function updateDepartmentService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/department/${id}`,
    data: data,
  });
}

export function deleteDepartmentService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/department/${id}`,
  });
}

