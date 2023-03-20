import axios from '@helpers/axios';
import config from '@config';

export function findRewardHistoryService({
  limit,
  sort,
  offset,
  query,
  status,
  employee,
  reward,
  startDate,
  endDate }) {
  return axios.Get({
    url: `${config.baseUrl}/admin/v1/rewardRecord/find?limit=${limit}&sort=${sort}&offset=${offset}&query=${query}&status=${status}&employee=${employee}&reward=${reward}&startDate=${startDate}&endDate=${endDate}`
  });
}