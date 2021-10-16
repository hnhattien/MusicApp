import React, { Component } from 'react'
import AvatarCustomizeMenu from './AvatarCustomizeMenu';
import AvatarCustomizePopup from './AvatarCustomizePopup';
import ChangePasswordPopup from './ChangePasswordPopup';
import NicknameCustomizePopup from './NicknameCustomizePopup';
export class ProfileSetting extends Component {
    constructor(props){
        super(props);
        this.inputfileRef = React.createRef();
        this.state = {
            
            user: {},
            isShowedAvatarCustomizeMenu: false,
            isShowedAvatarCustomizePopup: false,
            newInputAvatar : null,
            targetAvatarForEdit : null,
            isShowedNameEditorPopup: false,
            isShowedPasswordChangePopup: false
        }
    }
    componentDidMount = ()=>{
        this.props.toggleLoading(true); 
        fetch(`/users/${localStorage.getItem("userid")}`).then(res=>{
            return res.json();
        }).then(dataRes=>{
            console.log(dataRes);
            if(dataRes.error){
                this.props.showMessage(true,String(dataRes.error.message),"danger",{x:"40%",y:"60%"});  
            }
            console.log(dataRes);
            this.setState({
                user: {username: dataRes['username'],
                email: dataRes['email'],
                password: "**************",

            }
            })
        }).catch(err=>{
            this.props.showMessage(true,String(err),"danger",{x:"40%",y:"60%"});  
        }).then(()=>{
            this.props.toggleLoading(false);
           
        })
    }
    handleAvatarInput = (ev) => {
        let fileReader = new FileReader();
        fileReader.onload = (ev) => {
            console.log(ev.target.result);
            this.setState({
                newInputAvatar: ev.target.result,
                isShowedAvatarCustomizePopup: true,
                targetAvatarForEdit: ev.target.result,
            })    
        }
        fileReader.readAsDataURL(ev.target.files[0]);
        
    }

    changeAvatar = (ev)=>{
        if(this.inputfileRef){
            this.inputfileRef.current.click();
        }
    }
    toggleAvatarCustomizePopup = (isShow) => {
        if(this.state.isShowedAvatarCustomizePopup){
            this.setState({isShowedAvatarCustomizePopup: false});    
        }
        else{
            this.setState({isShowedAvatarCustomizePopup: true});
        }
        
    }
    toggleAvatarCustomizeMenu = (ev) => {
        this.setState({isShowedAvatarCustomizeMenu: !this.state.isShowedAvatarCustomizeMenu});
    }
    toggleNicknameEditorPopup = () => {
        if(!this.state.isShowedNameEditorPopup){
            this.setState({
                isShowedNameEditorPopup: true
            })
        }
        else{
            this.setState({
                isShowedNameEditorPopup: false
            })
        }
    }
    toggleChangePasswordPopup = () => {
        if(!this.state.isShowedPasswordChangePopup){
            this.setState({
                isShowedPasswordChangePopup: true
            })
        }
        else{
            this.setState({
                isShowedPasswordChangePopup: false,
            })
        }
    }
    render() {
        console.log(this.state.isShowedAvatarCustomizePopup)
        return (
            <div className="container-fluid">
                <div className="row">
                     <div className="col-12 d-flex justify-content-center">
                        <div className="setting-identify-wrap mt-4">
                             <div className="setting-avatar-wrap position-relative">
                                 <img onError={(ev)=>{ev.target.onerror=null; ev.target.src="/upload/images/defaultavatar.png"}} className="setting-avatar rounded-circle user-avatar-image" src={`/upload/images/${this.props.user.avatar}`}></img>
                                 <div className="setting-avatar-customize-button-wrap position-absolute">
                                     <span className="setting-avatar-customize-button" onClick={this.toggleAvatarCustomizeMenu} role="button">
                                        <i className="fas fa-camera text-dark"></i>
                                     </span>
                                     {this.state.isShowedAvatarCustomizeMenu && <AvatarCustomizeMenu changeAvatar={this.changeAvatar}></AvatarCustomizeMenu>}
                                 </div>

                             </div>
                             <div className="setting-name-wrap mt-2">
                                   <h4 className="text-center">{this.props.user.nickname}</h4>
                                   <span onClick={this.toggleNicknameEditorPopup} role="button" className="setting-edit-name-btn"><i class="fas fa-user-edit"></i></span>
                             </div>
                             
                        </div>
                        
                     </div>
                </div>
                <div className="row">
                    <div className="mt-5 account-info-wrap">
                        <div className="account-info-list">
                                <div className="account-info d-flex">
                                    <h4>Username</h4>
                                    <h4 className="me-5">{this.state.user.username}</h4>
                                </div>
                                <div className="account-info d-flex">
                                    <h4>Email</h4>
                                    <h4 className="me-5">{this.state.user.email}</h4>
                                </div>
                                <div className="account-info d-flex">
                                    <h4>Password</h4>
                                    <div className="d-flex">
                                    {this.state.user.email !== this.state.user.username &&<><h4 className="me-5">{this.state.user.password}</h4>
                                    <span onClick={this.toggleChangePasswordPopup} role="button">Change password</span></>}
                                    {this.state.user.email === this.state.user.username && <span className="text-warning">You are login by Social Media Platform</span>}
                                    </div>
                                    
                                </div>
                        </div>
                    </div>
                </div>
                {this.state.isShowedAvatarCustomizePopup && <AvatarCustomizePopup updateUserChanges={this.props.updateUserChanges} toggleAvatarCustomizeMenu={this.toggleAvatarCustomizeMenu} toggleAvatarCustomizePopup={this.toggleAvatarCustomizePopup} {...this.props} targetAvatar={this.state.targetAvatarForEdit}></AvatarCustomizePopup>}
                {this.state.isShowedNameEditorPopup && <NicknameCustomizePopup toggleNicknameEditorPopup={this.toggleNicknameEditorPopup} {...this.props}></NicknameCustomizePopup>}
                {this.state.isShowedPasswordChangePopup && <ChangePasswordPopup toggleChangePasswordPopup={this.toggleChangePasswordPopup} {...this.props}></ChangePasswordPopup>}
                <input accept={"image/*"} onInput={this.handleAvatarInput} type="file" style={{display: "none"}} name="avatarinput" ref={this.inputfileRef} id="avatarinput"></input>
            </div>
        )
    }
}

export default ProfileSetting
    