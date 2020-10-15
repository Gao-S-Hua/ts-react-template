import React from 'react';
import { ICharacter } from '../../api/swapi';
import { Card, Descriptions } from 'antd';
import img from '../../../assets/user.svg';
import style from './load.scss';

interface IProps {
  char: ICharacter
}

const title = (name:string): React.ReactNode => {
  return (
    <div>
      <img src={img} width='30px'/>
      {name}
    </div>
  );
}

const Display: React.FC<IProps> = (props) => {
  const char:ICharacter = props.char;
  return (
    <div className = {style.tag}>
      <Card title={title(char.name)} className={style.card}>
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{char.name}</Descriptions.Item>
          <Descriptions.Item label="Gender">{char.gender}</Descriptions.Item>
          <Descriptions.Item label="Height">{char.height}cm</Descriptions.Item>
          <Descriptions.Item label="Mass">{char.mass}kg</Descriptions.Item>
        </Descriptions>
        <h3>Normal User</h3>
      </Card >
    </div>
  );
}

export default Display;
