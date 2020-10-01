import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { IState, IAction, INITACTION, ActionTypes } from '../../store';
import userAuth from '../../api/auth';
// import BackTop from '../../common/BackTop';
import style from './style.scss';

const Home: React.FC = () => {
  const { age, userId, userName } = useSelector((state: IState) => state);
  const [newName, setNewName] = useState('');
  const dispatch = useDispatch();
  const handleAdd = () => {
    const action: IAction = { ...INITACTION };
    action.type = ActionTypes.Add;
    dispatch(action);
  }
  const handleMin = () => {
    const action: IAction = { ...INITACTION };
    action.type = ActionTypes.Minus;
    dispatch(action);
  }
  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
  }
  const updateName = () => {
    const action: IAction = { ...INITACTION };
    action.type = ActionTypes.ChangeName;
    action.name = newName;
    dispatch(action);
    message.success('Changed Your Name: ' + newName)
  }
  return (
    <div className = {style.home}>
      <h1>Welcome</h1>
      <div className = {style.container}>
        <Input placeholder = 'Your Name' onChange = {handleName} className = {style.nameinput}/>
        <Button onClick = {updateName}>Submit</Button>
        <div>Hello {userName}, your ID is {userId}, your age is {age}.</div>
        <Button type = 'primary' onClick = {handleAdd}>Add Age</Button>
        <Button type= 'primary' danger onClick = {handleMin}>Add Age</Button>
        <Button onClick = {userAuth.clearJWT}>Clear</Button>
        {/* <BackTop /> */}
      </div>
    </div>
  );
}

export default Home;
