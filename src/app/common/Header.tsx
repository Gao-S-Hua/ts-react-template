import React from 'react';
import styles from './styles.scss';
import { useHistory } from 'react-router-dom';
import icon from '../../assets/icon.png';

const Header: React.FC = function() {
  const history = useHistory();
  return (
    <div className={styles.header}>
      <img src={icon} className={styles.icon} onClick={() => { history.push('/') }}/>
      <h1 className={styles.title}>SH Management</h1>
    </div>
  )
}

export default Header;
