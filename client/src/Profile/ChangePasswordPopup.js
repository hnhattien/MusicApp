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
                setTimeout(()=>{
                    this.props.showMessage(false);      
                },4000);
            })
        }
    }
    render() {
        return (
            <div className={'popup-wrapper bg-light w-100'}>
                <div className="text-dark customize-avatar-popup-title">
                    <h1 className="text-dark">Change Password</h1>
                </div>
                <div className="popup-inner ms-4 bg-light mt-5 d-flex flex-column justify-content-center ">
                    <div className="current-password-input-wrap">
                        <h4 className="text-dark">Current Password</h4>
                        <input value={this.state.currentpassword} onChange={this.changeHandle} className="form-control w-75" name="currentpassword">
                        </input>
                    </div>
                    <div className="new-password-input-wrap">
                    <h4 className="text-dark">New Password</h4>
                        <input value={this.state.newpassword} onChange={this.changeHandle} className="form-control w-75" name="newpassword">
                        </input>
                    </div>
                    <div className="repeat-password-input-wrap">
                    <h4 className="text-dark">Repeat Password</h4>
                        <input value={this.state.repeatnewpassword} onChange={this.changeHandle} className="form-control w-75" name="repeatnewpassword">
                        </input>
                    </div>
                    <div className="change-password-btn-wrap mt-5">
                        <button onClick={this.props.toggleChangePasswordPopup} className="btn btn-primary me-4">
                            Cancel
                        </button>
                        <button onClick={this.changePassword} className="btn btn-primary">
                            Change password
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePasswordPopup
