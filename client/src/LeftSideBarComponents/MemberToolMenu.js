import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {LoginLink} from './LoginLink';
import {SignupLink} from './SignupLink';
import { SettingButton } from './SettingButton';

export class MemberToolMenu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="member-tool-wrap w-100 d-flex justify-content-around w-100">
                <div className="ps-3 profile-link-wrap">
                    
                    {localStorage.getItem("userid") === null  &&  <LoginLink></LoginLink>}  
                    {localStorage.getItem("userid") === null && <SignupLink/>}
                    
                    {localStorage.getItem("userid") !== null &&  <NavLink className={'d-flex justify-content-between'} to={'/profile'} exact={true}><span className="avatar-thumbnail-wrap"><img onError={(ev)=>{ev.target.onerror=null; ev.target.src="/upload/images/defaultavatar.png"}} src={`/upload/images/${this.props.user.avatar}`} className="rounded-circle avatar-thumbnail user-avatar-image" alt="avatar" title={this.props.user.avatar}></img></span><span>{this.props.user.nickname}</span></NavLink>   }
                   

                </div>
                    {localStorage.getItem("userid") !== null && <SettingButton {...this.props}/>}
            </div>
        )
    }
}
