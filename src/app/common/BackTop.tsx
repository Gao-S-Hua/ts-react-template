import React, { useEffect, useState } from 'react';
import { debounce } from '../util';
import style from './backtop.scss';
import img from '../../assets/top.svg';

const BackTop: React.FC = function() {
  const [show, setShow] = useState(false);
  const handleScroll = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 50) setShow(true);
    else setShow(false);
  }
  const debouncedScroll: any = debounce(handleScroll, 100);
  useEffect(() => {
    window.addEventListener('scroll', debouncedScroll);
    return () => { window.removeEventListener('scroll', debouncedScroll) }
  }, [])
  const handleBackTop = () => {
    window.scrollTo(0, 0);
  }
  return (
    <div className = {show ? style.backtop : style.hide} onClick = {handleBackTop}>
      <img className = {style.img} src = {img} alt = 'image err'/>
    </div>
  )
}

export default BackTop;
