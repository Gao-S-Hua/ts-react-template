import React from 'react';
import { useHistory } from 'react-router-dom'
import img from '../../../../assets/login.png';
import styles from './styles.scss';

const HomeLog: React.FC = function() {
  const history = useHistory();
  return (
    <>
      <h2>Welcome, Please <span className={styles.logtitle} onClick={() => history.push('/log')}>Log In</span></h2>
      <img src={img} className={styles.image}/>
    </>
  )
}

export default HomeLog;
