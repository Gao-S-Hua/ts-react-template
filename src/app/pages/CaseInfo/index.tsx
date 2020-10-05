import React from 'react';
import { useParams } from 'react-router-dom'

interface IParams {
  id: string
}

const CaseInfo: React.FC = function() {
  const { id } = useParams<IParams>();
  return (
    <div>
      <h1>Case Details:</h1>
      {id}
    </div>
  );
}

export default CaseInfo;
