import React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Button } from 'antd';
import Video from './Video';
import styles from './test.scss';
import img from '../../../assets/movie.svg';

const videoList: string[] = [
  'CHN-191', 'BGN-060',
  'cawd-118', 'MSFH-030',
  'STARS-278', 'mimk-072',
  'EBOD-762', 'SSNI-752',
  'miaa-293', 'ABP-999',
  'FSDSS-080', 'FSDSS-072',
  'ABP-993', 'fsdss-043',
  'ABP-989', 'ABP995'
]

interface IParams {
  name: string
}

const Test: React.FC = () => {
  const { name } = useParams<IParams>();
  const history = useHistory();
  return (
    <div>
      <Link to ='/' className={styles.back} >Home</Link>
      <div className={styles.linkWrapper}>
        {videoList.map((name: string) => <Button className={styles.link} onClick={() => history.push('/video/' + name)} key={name}>{name.toUpperCase()}</Button>)}
      </div>
      {name === '0' ? <img src={img} alt = 'image err' className={styles.icon}/> : <Video name={name} />}
    </div>
  );
}

export default Test;
