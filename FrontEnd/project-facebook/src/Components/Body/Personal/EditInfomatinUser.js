import React, { Component } from 'react';

class EditInfomatinUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            image: []
        };
        this.updateInformation = this.updateInformation.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    updateInformation(event){
        event.preventDefault();
        var name = event.target['name'].value;
        var gender = event.target['gender'].value;
        var birthday = event.target['birthday'].value;
        var password = event.target['password'].value;
        var id = localStorage.getItem('User_id');
        var user = {
            id_user: id,
            name: name,
            gender: gender,
            birthday: birthday,
            password: password,
            image: this.state.image[0]
        }
        var informationInJson = JSON.stringify(user);
        console.log("data update");
        console.log(informationInJson);
        fetch("http://127.0.0.1:8000/api/user/update", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: informationInJson
        }).then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            response = null;
            return response;
          }
        }).then((response) => {
          if (response !== null) {
            alert("Chỉnh sửa thông tin thành công :)");
            window.location.replace('http://localhost:3000/personal');
          } else {
            alert('Không thể Chỉnh Sửa vui lòng kiểm tra đường truyền');
          }
        });
    }
    changeHandler(event) {
        event.stopPropagation();
        event.preventDefault();
        var { image } = this.state;
        var files = event.target.files;
        var file = files[0];
        var fileReader = new FileReader();
    
        fileReader.onload = function (progressEvent) {
          var url = fileReader.result;
          image.push(url);
          var myImg = document.getElementById("avata");
          myImg.src = url;
        }
        fileReader.readAsDataURL(file);
        this.setState({ image });

    }


    render() {
        const user = this.props.user;
        return (
            <div>
                <form onSubmit = {this.updateInformation}>
                    <h1 style = {{textAlign: "center", paddingBottom: "4%"}}> Edit Infomation User </h1>
                    <div className = "informmationUser">
                        <h3>Name </h3>
                        <input type="text" defaultValue = {user.name} name="name" placeholder="Full Name" />
                    </div>
                    <div className = "informmationUser">
                        <h3>Birthday </h3>
                        <input type="date" defaultValue = {user.birthday} name="birthday" />
                    </div>
                    <div className = "informmationUser">
                        <h3>Password </h3>
                        <input type="text" defaultValue = "" name="password" placeholder="Password" />
                    </div>
                    <div className="Gender">
                        <div className="formgender">
                            <h3>Gender </h3>
                        </div>
                        {
                            user.gender === "Nam"   ?<>   <div className="formgender">
                                                            <input type="radio" checked name="gender" value="Nam" />
                                                            <label for="male">Male</label>
                                                        </div>
                                                        <div className="formgender">
                                                            <input type="radio" name="gender" value="Nu" />
                                                            <label for="female">Female</label>
                                                        </div>
                                                    </>
                                                    :<>   
                                                        <div className="formgender">
                                                            <input type="radio" name="gender" value="Nam" />
                                                            <label for="male">Male</label>
                                                        </div>
                                                        <div className="formgender">
                                                            <input type="radio" checked name="gender" value="Nu" />
                                                            <label for="female">Female</label>
                                                        </div>
                                                    </>   
                        }
                        
                    </div>
                    <div className = "image">
                        <h3>Avata</h3>
                        <input type = "file" name="image" onChange={this.changeHandler}  />
                        <img id="avata" src={"http://127.0.0.1:8000/" + user.avatar} />
                    </div>
                    <button type = "submit"> Update </button>
                </form>
                
            </div>
        );
    }
}

export default EditInfomatinUser;