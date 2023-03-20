import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOwnSetting(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/setting`
});
}

export function updateSetting(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/setting`,
    data: data,
  });
}
