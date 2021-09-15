import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
export class MemberToolMenu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="member-tool-wrap w-100 d-flex justify-content-around w-100">
                <div className="ps-3">
                    <span>
                        {console.log(this.props.isLogin)}
                        {this.props.isLogin === true  && `User ${window.localStorage.getItem('userid')}`}
                        </span>
                    <span className="me-2">
                        {!this.props.isLogin &&<NavLink className="text-white text-decoration-none signin-link login-link" to={'/login'}>Đăng nhập</NavLink>}
                    </span>
                        |
                    <span className="ms-2">
                        {!this.props.isLogin && <NavLink className="text-white text-decoration-none signup-link" to={'/signup'}>Đăng ký</NavLink>}
                    </span>

                </div>
                    <div>
                        
                       <span role="button"><i className="fa-cog fa text-white"></i></span>
                        
                    </div>
            </div>
        )
    }
}
