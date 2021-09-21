import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export class SignupLink extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <span className="ms-2">
                {<NavLink className="text-white text-decoration-none signup-link" to={'/signup'}>Đăng ký</NavLink>}
            </span>
        )
    }
}