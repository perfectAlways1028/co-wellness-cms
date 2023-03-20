import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function automaticallyGenerateTeamsService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/competition/team/generate`,
      data: data,
  });
}
export function findCompetitionTeamService(data) {
    return axios.Post({
        url: `${config.baseUrl}/admin/v1/competition/team/find`,
        data: data,
    });
  }
  

export function createCompetitionTeamService(data) {
    return axios.Post({
        url: `${config.baseUrl}/admin/v1/competition/team`,
        data: data,
    });
}

export function deleteCompetitionTeamService(id) {
    return  axios.Delete({
        url: `${config.baseUrl}/admin/v1/competition/team/${id}`,    
    });
}
  