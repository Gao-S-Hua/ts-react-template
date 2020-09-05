import React, { useState } from 'react';
import { Button } from 'antd';
import { NewAjax } from '../../api/ajax';
import { logIn, getUser } from '../../api/user';

interface ICancel {
  valid: boolean;
  call(): void;
}

const emptyCancel: ICancel = {
  valid: false,
  call: () => { console.log('empty') }
}

const Test: React.FC = () => {
  const [result, setResult] = useState('');
  const [cancel, setCancel] = useState(emptyCancel);
  const handleRequest = () => {
    const ajax = new NewAjax();
    const canceller: ICancel = {
      valid: true,
      call: ajax.cancel
    }
    setCancel(canceller);
    ajax.ajax.get('https://swapi.dev/api/people/2')
      .then(res => { setResult(res.data.name) })
      .catch(err => console.log(err))
      .finally(() => { setCancel(emptyCancel) })
  }
  const handleCancel = () => {
    if (cancel.valid) cancel.call();
  }
  const handleLogin = () => {
    logIn({ userName: 'huahua', password: '3722' })
      .then(res => { console.log(res) })
  }
  const handleGetUser = () => {
    getUser().then(console.log);
  }
  return (
    <div>
      <Button onClick = {handleRequest}>Request</Button>
      <Button danger onClick = {handleCancel}>Cancel</Button>
      <div>{result}</div>
      <Button onClick = {handleLogin}>Log In</Button>
      <div> </div>
      <Button onClick = {handleGetUser}>Get User</Button>
    </div>
  );
}

export default Test;
