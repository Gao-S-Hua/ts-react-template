import axios, { AxiosRequestConfig, Canceler, AxiosInstance } from 'axios';
import auth from './auth';

const AUTH_KEY = 'Authorization'
axios.interceptors.request.use(addJWT, handleError);

function addJWT(request: AxiosRequestConfig) : AxiosRequestConfig {
  const token = auth.getJWT();
  if (token) {
    request.headers[AUTH_KEY] = 'Bearer ' + token;
  }
  return request;
}

function handleError(err: unknown) {
  // handle err here
  return Promise.reject(err);
}

// ajax request which can cancel
const CancelToken = axios.CancelToken;
export class NewAjax {
  cancel!: Canceler;
  ajax: AxiosInstance;
  constructor() {
    const ajaxRequest: AxiosInstance = axios.create({ cancelToken: new CancelToken(c => { this.cancel = c }) });
    this.ajax = ajaxRequest;
  }
}

export default axios;
