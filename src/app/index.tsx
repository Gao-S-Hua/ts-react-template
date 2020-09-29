import React from 'react';
import { Provider } from 'react-redux';
import RootRouter from './router';
import store from './store';


const App: React.FC = () => {
  return (
    <Provider store = {store}>
      <RootRouter />
    </Provider>
  );
}

export default App;
