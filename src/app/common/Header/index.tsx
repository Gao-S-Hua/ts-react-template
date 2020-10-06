import React, { useEffect } from 'react';
import styles from './styles.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/ajax';
import { IAction, ActionTypes, IState } from '../../store';
import Search from './components/Search';
import icon from '../../../assets/icon.png';
import user from '../../../assets/user.svg';

const Header: React.FC = function() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userName } = useSelector((state: IState) => state)
  useEffect(() => {
    axios.get('/users/info').then((res) => {
      const action: IAction = {
        type: ActionTypes.UserInfo,
        name: res.data.name,
        userType: res.data.type,
        num: 0
      };
      dispatch(action);
    });
  }, [])
  return (
    <div className={styles.headerwrap}>
      <div className={styles.titlewrap}>
        <img src={icon} className={styles.icon} onClick={() => { history.push('/') }}/>
        <h1 className={styles.title}>SH Management</h1>
      </div>
      <div className={styles.searchwrap}><Search /></div>
      <div className={styles.searchwrap}></div>
      <div className={styles.userwrap} >
        <img src={user} className={styles.usericon} />
        <div className={styles.user} onClick={() => { history.push('/log') }}>
          {userName.length === 0 ? 'Sign In / Sign Up' : userName}
        </div>
      </div>
    </div>
  )
}

export default Header;
