import React from 'react';
import styles from './styles.scss';

const Content: React.FC = function(props) {
  return (
    <div className={styles.content}>
      {props.children}
    </div>
  )
}

export default Content;
