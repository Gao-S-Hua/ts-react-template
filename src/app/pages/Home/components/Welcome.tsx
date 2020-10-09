import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import { Progress, Card } from 'antd';
import { progressTag } from '../../TestCase/TestCase';
import img from '../../../../assets/task.png';
import { IState } from '../../../store';
import styles from './styles.scss';

const HomeLog: React.FC = function() {
  const history = useHistory();
  const name = useSelector((state: IState) => state.userName);
  const location = useLocation();
  console.log(location);
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
              <div className={styles.tag}>{progressTag(10)} : 28</div>
              <div className={styles.tag}>{progressTag(0)} : 10</div>
              <div className={styles.tag}>{progressTag(1)} : 12</div>
              <div className={styles.tag}>{progressTag(-1)} : 6</div>
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
          <Progress type='circle' percent={100} size="small" status="active" strokeColor='#52c41a'/>
        </Card>
        <Card title='Testcase In Progress' className={styles.card} onClick={() => history.push('/case/status#3')}>
          <Progress type='circle' percent={66.7} size="small" status="active" />
        </Card>
        <Card title='Rejected Testcase' className={styles.card} onClick={() => history.push('/case/status#4')}>
          <Progress type='circle' percent={10} size="small" status="exception"/>
        </Card>
      </div>
    </>
  )
}

export default HomeLog;
