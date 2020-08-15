import React from 'react';

class TestLike extends React.Component {

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.enter = this.enter.bind(this);
    this.big = this.big.bind(this);
  }

  click() {
    alert("click");
  }
  enter() {
    document.getElementById("button").style.color = "red";
  }
  big() {
    document.getElementById('button').style.color = "#111111";
  }


  render() {
    return (
      <div>
        <button onClick={this.click} onMouseEnter={this.enter} onMouseLeave={this.big} id="button" style={{ size: "15px" }}>hello</button>
      </div>
    );
  }
}
export default TestLike;