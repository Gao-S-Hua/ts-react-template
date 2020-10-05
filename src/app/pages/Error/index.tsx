import React from 'react';
import { useHistory } from 'react-router-dom'
import { Result, Button } from 'antd';

const Error: React.FC = function() {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="There are some problems with your operation."
      extra={
        <Button type="primary" key="console" onClick={() => { history.push('/') }}>
          Back Home
        </Button>
      }
    />
  );
}

export default Error;
