import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findCompetitionTeamEmployeeService(data) {
    return axios.Post({
        url: `${config.baseUrl}/admin/v1/competition/team/employee/find`,
        data: data,
    });
  }
export function findEmployeesNotInCompetitionService(data) {
    return axios.Post({
        url: `${config.baseUrl}/admin/v1/competition/team/employee/find/not`,
        data: data,
    });
  }
  

export function createCompetitionTeamEmployeeService(data) {
    return axios.Post({
        url: `${config.baseUrl}/admin/v1/competition/team/employee`,
        data: data,
    });
}
export function bulkCreateCompetitionTeamEmployeeService(data) {
    return axios.Post({
        url: `${config.baseUrl}/admin/v1/competition/team/employee/bulkCreate`,
        data: data,
    });
}

export function deleteCompetitionTeamEmployeeService(id) {
    return  axios.Delete({
        url: `${config.baseUrl}/admin/v1/competition/team/employee/${id}`,    
    });
}
  