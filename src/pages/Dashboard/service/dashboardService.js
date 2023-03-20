import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findDashboardInfoService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/general/dashboard/find`,
    data: data,
});
}

export function findMCUInfoService() {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/mcu/payors-corporate-wellness/parameters`,
  })
}
