import axios from 'axios';

const baseUrl = 'https://swapi.dev/api/';
const peopleUrl: string = baseUrl + 'people/';
const error = 'Request Error';

export interface ICharacter{
  name: string,
  gender: string,
  height: number,
  mass: number
}

const DEFAULTPEOPLE: ICharacter = {
  name: error,
  gender: error,
  height: 0,
  mass: 0
}

export const getCharacterInfo = (index: number): Promise<ICharacter> => {
  return new Promise((resolve) => {
    const rtn: ICharacter = { ...DEFAULTPEOPLE };
    axios.get(peopleUrl + index.toString())
      .then(res => {
        const data: ICharacter = res.data;
        rtn.gender = data.gender;
        rtn.name = data.name;
        rtn.height = data.height;
        rtn.mass = data.mass;
        console.log(rtn);
        resolve(rtn);
      })
      .catch(
        () => { resolve(rtn) }
      )
  })
}
