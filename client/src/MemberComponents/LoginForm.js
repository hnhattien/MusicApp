import React, { Component } from 'react';
import { InputForm } from './InputForm';
import { SubmitButton } from './SumbitButton';
import {LabelForm} from './LabelForm';
import { FloatingForm } from './FloatingForm';
export class LoginForm extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            
            <form action="/login" className="form-group" method="POST">
                
                <FloatingForm>
                    <InputForm placeholder="name@example.com" id="username" type="text" classes="form-control bg-dark text-white" ></InputForm>
                    <LabelForm for={"username"} text="Username or Email"></LabelForm>
                </FloatingForm>
                
                <FloatingForm>
                    <InputForm classes="form-control bg-dark text-white" name="password" type={"password"} id="password" placeholder="Type a password to login..."></InputForm>
                    <LabelForm text="Password" for="password" ></LabelForm>
                </FloatingForm>
                <div className="input-group mt-5">
                    <SubmitButton text="Login" name="submit" classes={'btn btn-primary'}>
                    </SubmitButton>
                </div>
            </form>
            
        )
    }
}