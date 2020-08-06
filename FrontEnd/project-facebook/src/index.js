import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import Login from './Components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Test from './Components/test/test';
import Img from './Components/test/testimg';
import TestUpoadFile from './Components/test/TestUpoadFile';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/'> <Login /> </Route>
        <Route exact path='/home'> <App /> </Route>
        <Route exact path='/test'> <Test /> </Route>
        <Route exact path='/tests'><Img /> </Route>
        <Route exact path='/test/uploadImg'><TestUpoadFile /></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
