import React, { useState } from 'react';
import Log from './components/Log';
import Regist from './components/Regist';
import { useHistory } from 'react-router-dom';
import style from './log.scss';
import logo from '../../../assets/back.svg';

const Login: React.FC = () => {
  const [select, setSelect] = useState(true);
  const history = useHistory();
  return (
    <div className = { style.log }>
      <img className = { style.logo } src = {logo} onClick = {() => history.push('/')}/>
      <div className = { style.logpanel }>
        <div className = {style.title}>
          <span className = {select ? style.select : style.unselect} onClick = { () => setSelect(true) }>Log In</span>
          <span> | </span>
          <span className = {select ? style.unselect : style.select} onClick = { () => setSelect(false) }>Sign Up</span>
        </div>
        { select ? <Log /> : <Regist /> }
      </div>
    </div>
  );
}

export default Login;
