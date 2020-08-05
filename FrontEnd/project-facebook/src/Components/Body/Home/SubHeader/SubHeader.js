import React, { Component } from 'react';
import './SubHeader.css';

class SubHeader extends Component {
    constructor(props) {
        super(props);
        this.getData();
        this.state = {
            user: []
        }

    }

    getData() {
        fetch("http://127.0.0.1:8000/api/user/detail",
            {
                method: "post",
                headers: {
                    "Authorization": localStorage.getItem("User_id")
                },
                body: null
            })
            .then(response => {
                return response.json()
                    .then((data) => {
                        console.log(data);
                        this.updateUI(data);
                    });
            });
    }

    updateUI(data) {
        this.setState({
            user: data
        });
    }

    render() {
        return (
            <div className="subHeader">
                <form >
                    <img src={this.state.user.image} alt="avatar" />
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