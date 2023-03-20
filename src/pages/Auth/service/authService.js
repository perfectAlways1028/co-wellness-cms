import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function loginService({ email, password }) {
  return axios.Post({
      url: `${config.baseUrl}/admin/v1/auth`,
      data: { email, password },
  });
}
