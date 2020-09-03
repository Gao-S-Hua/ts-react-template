import { IAction, IState, ActionTypes } from './index';

const defaultState: IState = {
  userId: '3722',
  userName: '',
  age: 28
}

const reducer = (state: IState = defaultState, action: IAction) : IState => {
  const newState: IState = { ...state };
  switch (action.type) {
    case ActionTypes.Add: {
      newState.age++;
      return newState;
    }
    case ActionTypes.Minus: {
      newState.age--;
      return newState;
    }
    case ActionTypes.ChangeName: {
      newState.userName = action.name;
      return newState;
    }
  }
  return defaultState;
}

export default reducer;
