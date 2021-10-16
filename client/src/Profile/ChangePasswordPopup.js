import React, { Component } from 'react'

export class ChangePasswordPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentpassword: "",
            newpassword: "",
            repeatnewpassword: ""
        }
    }
    changeHandle = (ev) => {
        this.setState({
            [ev.target.name] : ev.target.value,
        })
    }
    changePassword = () => {
        if(this.state.currentpassword === "" && this.state.newpassword === "" && this.state.repeatnewpassword === ""){
            alert("Fill out form.");

        }
        else if(this.state.newpassword !== this.state.repeatnewpassword){
            alert("New password and repeat password are not same");
        }
        else{
            this.props.toggleLoading(true);
            let currentpassword = this.state.currentpassword;
            let newpassword = this.state.newpassword;
            let repeatnewpassword = this.state.currentpassword;
            fetch('/users/changepassword',{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(
                    {
                        "currentpassword" : currentpassword,
                        "newpassword": newpassword,
                        "repeatnewpassword": repeatnewpassword
                    }
                )
            }).then(res=>{
                return res.json();
            }).then(dataRes=>{
                console.log(dataRes);
                if(dataRes.error){
                    this.props.showMessage(true,String(dataRes.error.message),"danger",{x:"40%",y:"60%"});  
                }
                else{
                    this.props.showMessage(true,String(dataRes.message),"success",{x:"40%",y:"60%"});  
                    this.props.toggleChangePasswordPopup();
                }
            }).catch(err=> {
                this.props.showMessage(true,String(err),"danger",{x:"40%",y:"60%"});  
            }).then(() => {
                this.props.toggleLoading(false);
                
            })
        }
    }
    render() {
        return (
            <div className={'popup-wrapper bg-dark w-75 border'}>
                <div className="text-white customize-avatar-popup-title">
                    <h1 className="text-white">Change Password</h1>
                </div>
                <div className="popup-inner ms-4 bg-dark mt-5 d-flex flex-column justify-content-center ">
                    <div className="current-password-input-wrap">
                        <h4 className="text-white">Current Password</h4>
                        <input value={this.state.currentpassword} onChange={this.changeHandle} className="form-control bg-dark text-white w-75" name="currentpassword">
                        </input>
                    </div>
                    <div className="new-password-input-wrap">
                    <h4 className="text-white">New Password</h4>
                        <input value={this.state.newpassword} onChange={this.changeHandle} className="form-control bg-dark text-white w-75" name="newpassword">
                        </input>
                    </div>
                    <div className="repeat-password-input-wrap">
                    <h4 className="text-white">Repeat Password</h4>
                        <input value={this.state.repeatnewpassword} onChange={this.changeHandle} className="form-control bg-dark text-white w-75" name="repeatnewpassword">
                        </input>
                    </div>
                    <div className="change-password-btn-wrap mt-5">
                        <button onClick={this.props.toggleChangePasswordPopup} className="btn btn-light me-4">
                            Cancel
                        </button>
                        <button onClick={this.changePassword} className="btn btn-light">
                            Change password
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePasswordPopup
