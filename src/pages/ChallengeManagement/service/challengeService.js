import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneChallengeService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/challenge/${id}`
});
}
export function findChallengeService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/challenge/find`,
      data: data,
  });
}

export function createChallengeService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/challenge`,
    data: data,
  });
}

export function createChallengeFromTemplateService(id, data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/challenge/fromTemplate/${id}`,
    data: data,
  });
} 


export function updateChallengeService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/challenge/${id}`,
    data: data,
  });
}

export function deleteChallengeService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/challenge/${id}`,
  });
}

export function uploadImageService(path, type) {
  let formData = new FormData();
  formData.append("file", path );
  formData.append("type", type);
  return axios.MultipartPost({
    url: `${config.baseUrl}/admin/v1/general/uploadImage`,
    formData: formData,
  });
}
