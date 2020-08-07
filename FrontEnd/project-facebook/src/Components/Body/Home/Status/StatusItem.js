import React, { Component } from 'react';
import "./StatusItem.css";

class StatusItem extends Component {
    render() {
        return (
            <div className="status">
                <div id="user">
                    <img className="img" src={"http://127.0.0.1:8000/" + this.props.item.avatar} alt="" />
                    <div id="information">
                        <p> <b>{this.props.item.name} </b></p>
                        <p> 10 phút</p>
                    </div>
                    <div className="menu">
                        <img src="Logo/3cham.png" />
                    </div>
                </div>
                <div id="posts">
                    <div className="content">
                        <p>
                            {this.props.item.content}
                        </p>
                    </div>
                    <div className="photo">
                        <img src={"http://127.0.0.1:8000/" + this.props.item.image} alt="" />
                    </div>
                    <div className="function">
                        <button><img src="Logo/Like.png" /></button>
                        <button><img src="Logo/Comment.png" /></button>
                        <button><img src="Logo/share.png" /></button>
                    </div>
                </div>
            </div>
        )
    }
}
export default StatusItem;