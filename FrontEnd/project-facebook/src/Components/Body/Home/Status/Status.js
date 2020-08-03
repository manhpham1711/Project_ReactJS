import React, {Component} from 'react';

import StatusItem from './StatusItem';

class Status extends Component{
    render(){
        return(
            <div className = "ListStatus">
                <StatusItem />
                <StatusItem />
                <StatusItem />
            </div>
        )
    }
}
export default Status;