import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export class LoginLink extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <span className="me-2">
                {!this.props.isLogin && <NavLink className="text-white text-decoration-none signup-link" to={'/login'}>Đăng nhập</NavLink>}
            </span>
        )
    }
}