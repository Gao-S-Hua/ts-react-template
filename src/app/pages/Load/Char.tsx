import React from 'react';
import { ICharacter } from '../../api/swapi';
import { Avatar } from 'antd';
import style from './load.scss';
interface IProps {
  char: ICharacter,
  setTar(ch: ICharacter): void
}
function nameDisplay(name: string): string {
  if (name.length <= 6) return name;
  const nameArr = name.split(' ');
  let abbr = '';
  for (const wd of nameArr) {
    abbr = abbr + wd[0];
  }
  return abbr;
}
function checkValid(gender: string): boolean {
  return !(gender === 'n/a');
}
function avatarCheck(gender: string): string {
  if (gender === 'n/a') return style.invalidUser;
  if (gender === 'male') return style.user;
  return style.female;
}
const Char: React.FC<IProps> = (props) => {
  const char:ICharacter = props.char;
  return (
    <div onClick = {checkValid(char.gender) ? () => props.setTar(props.char) : () => { alert('Invalid Character') } }>
      <div className = {checkValid(char.gender) ? style.char : style.error} title = {char.name}>
        <Avatar className={avatarCheck(char.gender)}>{nameDisplay(char.name)}</Avatar>
        {char.name}
      </div>
    </div>
  );
}

export default Char;
