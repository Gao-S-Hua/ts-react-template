import React from 'react';
import styles from './styles.scss';
interface IProp{
  children: React.ReactNode;
}
const Content: React.FC<IProp> = function(props: IProp) {
  return (
    <div className={styles.content}>
      {props.children}
    </div>
  )
}

export default Content;
