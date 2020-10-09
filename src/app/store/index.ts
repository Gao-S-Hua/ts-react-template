import { createStore, Store, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export enum ActionTypes {
  Add,
  Minus,
  ChangeName,
  DefaultValue,
  UserInfo
}

export interface IAction {
  type: ActionTypes;
  name?: string;
  num?: number;
  userType?: number;
}

export interface IState {
  userName: string;
  userId: string;
  age: number;
  type: number;
}

export const INITACTION: IAction = {
  type: ActionTypes.DefaultValue,
  name: '',
  num: 0,
  userType: 0
}

const store: Store<IState, IAction> = createStore(reducer, applyMiddleware(thunk));
export default store;
