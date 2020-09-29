import React, { useState, useEffect } from 'react';
import { ICharacter, getCharacterInfo } from '../../api/swapi';
import Char from './Char';
import Display from './Display';
import style from './load.scss';

const Load: React.FC = () => {
  const [list, setList] = useState<ICharacter[]>([]);
  const [tar, setTar] = useState<ICharacter>();
  useEffect(() => {
    const requestList = [];
    for (let i = 0; i < 10; i++) {
      requestList.push(getCharacterInfo(i + 1));
    }
    Promise.all(requestList).then((res: ICharacter[]) => {
      setList(res);
    })
  }, [])
  return (
    <div className = {style.container}>
      <div className = {style.side}>
        {
          (list.length === 0) ? <div>Loading...</div>
            : list.map((char: ICharacter) => <Char key = {char.name} char = {char} setTar = {setTar}/>)
        }
      </div>
      <div className = {style.dis}>
        {
          (tar) ? <Display char = {tar}/> : null
        }
      </div>
    </div>
  );
}

export default Load;
