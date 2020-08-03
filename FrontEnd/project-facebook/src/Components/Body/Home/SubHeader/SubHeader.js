import React, { Component } from 'react';
import './SubHeader.css';

class SubHeader extends Component {
    render() {
        return (
            <div className="subHeader">
                <form >
                    <img src="https://mtrend.vn/wp-content/uploads/2015/11/hinh-nen-tinh-yeu-dep-nhat-1.jpg" alt="avatar" />
                    &ensp;<textarea name="content" placeholder="Bạn đang nghĩ gì?" />
                    <div className="functionPost">
                        <input type="file"></input>
                        <button> Post</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default SubHeader;