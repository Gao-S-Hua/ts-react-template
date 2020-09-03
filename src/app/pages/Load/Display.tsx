import React from 'react';
import { ICharacter } from '../../api/swapi';
import style from './load.scss';
interface IProps {
  char: ICharacter
}

const Display: React.FC<IProps> = (props: IProps) => {
  const char:ICharacter = props.char;
  return (
    <div className = {style.tag}>
      <div className = {style.tagin}>
        Name: {char.name} {'\n'}
        Gender: {char.gender} {'\n'}
        Height: {char.height}cm {'\n'}
        Mass: {char.mass}kg {'\n'}
      </div>
    </div>
  );
}

export default Display;
