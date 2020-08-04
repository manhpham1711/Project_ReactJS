import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import {
  BrowserRouter as Router,
  Link,
  Route,
  withRouter
} from "react-router-dom";

import Routers from '../Router/Router';

class App extends Component {
  constructor() {
    super();
    this.checkLogin = this.checkLogin.bind(this);
  }
  checkLogin() {
    var id = localStorage.getItem("User_id");
    if (!id) {
      alert("Vui Long SinUp or SinIn de su dung");
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="container" onLoad={this.checkLogin}>
        <div>
          <Header />
        </div>
        <Router>
          <div className="fixedMenu">
            <Menu />
          </div>
          <div>
            <Routers />
          </div>
        </Router>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(App);


