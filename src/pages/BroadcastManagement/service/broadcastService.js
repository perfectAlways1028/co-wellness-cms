import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneBroadcastService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/broadcast/${id}`
});
}
export function findBroadcastService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/broadcast/find`,
      data: data,
  });
}

export function createBroadcastService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/broadcast`,
    data: data,
  });
}


export function updateBroadcastService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/broadcast/${id}`,
    data: data,
  });
}
