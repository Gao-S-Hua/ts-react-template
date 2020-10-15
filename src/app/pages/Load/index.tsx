import React from 'react';
import Authorization from '../../common/Authorization';
import Load from './Load';

const ProtectedLoad: React.FC = () => {
  return (
    <Authorization enable={false}>
      <Load />
    </Authorization>
  );
}

export default ProtectedLoad;
