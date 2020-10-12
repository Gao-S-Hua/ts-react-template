import React from 'react';
import Authorization from '../../common/Authorization';
import NewCase from './NewCase';

const ProtectedNewCase: React.FC = () => {
  return (
    <Authorization enable>
      <NewCase />
    </Authorization>
  );
}

export default ProtectedNewCase;
