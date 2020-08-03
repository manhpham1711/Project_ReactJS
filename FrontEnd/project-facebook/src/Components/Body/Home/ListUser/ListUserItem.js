import React, { Component } from 'react';
import './ListUser.css';

class ListUserItem extends Component {
    render() {
        return (
            <div className="userItem">
                <img src="https://mtrend.vn/wp-content/uploads/2015/11/hinh-nen-tinh-yeu-dep-nhat-1.jpg" alt="" />
                <p>Manh Pham</p>
            </div>
        )
    }
}

export default ListUserItem;