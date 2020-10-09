import React from 'react';
import Authorization from '../../common/Authorization';
import User from './User';

const ProtectedUser: React.FC = () => {
  return (
    <Authorization enable>
      <User />
    </Authorization>
  );
}

export default ProtectedUser;
