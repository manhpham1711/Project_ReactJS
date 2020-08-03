import React, { Component } from 'react';
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="col-sm-5">
                    <div className="logo">
                        <img src="Logo/logo.png" alt="logo" />
                    </div>
                </div>
                <div className="col-sm-5">
                    <div className="search">
                        <input type="search" placeholder="Search" />
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="Messenger">
                        <img src="Logo/messenger.png" alt="logo" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;