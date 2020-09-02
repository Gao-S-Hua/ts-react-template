import React, { useState, useEffect } from 'react';
import { ICharacter, getCharacterInfo } from '../../api/swapi'
import Char from './Char';
const Load: React.FC = () => {
  const [list, setList] = useState<ICharacter[]>([]);
  useEffect(() => {
    const requestList = [];
    for (let i = 0; i < 10; i++) {
      requestList.push(getCharacterInfo(i + 1));
    }
    Promise.all(requestList).then((res: ICharacter[]) => {
      console.log(res);
      setList(res);
    })
  }, [])
  return (
    <div>
      {
        (list.length === 0) ? <div>Loading...</div>
          : list.map((char: ICharacter) => <Char key = {char.name} char = {char} />)
      }
    </div>
  );
}

export default Load;
