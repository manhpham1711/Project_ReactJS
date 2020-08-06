import React, { Component } from 'react'

export default class TestUpoadFile extends Component {

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {

    event.stopPropagation();
    event.preventDefault();

    var input = document.querySelector('input[type="file"]')
    var data = new FormData()
    data.append('file', input.files[0])
    data.append('user', 'hubot')
    console.log(data);

    // var files = event.target.files;
    // var file = files[0];
    // var fileReader = new FileReader();
    // fileReader.onload = function (progressEvent) {
    //   var url = fileReader.result;
    //   var myImg = document.getElementById("myimage");
    //   myImg.src = url;
    // }
    // fileReader.readAsDataURL(file); // fileReader.result -> URL.
  }
  render() {
    return (
      <div>
        <form enctype="multipart/form-data">
          <h3>Select Image to Show</h3>
          <input type="file" multiple onChange={this.changeHandler} />
          <br /><br />
          <img id="myimage" src="" />
        </form>
      </div>
    )
  }
}
