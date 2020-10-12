import React from 'react';
import { Link } from 'react-router-dom';
import userAuth from '../api/auth';

interface IProps {
  enable: boolean;
}

const Authorization: React.FC<IProps> = function(props) {
  if (!props.enable || userAuth.verifyJWT()) {
    return (
      <div> {props.children} </div>
    )
  }
  return (
    <div>
      <h2>No Authorization</h2>
      Please login<br></br>
      <Link to = '/log' >Log In</Link>
    </div>
  )
}

export default Authorization;
