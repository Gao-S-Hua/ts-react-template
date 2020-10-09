import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import HomeLog from './components/HomeLog';
import Welcome from './components/Welcome';
import style from './style.scss';

const Home: React.FC = () => {
  const { userName } = useSelector((state: IState) => state);

  return (
    <div className = {style.home}>
      <div className = {style.container}>
        {userName === '' ? <HomeLog /> : <Welcome />}
      </div>
    </div>
  );
}

export default Home;
