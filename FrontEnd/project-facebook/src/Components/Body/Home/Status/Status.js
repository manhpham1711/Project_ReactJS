import React, { Component } from 'react';

import StatusItem from './StatusItem';

class Status extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem('listPeopleLike');
        this.getData();
        this.getDataUser();
        this.state = {
            status: [],
            user: []
        }
    }

    getData() {
        fetch("http://127.0.0.1:8000/api/listStatus")
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
            status: data
        });
    }

    getDataUser() {
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
                        this.updateDataUser(data);
                    });
            });
    }

    updateDataUser(data) {
        this.setState({
            user: data
        });
    }

    show() {
        let listStarus;
        const { status } = this.state;
        const { user } = this.state;
        listStarus = status.map((item, index) =>
            < StatusItem
                item={item}
                key={index}
                username={user.username}
            />
        );
        return listStarus;
    }
    render() {
        return (
            <div className="ListStatus">
                {this.show()}
                
            </div>
        )
    }
}
export default Status;