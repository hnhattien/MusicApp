import React, { Component } from 'react';

import  LoginForm  from './FormComponents/LoginForm';

export class LoginTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailPattern : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            usernamePattern : /^[A-Za-z]+[a-zA-Z0-9]*/,
            isValidInput : false,
            feedback : ""
        }
    }
    
 
    render(){
        return(
            <>
                <div className="login-form-wrap bg-dark mt-5 d-flex justify-content-center flex-column px-4">
                    <legend className="">Login</legend>
                    <LoginForm {...this.props}></LoginForm>
                </div>
            </>
                 
 
        )
    }
}