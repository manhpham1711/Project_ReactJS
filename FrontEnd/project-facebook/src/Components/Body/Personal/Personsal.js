import React, { Component } from 'react';
import './Personsal.css';
import { withRouter } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import StatusItem from '../Home/Status/StatusItem';
import EditInfomatinUser from './EditInfomatinUser';

class Personsal extends Component {

    constructor(props) {
        super(props);
        // this.id = this.props.match.params.id;
        this.id = localStorage.getItem('User_id');
        this.getData(this.id);
        this.getDataStatus();
        this.state = {
            user: [],
            listStatus: [],
            friend: []
        }
        console.log("data information hhhh");
        console.log(this.state.information);
        this.logout = this.logout.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.showStatus = this.showStatus.bind(this);
    }

    getData(id) {
        fetch("http://127.0.0.1:8000/api/user/detail",
            {
                method: "post",
                headers: {
                    "Authorization": id,
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

    getDataStatus() {
        fetch("http://127.0.0.1:8000/api/listStatus/user",
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
                        this.updateStatus(data);
                    });
            });
    }

    updateStatus(data) {
        this.setState({
            listStatus: data
        });
    }

    logout() {
        localStorage.removeItem('User_id');
        window.location.replace('http://localhost:3000/');
    }

    showStatus() {
        const { user } = this.state;
        const { listStatus } = this.state;
        var status = listStatus.map((item, index) =>
            <StatusItem item={item} username={user.username} key={index} />
        );
        return status;
    }


    render() {
        const { user } = this.state;
        const { listStatus } = this.state;
        return (


            <Router>
                <div className="personsal">
                    <div className="information">
                        <img src={"http://127.0.0.1:8000/" + user.avatar} alt="avatar" />
                        <div className="connect">
                            <h1 style={{ textAlign: "center" }}>{user.name}</h1>
                            <p> Gender: {user.gender}</p>
                            <p> Birthday: {user.birthday}</p>
                            <p> Username: {user.username}</p>
                            <p> Username: {user.password}</p>
                            <p> Status: {listStatus.length}</p>
                            <p> Friend: {}14</p>
                        </div>
                        <div className="action">
                            <button onClick={this.logout}> Logout </button>
                            <Link to="/personal/editUser"> <button> Edit Information </button> </Link>
                        </div>
                    </div>

                    <Switch>
                        <div className="statusPersonsal">
                            <Route exact path="/personal">
                                {this.showStatus()}
                            </Route>
                            <Route path="/personal/editUser">
                                <EditInfomatinUser user={user} />
                            </Route>
                        </div>
                    </Switch>
                </div>
            </Router>


        )
    }
}
export default withRouter(Personsal);