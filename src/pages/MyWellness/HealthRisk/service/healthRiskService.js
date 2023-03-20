import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findOneHealthRiskService(id) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/healthRisk/${id}`
});
}
export function findHealthRiskService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/healthRisk/find`,
      data: data,
  });
}

export function createHealthRiskService(data) {
  return axios.Post({
    url: `${config.baseUrl}/admin/v1/healthRisk`,
    data: data,
  });
}


export function updateHealthRiskService(id, data) {
  return axios.Put({
    url: `${config.baseUrl}/admin/v1/healthRisk/${id}`,
    data: data,
  });
}

export function deleteHealthRiskService(id) {
  return  axios.Delete({
    url: `${config.baseUrl}/admin/v1/healthRisk/${id}`,
  });
}

