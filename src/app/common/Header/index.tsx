import React from 'react';
import styles from './styles.scss';
import { useHistory } from 'react-router-dom';
import icon from '../../../assets/icon.png';
import user from '../../../assets/user.svg';

const Header: React.FC = function() {
  const history = useHistory();
  return (
    <div className={styles.headerwrap}>
      <div className={styles.titlewrap}>
        <img src={icon} className={styles.icon} onClick={() => { history.push('/') }}/>
        <h1 className={styles.title}>SH Management</h1>
      </div>
      <div className={styles.userwrap} >
        <img src={user} className={styles.usericon} />
        <div className={styles.user} onClick={() => { history.push('/log') }}>Sign In / Sign Up</div>
      </div>
    </div>
  )
}

export default Header;
