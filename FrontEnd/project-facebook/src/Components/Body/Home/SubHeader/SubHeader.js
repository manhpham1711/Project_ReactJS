import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SubHeader.css';

class SubHeader extends Component {
    constructor(props) {
        super(props);
        this.getData();
        this.state = {
            user: [],
            img: []
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.postStatus = this.postStatus.bind(this);
        this.updateUI = this.updateUI.bind(this);
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

    changeHandler(event) {
        event.stopPropagation();
        event.preventDefault();
        var { img } = this.state;
        var files = event.target.files;
        var file = files[0];
        var fileReader = new FileReader();

        fileReader.onload = function (progressEvent) {
            var url = fileReader.result;
            img.push(url);
        }
        fileReader.readAsDataURL(file);
        this.setState({ img });
    }

    postStatus(event) {
        event.preventDefault();
        var content = event.target['content'].value;
        var id = localStorage.getItem("User_id");
        var img = "";
        if(this.state.img[0] !== null){
            img = this.state.img[0];
        }
        let Status = {
            id: id,
            image: this.state.img[0],
            content: content
        }
        var StatusInJson = JSON.stringify(Status);
        console.log(StatusInJson);
        fetch("http://127.0.0.1:8000/api/status/add",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: StatusInJson
            })
            .then(response => {
                if (response.status === 200) {
                    alert("Trạng thái của bạn cập nhận thành công");
                    //this.props.history.push('/home');
                    window.location.replace('http://localhost:3000/home')
                } else {
                    alert("Không thể tải lên, vui lòng kiểm tra lại");
                }
            });
    }

    render() {
        return (
            <div className="subHeader">
                <form onSubmit={this.postStatus}>
                    <img src={"http://127.0.0.1:8000/" + this.state.user.avatar} alt="avatar" />
                    &ensp;<textarea name="content" placeholder="Bạn đang nghĩ gì?" />
                    <div className="functionPost">
                        <input type="file" name="image" multiple onChange={this.changeHandler} />
                    </div>
                    <button type="submit"> Post</button>
                </form>
            </div>
        )
    }
}
export default withRouter(SubHeader);