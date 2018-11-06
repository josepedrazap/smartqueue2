import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App'
import Create_queue from './components/Create_queue';
import Body from './components/Body';
import Login from './components/Login';
import Register from './components/Register';
import Maps_queue from './components/Maps_queue';
import Exit from './components/Exit';

const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/create_queue" component={Create_queue} />
      <Route exact path="/home" component={Body}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/maps" component={Maps_queue}/>
      <Route exact path="/exit" component={Exit}/>
    </Switch>
  </App>;


export default AppRoutes;
