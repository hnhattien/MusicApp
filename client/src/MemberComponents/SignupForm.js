import React, { Component } from 'react';

import { FloatingForm } from './FloatingForm';
import { LabelForm } from './LabelForm';
import { SubmitButton } from './SumbitButton';
import { InputForm } from './InputForm';
export class SignupForm extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <form action="/signup" className="form-group" method="POST">
                
                <FloatingForm>
                    <InputForm placeholder="nhattien15" name="username" id="username" type="text" classes="form-control bg-dark text-white" ></InputForm>
                    <small className="form-text">Don't include space character</small>
                    <LabelForm for={"username"} text="Username"></LabelForm>
                </FloatingForm>
                
                <FloatingForm>
                    <InputForm placeholder="name@example.com" id="email" name="email" type="email" classes="form-control bg-dark text-white" ></InputForm>
                    <LabelForm for={"email"} text="Email"></LabelForm>
                    
                </FloatingForm>

                <FloatingForm>
                    <InputForm classes="form-control bg-dark text-white" name="password" type={"password"} id="password" placeholder="Type a password strong"></InputForm>
                    <LabelForm text="Password" for="password" ></LabelForm>
                </FloatingForm>
                <FloatingForm>
                    <InputForm classes="form-control bg-dark text-white" name="repeatpassword" type={"password"} id="repeatpassword" placeholder="Retype Password"></InputForm>
                    <LabelForm text="Retype Password" for="repeatpassword" ></LabelForm>
                </FloatingForm>
                <div className="input-group mt-5">
                    <SubmitButton text="Signup" name="submit" classes={'btn btn-primary'}>
                    </SubmitButton>
                </div>
            </form>
        )
    }
}