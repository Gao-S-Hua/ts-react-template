import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Load from '../pages/Load';
import Log from '../pages/Login';
import Listen from '../pages/Listen';
import Test from '../pages/Test';
const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = '/' exact component = {Home} />
        <Route path = '/load' component = {Load} />
        <Route path = '/log' component = {Log} />
        <Route path = '/test' component = {Test} />
        <Route path = '/listen' component = {Listen} />
      </Switch>
    </BrowserRouter>
  );
}

export default RootRouter;
