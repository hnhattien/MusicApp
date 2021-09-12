import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
export class MemberToolMenu extends Component{
    render(){
        return (
            <div className="member-tool-wrap w-100 d-flex justify-content-around w-100">
                <div className="ps-3">
                    <span className="me-2">
                            <NavLink className="text-white text-decoration-none signin-link login-link" to={'/login'}>Đăng nhập</NavLink>
                    </span>
                        |
                    <span className="ms-2">
                        <NavLink className="text-white text-decoration-none signup-link" to={'/signup'}>Đăng ký</NavLink>
                    </span>
                </div>
                    <span>
                        <a href="#setting">
                            <span className="fa-cog fa text-white"></span>
                        </a>
                    </span>
            </div>
        )
    }
}
