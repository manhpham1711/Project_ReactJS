import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import data from '../Body/data';

class Test extends Component {


  constructor(props) {
    super(props);
    console.log('loaded');
    console.log(data)
    // console.log( JSON.stringify(this.state.data));
    // console.log(this.state.data);
    // this.getData();
    this.shows = this.shows.bind(this);
  }

  // getData() {
  //   fetch("http://127.0.0.1:8000/api/user/detail",
  //     {
  //       method: "post",
  //       headers: {
  //         "Authorization": localStorage.getItem("User_id")
  //       },
  //       body: null
  //     })
  //     .then(response => {
  //       return response.json()
  //         .then((data) => {
  //           console.log(data);
  //           this.updateUI(data);
  //         });
  //     });
  // }

  // updateUI(data) {
  //   this.setState({
  //     user: data
  //   });
  // }

  // logout() {
  //   localStorage.removeItem("User_id");
  //   this.props.history.push('/');
  // }

  shows() {
    // const { data } = this.state;
    // console.log("day la data" + JSON.stringify(data));

    return this.state.data.map((item, index) =>
      <div key={index}>
        <h3>{item.id}</h3>
        <h4>{item.name}</h4>
      </div>
    )
    // return list;

  }

  render() {
    return (
      <div>
        <p>hwllloooo</p>

      </div>
    )
  }

}
export default withRouter(Test);
