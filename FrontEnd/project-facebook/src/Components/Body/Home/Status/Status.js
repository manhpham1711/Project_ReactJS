import React, { Component } from 'react';

import StatusItem from './StatusItem';

class Status extends Component {
    constructor(props) {
        super(props);
        this.getListNumberLike();
        this.getData();
        this.state = {
            status: [],
            like: [],
            listPeopleLike: []
        }
        this.numberLIkeStatusI = this.numberLIkeStatus.bind(this);
    }

    getListNumberLike() {
        fetch("http://127.0.0.1:8000/api/listLike")
            .then(response => {
                return response.json()
                    .then((data) => {
                        console.log(data);
                        this.updateLike(data);
                    });
            });
    }

    updateLike(data) {
        this.setState({
            like: data
        });
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

    onClickLike(id) {
        return (event) => {
            let Like = {
                user_id: localStorage.getItem('User_id'),
                status_id: id
            }
            let LikeInJson = JSON.stringify(Like);
            console.log(LikeInJson);

            fetch("http://127.0.0.1:8000/api/like", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: LikeInJson
            })
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    this.updateLike(data);
                });

        }
    }

    numberLIkeStatus(id) {
        const like = this.state.like;
        let numberLike = 0;
        for (var i = 0; i < like.length; i++) {
            if (like[i].status_id == id) {
                numberLike = like[i].numberLike;
                break;
            }
        }
        return numberLike;
    }

    onMouseEnterLike(id) {
        return (event) => {
            fetch("http://127.0.0.1:8000/api/status/listPeopleLike",
                {
                    method: "post",
                    headers: {
                        "Authorization": id
                    },
                    body: null
                })
                .then(response => {
                    return response.json()
                        .then((data) => {
                            console.log(data);
                            this.updateListPeopleLike(data);
                        });
                });

            document.getElementById('peoplesLike').style.display = "block";
        }
    }

    updateListPeopleLike(data) {
        this.setState({
            listPeopleLike: data
        });
    }

    onMouseLeaveLike() {
        return (event) => {
            document.getElementById('peoplesLike').style.display = "none";
        }
    }

    show() {
        let listStarus;
        const { status } = this.state;
        listStarus = status.map((item, index) =>
            < StatusItem
                item={item}
                key={index}
                numberLike={this.numberLIkeStatus(item.id)}
                onClickLike={this.onClickLike(item.id)}
                onMouseEnterLike={this.onMouseEnterLike(item.id)}
                onMouseLeaveLike={this.onMouseLeaveLike()}
            />
        );
        return listStarus;
    }
    render() {
        return (
            <div className="ListStatus">
                {this.show()}
                <div id="peoplesLike">
                    {this.state.listPeopleLike.map((item) =>
                        <div>
                            <p>{item.name}</p>
                            <br></br>
                        </div>
                    )}
                </div>

            </div>
        )
    }
}
export default Status;