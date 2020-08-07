import React, { Component } from 'react';

import StatusItem from './StatusItem';

class Status extends Component {
    constructor(props) {
        super(props);
        this.getData();
        this.state = {
            status: []
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

    show() {
        let listStarus;
        const { status } = this.state;
        listStarus = status.map((item, index) =>
            <StatusItem item={item} key={index}></StatusItem>);

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