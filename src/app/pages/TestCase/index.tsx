import React from 'react';
import Authorization from '../../common/Authorization';
import TestCase from './TestCase';

const ProtectedTestCase: React.FC = () => {
  return (
    <Authorization enable={false}>
      <TestCase />
    </Authorization>
  );
}

export default ProtectedTestCase;
