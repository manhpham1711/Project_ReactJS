import React, { Component } from 'react';
import './ListUser.css';
import ListUserItem from './ListUserItem';

class ListUser extends Component {

    constructor(props) {
        super(props);
        this.getUserFriend();
        this.state = {
            listUserFriend: []
        }

        this.updateDataFriend = this.updateDataFriend.bind(this);
    }

    getUserFriend() {
        fetch("http://127.0.0.1:8000/api/user/friend",
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
                        console.log('friend ***************************************');
                        console.log(data);
                        this.updateDataFriend(data);
                    });
            });
    }

    updateDataFriend(data) {
        this.setState({
            listUserFriend: data
        });
    }

    showUserFriend() {
        const { listUserFriend } = this.state;
        var UsersFriend = listUserFriend.map((item, index) =>
            <ListUserItem item={item} key={index} />
        )

        return UsersFriend;
    }
    render() {
        return (
            <div className="listUser">
                {this.showUserFriend()}
            </div>
        )
    }
}
export default ListUser;
