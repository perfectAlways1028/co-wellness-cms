import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOnePackgeService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/package/${id}`
});
}
export function findPackageService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/package/find`,
      data: data,
  });
}

export function createPackageService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/package`,
    data: data,
  });
}

export function updatePackageService(id, data) {
  console.log("id",id);
  console.log("data",data);
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/package/${id}`,
    data: data,
  });
}

export function deletePackageService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/package/${id}`
  });
}

export function findAdminAccessService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/package/${id}/adminAccess`
});
}

export function updateAdminAccessService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/package/${id}/adminAccess`,
    data: data,
});
}