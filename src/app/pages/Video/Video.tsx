import React, { useEffect, useRef } from 'react';
import styles from './test.scss';
interface IProps {
  name: string
}

const Video: React.FC<IProps> = (props: IProps) => {
  const videoEl: React.MutableRefObject<HTMLVideoElement | null> = useRef(null);
  useEffect(() => {
    console.log('load');
    if (videoEl) {
      videoEl.current?.load();
    }
  }, [props]);
  return (
    <div>
      <h1 className={styles.title}>{props.name}</h1>
      <video ref={videoEl} className={styles.video} controls>
        <source src={'/media/' + props.name + '.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Video;
