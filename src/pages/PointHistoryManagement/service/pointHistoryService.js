import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOnePointHistoryService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/pointHistory/${id}`
  });
}
export function findPointHistoryService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/pointHistory/find`,
    data: data,
  });
}
export function injectCoin(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/pointHistory/create`,
    data: data,
  });
}
export function bulkInjectCoin({ data, onUploadProgress }) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/pointHistory/bulkCreate`,
    data: data,
    onUploadProgress
  });
}