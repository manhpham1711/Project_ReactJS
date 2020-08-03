import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Test extends Component {
  constructor() {
    super();
    this.state = {
      user: []
    }
    this.getData();
    this.logout = this.logout.bind(this);
  }

  getData() {
    fetch("http://127.0.0.1:8000/api/user/detail",
      {
        method: "post",
        headers: {
          "Authorization": localStorage.getItem("User_id")
        },
        body: null
      })
      .then(response => {
        return response.json()
          .then((data) => {
            console.log(data);
            this.updateUI(data);
          });
      });
  }

  updateUI(data) {
    this.setState({
      user: data
    });
  }

  logout() {
    localStorage.removeItem("User_id");
    this.props.history.push('/');
  }


  render() {
    console.log(this.state.user);
    return (
      <div>
        <h1>name {this.state.user.name}</h1>

        <button onClick={this.logout}>logout</button>
      </div>
    )
  }
}
export default withRouter(Test);
