import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findLeaderboardCompetitionTeamService(data) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/competition/leaderboard/team/find`,
      data: data,
  });
}

export function findLeaderboardCompetitionTeamEmployeeService(data) {
    return axios.Post({
        url: `${config.baseUrl}/admin/v1/competition/leaderboard/team/member/find`,
        data: data,
    });
}

export function findLeaderboardCompetitionPointHistoryService(data) {
    return axios.Post({
        url: `${config.baseUrl}/admin/v1/competition/leaderboard/pointHistory/find`,
        data: data,
    });
}