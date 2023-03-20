import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneChallengeTemplateService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/challenge/template/${id}`
});
}
export function findChallengeTemplateService(data) {
  data.isTemplate = true;
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/challenge/find`,
      data: data,
  });
}

export function createChallengeTemplateService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/challenge/template`,
    data: data,
  });
}


export function updateChallengeTemplateService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/challenge/template/${id}`,
    data: data,
  });
}

export function deleteChallengeTemplateService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/challenge/template/${id}`,
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
