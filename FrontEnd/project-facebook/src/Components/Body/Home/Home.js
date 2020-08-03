import React, {Component} from 'react';
import './Home.css';
import Status from './Status/Status';
import ListUser from './ListUser/ListUser';
import SubHeader from './SubHeader/SubHeader';

class Home extends Component{
    render(){
        return(
            <div className = "body">
                <SubHeader /> 
                <hr />
                <div className ="grid-container">
                    <div className ="grid-item Status"> 
                        <Status />
                    </div>
                    <div className ="grid-item ListUser"> <ListUser /> </div>
                </div>
            </div>
        )
    }
}
export default Home;