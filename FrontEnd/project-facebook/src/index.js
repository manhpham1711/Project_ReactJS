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

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/'> <Login /> </Route>
        <Route exact path='/home'> <App /> </Route>
        <Route exact path='/personal'> <App /> </Route>
        <Route exact path='/friend'> <App /> </Route>
        <Route exact path='/shop'> <App /> </Route>
        <Route exact path='/notification'> <App /> </Route>
        <Route path="/personal/editUser"><App /></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
