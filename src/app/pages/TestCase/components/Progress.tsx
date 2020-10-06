import React from 'react';
import img from '../../../../assets/progress.png'
import styles from './styles.scss';

const Progress: React.FC = function() {
  return (
    <div className={styles.progressWrap}>
      <h2>Data Collection In Progress</h2>
      <img src={img} className={styles.progressimage}/>
    </div>
  );
}

export default Progress;
