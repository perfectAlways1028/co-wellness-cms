import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneCompetitionChallengeService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/challenge/${id}`
});
}
export function findCompetitionChallengeService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/challenge/find`,
      data: data,
  });
}

export function createCompetitionChallengeService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/challenge/competition`,
    data: data,
  });
}

export function deleteCompetitionChallengeService(id) {
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
