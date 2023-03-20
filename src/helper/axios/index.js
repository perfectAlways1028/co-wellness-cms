import axios from 'axios';
import { getToken } from '@helpers/storageHelper';
const queryParser = params => {
  let queryParams = '';
  for (let key in params) {
    if (!queryParams) {
      queryParams = queryParams.concat(`?${key}=${params[key]}`);
    } else {
      queryParams = queryParams.concat(`&${key}=${params[key]}`);
    }
  }
  return queryParams;
};

const defaultHeaders = {
  'Content-Type': 'application/json',
  // 'Accept': 'application/json'
};
const Axios = {
  Get: ({ url, params }) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: url + queryParser(params),
          method: 'GET',
          headers: {
            ...defaultHeaders,
            token: getToken(),
          },
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          if (error.response && error.response.data) {
            reject(error.response.data);
          } else {
            reject({ message: "unexpected error" });
          }
        });
    });
  },
  MultipartPost: ({ url, formData }) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: url,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            token: getToken(),
          },
          data: formData,
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          if (error.response && error.response.data) {
            reject(error.response.data);
          } else {
            reject({ message: "unexpected error" });
          }
        });
    });
  },
  Post: ({ url, data, onUploadProgress }) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: url,
          method: 'POST',
          headers: {
            ...defaultHeaders,
            token: getToken(),
          },
          data: data,
          onUploadProgress
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          if (error.response && error.response.data) {
            reject(error.response.data);
          } else {
            reject({ message: "unexpected error" });
          }
        });
    });
  },
  Put: ({ url, params, data }) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: url + queryParser(params),
          method: 'PUT',
          headers: {
            ...defaultHeaders,
            token: getToken(),
          },
          data,
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          if (error.response && error.response.data) {
            reject(error.response.data);
          } else {
            reject({ message: "unexpected error" });
          }
        });
    });
  },
  Patch: ({ url, params, data }) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: url + queryParser(params),
          method: 'PATCH',
          headers: {
            ...defaultHeaders,
            token: getToken(),
          },
          data,
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          if (error.response && error.response.data) {
            reject(error.response.data);
          } else {
            reject({ message: "unexpected error" });
          }
        });
    });
  },
  Delete: ({ url, params }) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: url + queryParser(params),
          method: 'DELETE',
          headers: {
            ...defaultHeaders,
            token: getToken(),
          },
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          if (error.response && error.response.data) {
            reject(error.response.data);
          } else {
            reject({ message: "unexpected error" });
          }
        });
    });
  },
};

export default Axios;
