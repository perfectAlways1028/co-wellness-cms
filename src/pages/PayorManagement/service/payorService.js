import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOnePayorService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/payor/${id}`
});
}
export function findPayorService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/payor/find`,
      data: data,
  });
}

export function createPayorService(data) {
  console.log("create payor", data);
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/payor`,
    data: data,
  });
}


export function updatePayorService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/payor/${id}`,
    data: data,
  });
}

export function deletePayorService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/payor/${id}`,
  });
}

export function uploadImageService(path, type) {
  console.log("path", path);
  let formData = new FormData();
  formData.append("file", path );
  formData.append("type", type);
  return axios.MultipartPost({
    url: `${config.baseUrl}/admin/v1/general/uploadImage`,
    formData: formData,
  });
}

export function payorAdminChangePasswordService(id, data) {
  console.log("changePassword", data);
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/payorAdmin/changePassword/${id}`,
    data: data,
  });
}

export function findMCUPayorService(){
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/mcu/payors-list`,
});
}