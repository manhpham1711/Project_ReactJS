import React, { Component } from 'react';
import "./StatusItem.css";

class StatusItem extends Component {
    render() {
        return (
            <div className="status">
                <div id="user">
                    <img className="img" src="https://mtrend.vn/wp-content/uploads/2015/11/hinh-nen-tinh-yeu-dep-nhat-1.jpg" alt="" />
                    <div id="information">
                        <p> <b>Manh Pham </b></p>
                        <p> 10 phut</p>
                    </div>
                    <div className="menu">
                        <img src="Logo/3cham.png" />
                    </div>
                </div>

                <div id="posts">
                    <div className="content">
                        <p>
                            Hoa cà màu tím Hoa tuy lip màu xanh Lẽ nào anh không biết Có người thầm iu anh.
                        </p>
                    </div>
                    <div className="photo">
                        <img src="https://mtrend.vn/wp-content/uploads/2015/11/hinh-nen-tinh-yeu-dep-nhat-1.jpg" alt="" />
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