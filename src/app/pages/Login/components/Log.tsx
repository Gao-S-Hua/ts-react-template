import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IAction, ActionTypes, INITACTION } from '../../../store';
import { setJWT } from '../../../api/auth';
import axios from '../../../api/ajax';
import style from '../log.scss';

const TIME_GAP = 1;

const Log: React.FC = function() {
  const [jump, setJump] = useState(false);
  const [err, setErr] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const log = (): void => {
    // userAuth.setJWT();
    const nameNode = document.getElementById('name') as HTMLInputElement;
    const pswdNode = document.getElementById('pswd') as HTMLInputElement;
    const name = nameNode ? nameNode.value : '';
    const pswd = pswdNode ? pswdNode.value : '';
    axios.post('/users/login', {
      name: name,
      password: pswd
    }).then((res) => {
      if (res.data.status === 0) {
        setErr(false);
        setJWT(res.data.data.token);
        setJump(true);
        const action: IAction = { ...INITACTION };
        action.type = ActionTypes.UserInfo;
        action.name = res.data.data.name;
        action.userType = res.data.data.type;
        dispatch(action);
        message.success('Login Successful')
        setTimeout(() => { history.push('/') }, TIME_GAP * 1000);
      } else {
        setErr(true);
      }
    });
  }
  return (
    <div className = { style.login }>
      <Input placeholder = 'User Name' type = 'text' id = 'name'/>
      <Input placeholder = 'Password' type = 'password' id = 'pswd'/>
      <Button onClick = {log} className = { style.logbutton } type = 'primary'>Log In</Button> <br />
      { jump ? <div> Redirecting to Home. . .</div> : null }
      { err ? <div className = { style.err }> User Name or Password Error </div> : null}
    </div>
  );
}

export default Log;
