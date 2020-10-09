import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Descriptions, Button } from 'antd';
import styles from './styles.scss';
import auth from '../../api/auth';
import { IAction, ActionTypes, IState } from '../../store';

const User: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  function signOut() {
    auth.clearJWT();
    const action: IAction = {
      type: ActionTypes.ChangeName,
      name: ''
    }
    dispatch(action);
    history.push('/');
  }

  function switchUser() {
    history.push('/log')
  }
  const { userId, userName, type, age } = useSelector((state: IState) => state);
  return (
    <div>
      <h1>User Information</h1>
      <h3>Hello, {userName}</h3>
      <Descriptions bordered className={styles.table}>
        <Descriptions.Item label='User Name'>{userName}</Descriptions.Item>
        <Descriptions.Item label='User ID'>{userId}</Descriptions.Item>
        <Descriptions.Item label='Age'>{age}</Descriptions.Item>
        <Descriptions.Item label='User Type'>{userType(type)}</Descriptions.Item>
        <Descriptions.Item label='Remarks'>-</Descriptions.Item>
      </Descriptions>
      <div className={styles.actionwrap}>
        <Button className={styles.btn} danger onClick={() => signOut()}>Sign out</Button>
        <Button className={styles.btn} type='primary' onClick={() => switchUser()}>Switch User</Button>
      </div>
    </div>
  );
}

export const userType = function(type: number): string {
  console.log(type);
  switch (type) {
    case 1: return 'Administrator';
    case 2: return 'Super User';
    default: return 'Normal User';
  }
}

export default User;
