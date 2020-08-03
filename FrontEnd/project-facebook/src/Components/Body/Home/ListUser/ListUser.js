import React, {Component} from 'react';
import './ListUser.css';
import ListUserItem from './ListUserItem';

class ListUser extends Component{
    render(){
        return(
            <div className = "listUser">
                <ListUserItem />
            </div>
        )
    }
}
export default ListUser;