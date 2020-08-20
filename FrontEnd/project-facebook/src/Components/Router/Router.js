import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from '../Body/Home/Home';
import Friend from '../Body/Friend/Friend';
import Group from '../Body/Group/Group';
import Shop from '../Body/Shop/Shop';
import Notification from '../Body/Notification/Notification';
import Personsal from '../Body/Personal/Personsal';

class Routers extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/home'> <Home /> </Route>
                <Route exact path='/friend'> <Friend /> </Route>
                <Route exact path='/group'> <Group /> </Route>
                <Route exact path='/shop'> <Shop /> </Route>
                <Route exact path='/notification'> <Notification /> </Route>
                <Route exact path='/personal'> <Personsal /> </Route>
                <Route path="/personal/editUser"><Personsal /></Route>
            </Switch>
        )
    }
}
export default Routers;