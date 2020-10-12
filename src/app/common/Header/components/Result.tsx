import React from 'react';
import { List } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './styles.scss';
import { ICase } from '../../../pages/TestCase/TestCase';

interface IProps{
  data: ICase[];
  regs: string;
}

function highLight(str: string, keyWord: string): string {
  let arr: string[] = keyWord.split(' ');
  arr = arr.filter((str: string) => str.length > 0);
  let reg: RegExp;
  if (arr.length === 1) {
    reg = new RegExp(arr[0], 'gi');
  } else {
    reg = new RegExp('(' + arr.join('|') + ')', 'gi');
  }
  return str.replace(reg, (key: string) => '<span style="color: orange">' + key + '</span>')
}

function caseToItem(caseInfo: ICase, keyWord: string) {
  const history = useHistory();
  return (
    <List.Item
      className={styles.resultItem}
      key={caseInfo.caseId}
    >
      <div
        onClick={() => { history.push('/case/info/' + caseInfo.caseId) }}
        dangerouslySetInnerHTML={{ __html: highLight(caseInfo.caseName, keyWord) }}
      >
      </div>
    </List.Item>
  );
}

const Result: React.FC<IProps> = function(props) {
  return (
    <div className={styles.resultwrap}>
      <List bordered size='small'>
        {props.data.length === 0 ? <List.Item>No Data</List.Item>
          : <div>
            {props.data.map((caseInfo: ICase) => caseToItem(caseInfo, props.regs))}
          </div>
        }
      </List>
    </div>
  );
}

export default Result;
