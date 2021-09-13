import React, { Component } from 'react';

import { LoginForm } from './LoginForm'

export class LoginTemplate extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <>
                <div className="login-form-wrap bg-dark mt-5 d-flex justify-content-center flex-column px-4">
                    <legend className="">Login</legend>
                    <LoginForm></LoginForm>
                </div>
            </>
                 
 
        )
    }
}