import React from 'react';
import { ICharacter } from '../../api/swapi'
import './load.scss';
interface IProps {
  char: ICharacter
}

const Char: React.FC<IProps> = (props: IProps) => {
  const char:ICharacter = props.char;
  return (
    <div className = {char.gender === 'n/a' ? 'error' : 'char'} title = {char.name}>
      Name: {char.name} {'\n'}
      Gender: {char.gender} {'\n'}
      Height: {char.height}cm {'\n'}
      Mass: {char.mass}kg {'\n'}
    </div>
  );
}

export default Char;
