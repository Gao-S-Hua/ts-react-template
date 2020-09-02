import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Load from '../pages/Load';

const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = '/' exact component = {Home} />
        <Route path = '/load' component = {Load} />
      </Switch>
    </BrowserRouter>
  );
}

export default RootRouter;
