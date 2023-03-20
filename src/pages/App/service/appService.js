import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';


export function findOwnAdminAccessService() {
    return axios.Get({
      url: `${config.baseUrl}/admin/v1/package/adminAccess/me`
  });
}
export function findOwnFeaturesService() {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/feature`
});
}
export function findMePayorAdminService() {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/payorAdmin/me`
});
}