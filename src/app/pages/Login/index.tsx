import React, { useState } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IAction, ActionTypes, INITACTION } from '../../store';
import { setJWT } from '../../api/auth';
import axios from '../../api/ajax';
import style from './log.scss';

const TIME_GAP = 1;

const Login: React.FC = () => {
  const [jump, setJump] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const log = (): void => {
    // userAuth.setJWT();
    axios.post('/users', {
      name: 'admin',
      password: 'admin'
    }).then((res) => {
      if (res.data.status === 0) {
        setJWT(res.data.data.token)
      }
    });
    setJump(true);
    const action: IAction = { ...INITACTION };
    action.type = ActionTypes.ChangeName;
    action.name = 'Huahua';
    dispatch(action);
    setTimeout(() => { history.push('/') }, TIME_GAP * 1000);
  }

  return (
    <div className = { style.log }>
      <h1>Login Page</h1>
      <Button onClick = {log}>Log In</Button> <br />
      {jump ? <h3>Login Successful, jumping to Home. . .</h3> : null}
    </div>
  );
}

export default Login;
