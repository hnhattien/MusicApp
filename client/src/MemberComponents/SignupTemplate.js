import React, { Component } from 'react';
import  SignupForm  from './FormComponents/SignupForm';
export class SignupTemplate extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div className="login-form-wrap bg-dark mt-5 d-flex justify-content-center flex-column px-4">
                    <legend className="">Signup</legend>
                    <SignupForm {...this.props}></SignupForm>
                </div>
        )
    }
}