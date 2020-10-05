import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Button } from 'antd';
import axios from '../../api/ajax';
import Video from './Video';
import styles from './test.scss';
import img from '../../../assets/movie.svg';

interface IParams {
  name: string
}

const Test: React.FC = () => {
  const { name } = useParams<IParams>();
  const history = useHistory();
  const [load, setLoad] = useState<boolean>(true);
  const [videoList, setVideoList] = useState<string[]>([]);
  console.log('name:' + name);
  useEffect(() => {
    axios.get('/video/list')
      .then((res) => {
        const list: string[] = [];
        for (let i = 0; i < res.data.length; i++) {
          list.push(res.data[i].replace('.mp4', ''));
        }
        setVideoList(list);
        setLoad(false);
      })
      .catch(() => { console.log('Load Err') })
  }, [])
  return (
    <div>
      <Link to ='/' className={styles.back} >Home</Link>
      {
        load ? 'Loading'
          : <div className={styles.linkWrapper}>
            {videoList.map((name: string) =>
              <Button className={styles.link}
                onClick={() => history.push('/video/' + name)}
                key={name}>
                {name.toUpperCase()}
              </Button>
            )}
          </div>
      }

      {name ? <Video name={name} /> : <img src={img} alt = 'image err' className={styles.icon}/>}
    </div>
  );
}

export default Test;
