import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Load from '../pages/Load';
import Log from '../pages/Login';
import Listen from '../pages/Listen';
import Current from '../pages/Listen/Current';
import Video from '../pages/Video';
import Upload from '../pages/Upload';
import Header from '../common/Header';
import Side from '../common/Side';
import Content from '../common/Content';
import Count from '../pages/Listen/Count';
import TestCase from '../pages/TestCase';
import NewCase from '../pages/NewCase';
import User from '../pages/User';
import BackTop from '../common/BackTop';
import CaseInfo from '../pages/CaseInfo';
import Error from '../pages/Error';

const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ display: 'flex' }}>
        <Side />
        <Content>
          <Switch>
            <Route path = '/uinfo' component = {User} />
            <Route path = '/load' component = {Load} />
            <Route path = '/log' component = {Log} />
            <Route path = '/video/:name' component = {Video} />
            <Route path = '/video' component = {Video} />
            <Route path = '/listen/temp' component = {Listen} />
            <Route path = '/listen/cur' component = {Current} />
            <Route path = '/listen/count' component = {Count} />
            <Route path = '/upload' component = {Upload} />
            <Route path = '/case/status' component = {TestCase} />
            <Route path = '/case/new' component = {NewCase} />
            <Route path = '/case/info/:id' component = {CaseInfo} />
            <Route path = '/case/info/' component = {CaseInfo} />
            <Route path = '/' exact component = {Home} />
            <Route path ='/' component = {Error} />
          </Switch>
        </Content>
        <BackTop />
      </div>
    </BrowserRouter>
  );
}

export default RootRouter;
