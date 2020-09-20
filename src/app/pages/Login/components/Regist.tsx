import React, { useState } from 'react';
import { Button, Input, Radio, Divider } from 'antd';
// import { useHistory } from 'react-router-dom';
import { RadioChangeEvent } from 'antd/lib/radio';
import axios from '../../../api/ajax';
import style from '../log.scss';

const Regist: React.FC = function() {
  const [type, setType] = useState(0);
  const [err, setErr] = useState(false);
  const onChange = (e: RadioChangeEvent) => {
    setType(parseInt(e.target.value));
  }
  const handleSubmit = () => {
    const nameNode = document.getElementById('name') as HTMLInputElement;
    const pswdNode = document.getElementById('pswd') as HTMLInputElement;
    const pswdNode2 = document.getElementById('pswd2') as HTMLInputElement;
    const name = nameNode ? nameNode.value : '';
    const pswd = pswdNode ? pswdNode.value : '';
    const pswd2 = pswdNode2 ? pswdNode2.value : '';
    if (pswd === pswd2 && name.length > 1 && pswd.length >= 4) {
      setErr(false);
      axios.post('/users/signup', {
        name,
        password: pswd,
        type
      }).then(res => {
        if (res.data.status === 0) alert('Sign up Successful!');
        else alert('User Name is Taken, please use other names');
      }).catch(() => {
        alert('Sign Up Error');
      })
    } else {
      setErr(true);
    }
  }
  return (
    <div className = { style.login }>
      <Input placeholder = 'User Name' type = 'text' id = 'name'/>
      <Input placeholder = 'Password' type = 'password' id = 'pswd'/>
      <Input placeholder = 'Confirm Password' type = 'password' id = 'pswd2'/>
      <Divider />
      Regist Type:
      <Radio.Group onChange = { onChange } value={type}>
        <Radio value={0}>Normal User</Radio>
        <Radio value={2}>Super User</Radio>
        <Radio value={1}>Admin User</Radio>
      </Radio.Group>
      <Divider />
      <div className = { style.caution }>
        Caution: <br />
        User Name length not less than 4 <br />
        Password length not less than 4 <br />
      </div>
      <Button className = { style.registbutton } type = 'primary' onClick = { handleSubmit }>Regist</Button> <br />
      { err ? <div className = { style.err }> ** Error: <br/>Password not same or User Name error </div> : null}

    </div>
  );
}

export default Regist;
