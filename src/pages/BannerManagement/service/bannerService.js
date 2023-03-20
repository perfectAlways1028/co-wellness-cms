import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneBannerService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/banner/${id}`
});
}
export function findBannerService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/banner/find`,
      data: data,
  });
}

export function createBannerService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/banner`,
    data: data,
  });
}


export function updateBannerService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/banner/${id}`,
    data: data,
  });
}

export function deleteBannerService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/banner/${id}`,
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
