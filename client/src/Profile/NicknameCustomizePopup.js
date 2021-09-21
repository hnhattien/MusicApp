import React, { Component } from 'react'

export class NicknameCustomizePopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            nickname: ""
        }
    }
    changeHandle = (ev) =>{
        this.setState({
            nickname: ev.target.value
        })
    }
    saveEdit = () => {
        this.props.toggleLoading(true);
        let newNickname = this.state.nickname;
        fetch('/users/changenickname',{
            method: "post",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newNickname: newNickname
            })
        }).then(res=>{
            return res.json();
        }).then(dataRes=>{
            if(dataRes.error){
                this.props.showMessage(true,String(dataRes.error.message),"danger",{x:"40%",y:"60%"});  
            }
            else{
                this.props.showMessage(true,String(dataRes.message),"success",{x:"40%",y:"60%"});  
            }
        }).catch(err=>{
            
            this.props.showMessage(true,String(err),"danger",{x:"40%",y:"60%"});  
            
        }).then(()=>{
            this.props.toggleLoading(false);
            this.props.toggleNicknameEditorPopup();
            this.props.updateUserChanges();
            setTimeout(()=>{
                this.props.showMessage(false);      
            },500);
        })
    }
    render() {
        return (
            <div className={'popup-wrapper bg-light w-100'}>
                <div className="text-dark customize-avatar-popup-title">
                    <h1 className="text-dark">Change Nickname</h1>
                </div>
                <div className="popup-inner bg-light mt-5">
                    <div className="nickname-input-wrap d-flex justify-content-center">
                    <input maxLength="50" value={this.state.nickname} onChange={this.changeHandle} className="form-control w-75" name="nickname">
                    </input>
                    </div>
                    <div className="save-btn-wrap">
                        <button onClick={this.saveEdit} className="btn btn-primary">
                            Change nickname
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NicknameCustomizePopup
