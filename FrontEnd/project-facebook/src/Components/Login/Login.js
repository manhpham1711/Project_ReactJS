import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  checkUser() {
    var id = localStorage.getItem("User_id");
    //alert(id);
    if (id !== null) {
      this.props.history.push('/home');
    } else {
      this.props.history.push('/');
    }
  }

  onLoginSubmit(event) {
    event.preventDefault();

    let username = event.target['username'].value;
    let password = event.target['password'].value;

    let user = {
      username: username,
      password: password
    }
    let userInJson = JSON.stringify(user);
    console.log(userInJson);

    fetch("http://127.0.0.1:8000/api/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: userInJson
    })
      .then((response) => {
        console.log('datraaaaaaa');
        console.log(response.status);
        if (response.status === 200) {
          return response.json();
        } else {
          response = null;
          return response;
        }
      }).then((response) => {
        if (response !== null) {
          console.log(response);
          localStorage.removeItem("User_id");
          localStorage.setItem("User_id", response);
          this.props.history.push('/home');
        } else {
          localStorage.removeItem("User_id");
          alert('username or paseword incorect');
          this.props.history.push('/');
        }
      });
  }
  signUp() {
    const container = document.getElementById('container');
    container.classList.add("right-panel-active");
  }
  signIn() {
    const container = document.getElementById('container');
    container.classList.remove("right-panel-active");
  }
  render() {
    return (
      <div className="login" onLoad={this.checkUser} >
        <div className="logoFacebook">
          <img src="Logo/logo.png" alt="logo" />
          <h1>Welcome</h1>
        </div>

        <div className="container" id="container">

          {/* ********************************************Fornend Sign Up **************************/}

          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social"><img src="Logo/google.png" alt="logo" /></a>
                <a href="#" className="social"><img src="Logo/linkedin.png" alt="logo" /></a>
                <a href="#" className="social"><img src="Logo/zalo.png" alt="logo" /></a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Sign Up</button>
            </form>
          </div>

          {/* ********************************************Fornend Sign In **************************/}

          <div className="form-container sign-in-container">
            <form onSubmit={this.onLoginSubmit}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social"><img src="Logo/google.png" alt="logo" /></a>
                <a href="#" className="social"><img src="Logo/linkedin.png" alt="logo" /></a>
                <a href="#" className="social"><img src="Logo/zalo.png" alt="logo" /></a>
              </div>
              <span>or use your account</span>
              <input type="text" name="username" placeholder="Username" />
              <input type="password" name="password" placeholder="Password" />
              <a href="#">Forgot your password?</a>
              <button type="submit">Sign In</button>
            </form>
          </div>


          {/* ******************************************** Phan gioi thieu **************************/}

          <div className="overlay-container">
            <div className="overlay">

              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={this.signIn}>Sign In</button>
              </div>

              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" onClick={this.signUp}>Sign Up</button>
              </div>

            </div>

          </div>
        </div>

        <footer>
          <p>
            Công Ty Cổ Phần Facebook, Chủ Tịch <span> Phạm Văn Mạnh</span>
          </p>
        </footer>
      </div>
    )
  }
}

export default withRouter(Login);