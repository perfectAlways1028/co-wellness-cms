import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function finalizeCompetitionCreationService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/competition/finalize`,
    data: data,
});
}
export function findOneCompetitionService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/competition/${id}`
});
}
export function findCompetitionService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/competition/find`,
      data: data,
  });
}

export function createCompetitionService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/competition`,
    data: data,
  });
}

export function updateCompetitionService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/competition/${id}`,
    data: data,
  });
}

export function deleteCompetitionService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/competition/${id}`,
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
