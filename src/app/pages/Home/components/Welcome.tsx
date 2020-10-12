import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import { Progress, Card } from 'antd';
import { progressTag } from '../../TestCase/TestCase';
import axios from '../../../api/ajax';
import img from '../../../../assets/task.png';
import { IState } from '../../../store';
import styles from './styles.scss';

interface ICount {
  complete: number;
  inProgress: number;
  reject: number;
}
const initCount: ICount = {
  complete: 0,
  inProgress: 0,
  reject: 0
}

const HomeLog: React.FC = function() {
  const [caseCount, setCaseCount] = useState<ICount>(initCount);
  const history = useHistory();
  const name = useSelector((state: IState) => state.userName);
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    axios.get('/case/stat')
      .then((res) => { setCaseCount(res.data) })
      .catch(() => { setCaseCount(initCount) });
  }, []);
  const allCount = (): number => {
    return caseCount.complete + caseCount.inProgress + caseCount.reject;
  }
  const percent = (count: number): number => {
    const pct = count / allCount();
    return parseFloat((pct * 100).toFixed(1));
  }
  return (
    <>
      <h1>Welcome, <span className={styles.user} onClick={() => history.push('/uinfo')}>{name}</span></h1>
      <h2>Current Progress:</h2>
      <div className={styles.wrap}>
        <Card title='Total Testcase' className={styles.card} onClick={() => history.push('/case/status')}>
          <Progress type='circle' percent={70} size="small" status="active" />
        </Card>
        <Card title='Details:'>
          <div className={styles.info}>
            <div className={styles.data}>
              <div className={styles.tag}>{progressTag(10)} : { allCount() }</div>
              <div className={styles.tag}>{progressTag(0)} : {caseCount.complete}</div>
              <div className={styles.tag}>{progressTag(1)} : {caseCount.inProgress}</div>
              <div className={styles.tag}>{progressTag(-1)} : {caseCount.reject}</div>
            </div>
            <div className={styles.img}>
              <img src={img} className={styles.task} />
            </div>
          </div>
        </Card>
      </div>
      <h3>Statistics：</h3>
      <div className={styles.wrap}>
        <Card title='Completed Testcase' className={styles.card} onClick={() => history.push('/case/status#2')}>
          <Progress type='circle' percent={percent(caseCount.complete)} size="small" status="active" strokeColor='#52c41a'/>
        </Card>
        <Card title='Testcase In Progress' className={styles.card} onClick={() => history.push('/case/status#3')}>
          <Progress type='circle' percent={percent(caseCount.inProgress)} size="small" status="active" />
        </Card>
        <Card title='Rejected Testcase' className={styles.card} onClick={() => history.push('/case/status#4')}>
          <Progress type='circle' percent={percent(caseCount.reject)} size="small" status="active" strokeColor='#ff4d4f'/>
        </Card>
      </div>
    </>
  )
}

export default HomeLog;
