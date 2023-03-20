// import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneEmployeeService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/employee/${id}`,
  });
}
export function findEmployeeService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/employee/find`,
    data,
  });
}

export function createEmployeeService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/employee`,
    data: data,
  });
}
export function bulkCreateEmployeeService({ data, onUploadProgress }) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/employee/bulk`,
    data: data,
    onUploadProgress
  });
}

export function updateEmployeeService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/employee/${id}`,
    data: data,
  });
}

export function deleteEmployeeService(id) {
  return axios.Delete({
    url: `${config.baseUrl}/admin/v1/employee/${id}`
  });
}

export function uploadImageService(path, type) {
  let formData = new FormData();
  formData.append("file", path);
  formData.append("type", type);
  return axios.MultipartPost({
    url: `${config.baseUrl}/admin/v1/general/uploadImage`,
    formData: formData,
  });
}