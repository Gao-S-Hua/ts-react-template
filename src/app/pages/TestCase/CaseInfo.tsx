import React, { useEffect, useState } from 'react';
import axios from '../../api/ajax';
import { Card } from 'antd';
import { useParams } from 'react-router-dom'
import { ICase } from './TestCase';
import CaseLabel from './components/CaseLabel';
import DataDisplay from './components/DataDisplay';
import Progress from './components/Progress';
import styles from './styles.scss';

interface IParams {
  id: string
}

const CaseInfo: React.FC = function() {
  const [caseInfo, setCaseInfo] = useState<ICase|undefined>(undefined);
  const [load, setLoad] = useState<boolean>(true);
  const { id } = useParams<IParams>();
  useEffect(() => {
    axios.get('/case/info/' + id).then((res) => {
      setCaseInfo(res.data);
      setLoad(false);
    })
  }, [])
  return (
    <div>
      <h1>Case Details:</h1>
      {load ? 'Loading...'
        : <Card title={caseInfo?.caseName} className={styles.casewrapper}>
          <CaseLabel caseInfo={caseInfo as ICase}/>
          { caseInfo?.progress === 0 ? <DataDisplay data={caseInfo.data} /> : null}
          { caseInfo?.progress === 1 ? <Progress /> : null}
        </Card>
      }
    </div>
  );
}

export default CaseInfo;
