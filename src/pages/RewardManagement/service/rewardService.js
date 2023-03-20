import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneRewardService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/reward/${id}`
});
}
export function findRewardService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/reward/find`,
      data: data,
  });
}

export function createRewardService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/reward`,
    data: data,
  });
}


export function updateRewardService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/reward/${id}`,
    data: data,
  });
}

export function deleteRewardService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/reward/${id}`,
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
