import React, { Component } from 'react';
import './ListUser.css';

class ListUserItem extends Component {
    render() {
        return (
            <div className="userItem">
                <img src={"http://127.0.0.1:8000/" + this.props.item.avatar} />
                <p>{this.props.item.name}</p>
                <button> Huy </button>
            </div>
        )
    }
}

export default ListUserItem;