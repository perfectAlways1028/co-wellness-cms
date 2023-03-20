
import { loginService } from '../service/authService';
import { observable, action, decorate, computed, } from 'mobx';
import { setRole, setToken, setPayorID, getToken } from '@helpers/storageHelper';

import { jwtDecode } from '@helpers/jwt';
class AuthStore {
  //observables
  isLoading = false;
  success = false;
  error = null;
  isAuthorized = false;
  currentAction = null;
  accessToken = null;
  role = 'superadmin';
  values = {
    email: '',
    password: '',
  };

  constructor() {
    let token = getToken();
    this.isAuthorized = token && true;
    this.accessToken = token;
  }

  //actions
  setEmail(email) {
    this.values.email = email;
  }

  setPassword(password) {
    this.values.password = password;
  }

  reset() {
    this.values.email = '';
    this.values.password = '';
  }

  login() {
    this.isLoading = true;
    this.error = undefined;
    return loginService(this.values)
      .then(action(response => {
        if (response && response.data && response.data.accessToken) {
          var jwtPayload = jwtDecode(response.data.accessToken);
          this.accessToken = response.data.accessToken;
          this.role = jwtPayload.role;
          this.payorID = jwtPayload.payorID;
          this.isAuthorized = true;
          this.success = true;
          this.error = null;

          setToken(response.data.accessToken);
          setRole(this.role);
          setPayorID(this.payorID);

        } else {
          this.success = false;
          this.error = 'No access token.';
        }

      }))
      .catch(action((err) => {
        this.error = err.message;
        throw err;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  logout() {
    this.isAuthorized = false
    this.accessToken = null;
    return Promise.resolve();
  }
}

decorate(AuthStore, {
  isLoading: observable,
  success: observable,
  error: observable,
  isAuthorized: observable,
  currentAction: observable,
  accessToken: observable,
  values: observable,

  setEmail: action,
  setPassword: action,
  setUsername: action,

  reset: action,
  login: action,
  logout: action
});

export default new AuthStore();