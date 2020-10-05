import axios, { AxiosRequestConfig, Canceler, AxiosInstance } from 'axios';
import auth from './auth';

const AUTH_KEY = 'Authorization'
const myAxios = axios.create();
myAxios.interceptors.request.use(addJWT, handleError);

function addJWT(request: AxiosRequestConfig) : AxiosRequestConfig {
  const authHeader = auth.getAuthHeader();
  if (authHeader) {
    request.headers[AUTH_KEY] = authHeader;
    request.url = '/api' + request.url;
  }
  return request;
}

function handleError(err: unknown) {
  // handle err here
  return Promise.reject(err);
}

export default myAxios;

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
