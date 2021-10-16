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
            
        })
    }
    render() {
        return (
            <div className={'popup-wrapper bg-dark w-75 border text-white'}>
                <div className="text-white customize-avatar-popup-title">
                    <h1 className="text-white">Change Nickname</h1>
                </div>
                <div className="popup-inner bg-dark mt-5">
                
                    <div className="nickname-input-wrap d-flex justify-content-center">
                    <h6 className="d-block position-relative me-2" style={{top: "8px"}}>Nickname: </h6>        
                    <input maxLength="50" value={this.state.nickname} onChange={this.changeHandle} className="form-control w-75 bg-dark text-white" name="nickname">
                    </input>
                    </div>
                    <div className="save-btn-wrap">
                        <button className="cancel-btn btn btn-light me-2" onClick={this.props.toggleNicknameEditorPopup} >
                            Cancel
                        </button>
                        <button onClick={this.saveEdit} className="btn btn-light">
                            Change nickname
                        </button>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default NicknameCustomizePopup
