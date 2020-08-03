import React, { Component } from 'react';
import "./Menu.css";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <div className="Menu">
                <div className="col-sm-2">
                    <Link to="/home"><img src="Logo/home.png" alt="logo" /></Link>
                </div>
                <div className="col-sm-2">
                    <Link to="/friend"><img src="Logo/friend.png" alt="logo" /></Link>
                </div>
                <div className="col-sm-2">
                    <Link to="/group"><img src="Logo/group.png" alt="logo" /></Link>
                </div>
                <div className="col-sm-2">
                    <Link to="/shop"><img src="Logo/shop.jpg" alt="logo" /></Link>
                </div>
                <div className="col-sm-2">
                    <Link to="/notification"><img src="Logo/thongbao.png" alt="logo" /></Link>
                </div>
                <div className="col-sm-2">
                    <Link to="/personal"><img src="Logo/menu.jpg" alt="logo" /></Link>
                </div>
            </div>
        )
    }
}
export default Menu;