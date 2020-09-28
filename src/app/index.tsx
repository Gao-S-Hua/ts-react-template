import React from 'react';
import { Provider } from 'react-redux';
import RootRouter from './router';
import store from './store';
import Header from './common/Header';
import Side from './common/Side';
import Content from './common/Content';

const App: React.FC = () => {
  return (
    <Provider store = {store}>
      <Header />
      <Side />
      <Content>
        <RootRouter />
      </Content>
    </Provider>
  );
}

export default App;
