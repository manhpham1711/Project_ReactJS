import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: []
    };

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  checkUser() {
    var id = localStorage.getItem("User_id");
    if (id !== null) {
      this.props.history.push('/home');
    } else {
      this.props.history.push('/');
    }
  }

  onSignInSubmit(event) {
    event.preventDefault();

    let username = event.target['username'].value;
    let password = event.target['password'].value;

    let Account = {
      username: username,
      password: password
    }
    let AccountInJson = JSON.stringify(Account);
    console.log(AccountInJson);

    fetch("http://127.0.0.1:8000/api/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: AccountInJson
    })
      .then((response) => {
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
          alert("welcome back to Facebook (*:*) ");
          this.props.history.push('/home');
        } else {
          localStorage.removeItem("User_id");
          alert('username or paseword incorect');
          this.props.history.push('/');
        }
      });
  }

  changeHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    var { image } = this.state;
    var files = event.target.files;
    var file = files[0];
    var fileReader = new FileReader();

    fileReader.onload = function (progressEvent) {
      var url = fileReader.result;
      image.push(url);
      var myImg = document.getElementById("avata");
      myImg.src = url;
    }
    fileReader.readAsDataURL(file);
    this.setState({ image });
  }

  onSignUpSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    let name = event.target['name'].value;
    let gender = event.target['gender'].value;
    let birthday = event.target['birthday'].value;
    let username = event.target['username'].value;
    let password = event.target['password'].value;

    let user = {
      name: name,
      gender: gender,
      birthday: birthday,
      image: this.state.image[0],
      username: username,
      password: password
    }
    let userInJson = JSON.stringify(user);
    console.log(userInJson);
    fetch("http://127.0.0.1:8000/api/user/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: userInJson
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        response = null;
        return response;
      }
    }).then((response) => {
      if (response !== null) {
        console.log(response);
        alert("Đăng ký thành công => Cùng nhau trãi nghiệm những tính năng vượt trội của facebook nào :)");
        localStorage.removeItem("User_id");
        localStorage.setItem("User_id", response);
        this.props.history.push('/home');
      } else {
        localStorage.removeItem("User_id");
        alert('Đăng ký không thành công vui lòng kiểm tra lại thông tin của bạn');
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
            <form onSubmit={this.onSignUpSubmit}>
              <h1>Create Account</h1>
              <div className="avataImg">
                <form nctype="multipart/form-data">
                  <input type="file" name="image" multiple onChange={this.changeHandler} />
                  <img id="avata" src="" />
                </form>
              </div>
              <input type="text" name="name" placeholder="Name" />
              <div className="gender">
                <div className="formgender">
                  <h3>Gender: </h3>
                </div>
                <div className="formgender">
                  <input type="radio" name="gender" value="Nam" />
                  <label for="male">Male</label>
                </div>
                <div className="formgender">
                  <input type="radio" name="gender" value="Nu" />
                  <label for="female">Female</label>
                </div>
              </div>
              <input type="date" name="birthday" />
              <input type="text" name="username" placeholder="Username" />
              <input type="text" name="password" placeholder="Password" />
              <button type="submit">Sign Up</button>
            </form>
          </div>

          {/* ********************************************Fornend Sign In **************************/}

          <div className="form-container sign-in-container">
            <form onSubmit={this.onSignInSubmit}>
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
  // componentDidUpdate() {
  //   console.log('update');
  //   console.log(this.state.image[0]);
  // }
}

export default withRouter(Login);