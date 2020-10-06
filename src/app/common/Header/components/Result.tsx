import React from 'react';
import { List } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './styles.scss';
import { ICase } from '../../../pages/TestCase/TestCase';

interface IProps{
  data: ICase[];
}

function caseToItem(caseInfo: ICase) {
  const history = useHistory();
  return (
    <List.Item
      className={styles.resultItem}
      key={caseInfo.caseId}
    >
      <div onClick={() => { history.push('/case/info/' + caseInfo.caseId) }}>
        {caseInfo.caseName}
      </div>
    </List.Item>
  );
}

const Result: React.FC<IProps> = function(props: IProps) {
  return (
    <div className={styles.resultwrap}>
      <List bordered size='small'>
        {props.data.length === 0 ? <List.Item>No Data</List.Item>
          : <div>
            {props.data.map((caseInfo: ICase) => caseToItem(caseInfo))}
          </div>
        }
      </List>
    </div>
  );
}

export default Result;
