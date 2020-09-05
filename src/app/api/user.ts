import axios from './ajax';
import { setJWT } from './auth'
interface ILogInfo {
  userName: string;
  password: string;
}

interface IUserInfo {
  name: string;
  type: number;
}

export function logIn(userInfo: ILogInfo): Promise<unknown> {
  return new Promise((resolve, reject) => {
    axios.post('/user', userInfo)
      .then(res => {
        if (res.data.status === 0) {
          setJWT(res.data.token);
          resolve(res.data);
        } else {
          const err = new Error('Invalid User or Password');
          reject(err);
        }
      })
      .catch((err) => {
        reject(err);
      })
  })
}

export function getUser(): Promise<IUserInfo> {
  return new Promise((resolve, reject) => {
    axios.get('/user')
      .then(res => {
        if (res.data.status === 0) resolve(res.data);
        const err = new Error('Internal Error');
        reject(err);
      })
      .catch(err => { reject(err) });
  })
}
