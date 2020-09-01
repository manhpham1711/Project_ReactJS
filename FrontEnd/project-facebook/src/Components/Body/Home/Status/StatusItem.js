import React, { Component } from 'react';
import "./StatusItem.css";

class StatusItem extends Component {
    constructor(props) {
        super(props);
        this.getData(this.props.item.id);
        this.state = {
            listPeopleLike: [],
            listComment: []
        }
        this.updateDataPeopleLike = this.updateDataPeopleLike.bind(this);
        this.onMouseEnterLike = this.onMouseEnterLike.bind(this);
        this.onMouseLeaveLike = this.onMouseLeaveLike.bind(this);
        this.addComment = this.addComment.bind(this);
        this.showFunctionEditStatus = this.showFunctionEditStatus.bind(this);
        this.thoat = this.thoat.bind(this);
        this.showFunction = this.showFunction.bind(this);
        this.onclickButtonComment = this.onclickButtonComment.bind(this);
        this.onclickButtonCloseComment = this.onclickButtonCloseComment.bind(this);

    }

    getData(id) {
        fetch("http://127.0.0.1:8000/api/listLike/" + id)
            .then(response => {
                return response.json()
                    .then((data) => {
                        this.updateDataPeopleLike(data);
                    });
            });
    }

    updateDataPeopleLike(data) {
        this.setState({
            listPeopleLike: data
        });
    }

    updateDataPeopleComment(data) {
        this.setState({
            listComment: data
        });
    }

    onMouseEnterLike(id) {
        return (event) => {
            document.getElementById(id).style.display = "block";
        }
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
                    this.updateDataPeopleLike(data);
                });
        }
    }

    onMouseLeaveLike(id) {
        return (event) => {
            document.getElementById(id).style.display = "none";
        }
    }

    onclickButtonComment(id) {
        return (event) => {
            var comment = "comment" + id;
            fetch("http://127.0.0.1:8000/api/listComment/" + id)
                .then(response => {
                    return response.json()
                        .then((data) => {
                            this.updateDataPeopleComment(data);
                        });
                });
            document.getElementById(comment).style.display = "block";
        }
    }

    onclickButtonCloseComment(id) {
        return (event) => {
            var comment = "comment" + id;
            document.getElementById(comment).style.display = "none";
        }
    }

    addComment(event) {
        event.preventDefault();
        var connect = event.target['connect'].value;
        var id = event.target['id'].value;
        let comment = {
            user_id: localStorage.getItem('User_id'),
            status_id: id,
            content: connect
        };
        var CommentInJson = JSON.stringify(comment);
        console.log(CommentInJson);
        fetch("http://127.0.0.1:8000/api/Comment", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: CommentInJson
        })
            .then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                this.updateDataPeopleComment(data);
            });
    }

    showFunction(id) {
        return (event) => {
            var idStatus = "status" + id;
            document.getElementById(idStatus).style.display = "block";
        }

    }

    thoat(id) {
        return (event) => {
            var idStatus = "status" + id;
            document.getElementById(idStatus).style.display = "none";
        }

    }

    delete(id) {
        return (event) => {
            fetch("http://127.0.0.1:8000/api/status/delete/" + id)
                .then(response => {
                    if (response.status === 200) {
                        alert("Xoa Thanh Cong");
                        // this.props.history.push('/home');
                        window.location.replace('http://localhost:3000/home')
                    } else {
                        alert("khong the xoa");
                    }
                });
        }
    }

    showFunctionEditStatus() {
        var username = this.props.username;
        var userPost = this.props.item.username;
        var id = this.props.item.id;
        if (username === userPost) {
            return <div className="menuFunction">
                <div id={"status" + id} className="buttonFunction" style={{ display: "none" }}>
                    <img onClick={this.thoat(id)} src="Logo/thoat.png" alt="" />
                    <button>Edit</button>
                    <button onClick={this.delete(id)}>Delete</button>
                </div>
                <div className="iconMenu">
                    <img onClick={this.showFunction(id)} src="Logo/3cham.png" />
                </div>

            </div>
        } else {
            return <div className="menuFunction" >
                <div id={"status" + id} className="buttonFunction" style={{ display: "none" }}>
                    <img id={"status" + id} onClick={this.thoat(id)} src="Logo/thoat.png" alt="" />
                    <button>Shear</button>
                    <button>Chan</button>
                </div>
                <div className="iconMenu">
                    <img onClick={this.showFunction(id)} src="Logo/3cham.png" />
                </div>
            </div>
        }
    }

    render() {
        const { listComment } = this.state
        return (
            <div className="status">
                <div id="user">
                    <div className="avtarUser">
                        <center><img src={"http://127.0.0.1:8000/" + this.props.item.avatar} alt="" /></center>
                    </div>
                    <div className="information">
                        <div>
                            <p style={{ fontSize: "35px" }}> <b>{this.props.item.name} </b></p>
                        </div>
                        <div>
                            <p style={{ fontSize: "15px" }}> 10 phút</p>
                        </div>

                    </div>

                    {this.showFunctionEditStatus()}

                </div>
                {
                    this.props.item.image === "" ?
                        <div id="posts">
                            <div className="content">
                                <p>
                                    {this.props.item.content}
                                </p>
                            </div>
                            <div className="function">
                                <button onClick={this.onClickLike(this.props.item.id)} onMouseEnter={this.onMouseEnterLike(this.props.item.id)}
                                    onMouseLeave={this.onMouseLeaveLike(this.props.item.id)}><img src="Logo/Like.png" /> {this.state.listPeopleLike.length} </button>
                                <button onClick={this.onclickButtonComment(this.props.item.id)}><img src="Logo/Comment.png" />{listComment.length}</button>
                                <button><img src="Logo/share.png" /></button>
                            </div>
                        </div>
                        :
                        <div id="posts">
                            <div className="content">
                                <p>
                                    {this.props.item.content}
                                </p>
                            </div>
                            <div className="photo">
                                <img src={"http://127.0.0.1:8000/" + this.props.item.image} alt="" />
                            </div>
                            <div className="function">
                                <button onClick={this.onClickLike(this.props.item.id)} onMouseEnter={this.onMouseEnterLike(this.props.item.id)}
                                    onMouseLeave={this.onMouseLeaveLike(this.props.item.id)}><img src="Logo/Like.png" /> {this.state.listPeopleLike.length} </button>
                                <button onClick={this.onclickButtonComment(this.props.item.id)}><img src="Logo/Comment.png" />{listComment.length}</button>
                                <button><img src="Logo/share.png" /></button>
                            </div>
                        </div>
                }
                <div id={this.props.item.id} style={{ display: "none" }} className="listLike">
                    {this.state.listPeopleLike.map((item, index) =>
                        <div className="peopleLike" key={index}>
                            <img src={"http://127.0.0.1:8000/" + item.avatar} alt="" />
                            <p>{item.name}</p>
                            <br></br>
                        </div>
                    )}
                </div>
                <div id={"comment" + this.props.item.id} style={{ display: "none" }} className="listComment">
                    <button onClick={this.onclickButtonCloseComment(this.props.item.id)}> Thoat </button>
                    {this.state.listComment.map((item) => <div className="comment">
                        <div className="imgUserComment">
                            <img src={"http://127.0.0.1:8000/" + item.avatar} alt="" />
                        </div>
                        <div className="connect">
                            <p style={{ fontSize: "25px", fontFamily: "monospace" }}><b>{item.name}</b></p>
                            <p style={{ fontSize: "15px" }}>{item.content}</p>
                        </div>
                    </div>
                    )}
                    {/* <div className = "comment">
                        <div className = "imgUserComment">
                            <img src={"http://127.0.0.1:8000/"} alt=""/>
                        </div>
                        <div className = "connect">
                            <p style = {{fontSize: "25px", fontFamily: "monospace"}}><b>manh</b></p>
                            <p style = {{fontSize: "15px"}}> bai viet hay jdjdj  hdgk mdkhd msdh, </p>
                        </div>
                    </div> */}

                    <form onSubmit={this.addComment}>
                        <input type="text" name="connect" />
                        <button type="submit"> Comment </button>
                        <input type="text" name="id" defaultValue={this.props.item.id} style={{ display: "none" }} />
                    </form>
                </div>

            </div>
        )
    }
}
export default StatusItem;