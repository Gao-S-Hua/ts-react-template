import React from 'react';
import { ICharacter } from '../../api/swapi';
import style from './load.scss';
interface IProps {
  char: ICharacter,
  setTar(ch: ICharacter): void
}

const Char: React.FC<IProps> = (props: IProps) => {
  const char:ICharacter = props.char;
  return (
    <div onClick = {char.gender === 'n/a' ? () => { alert('Invalid Character') } : () => props.setTar(props.char) }>
      <div className = {char.gender === 'n/a' ? style.error : style.char} title = {char.name}>
        Name: {char.name} {'\n'}
        Gender: {char.gender} {'\n'}
      </div>
    </div>
  );
}

export default Char;
