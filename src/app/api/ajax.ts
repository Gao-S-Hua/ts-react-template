import axios, { AxiosRequestConfig, Canceler, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';
import auth from './auth';

const AUTH_KEY = 'Authorization'
const myAxios = axios.create();
myAxios.interceptors.request.use(addJWT);
myAxios.interceptors.response.use(resHandle, resErrHandle)

function addJWT(request: AxiosRequestConfig) : AxiosRequestConfig {
  const authHeader = auth.getAuthHeader();
  if (authHeader) {
    request.headers[AUTH_KEY] = authHeader;
  }
  request.url = '/api' + request.url;
  return request;
}

function resHandle(response: AxiosResponse) {
  if (response.status === 200) return Promise.resolve(response);
  else return Promise.reject(response);
}

function resErrHandle(err: AxiosError) {
  if (err.response && err.response.status) {
    switch (err.response.status) {
      case 401: {
        message.error('Please Log In');
        break;
      }
      case 403: {
        message.error('User Auth expired, please log again', 1);
        auth.clearJWT();
        break;
      }
      case 404: {
        message.error('Your Request doesn\'t exist', 1);
        break;
      }
      default: {
        message.error('Netwrok Error, Please try again', 1);
        break;
      }
    }
  }
  return Promise.reject(err.response);
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
