import React, { Component } from 'react';

import { FloatingForm } from './FloatingForm';
import { LabelForm } from './LabelForm';
import { SubmitButton } from './SumbitButton';
import { InputForm } from './InputForm';
export class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repeatpassword: ''
        }
    }
    handleSignup = (ev) => {
        let username = this.state.username,email=this.state.email, password=this.state.password, repeatpassword=this.state.repeatpassword;
        console.log(username,email,password,repeatpassword)
        ev.preventDefault();
        fetch('/auth/signup',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                repeatpassword: repeatpassword
            })
        }).then(res=>{
            return res.json();
        }).then(data=>{
           console.log(data);
        }).catch(err=>{
           console.log(err);
        })
    }
    handleChange = (ev) => {
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }
    render(){
        return(
            <form onSubmit={this.handleSignup} className="form-group" method="POST">
                
                <FloatingForm>
                    <InputForm value={this.state.username} handleChange={this.handleChange} placeholder="nhattien15" name="username" id="username" type="text" classes="form-control bg-dark text-white" ></InputForm>
                    <small className="form-text">Don't include space character</small>
                    <LabelForm for={"username"} text="Username"></LabelForm>
                </FloatingForm>
                
                <FloatingForm>
                    <InputForm value={this.state.email} handleChange={this.handleChange} placeholder="name@example.com" id="email" name="email" type="email" classes="form-control bg-dark text-white" ></InputForm>
                    <LabelForm for={"email"} text="Email"></LabelForm>
                    
                </FloatingForm>

                <FloatingForm>
                    <InputForm value={this.state.password} handleChange={this.handleChange} classes="form-control bg-dark text-white" name="password" type={"password"} id="password" placeholder="Type a password strong"></InputForm>
                    <LabelForm text="Password" for="password" ></LabelForm>
                </FloatingForm>
                <FloatingForm>
                    <InputForm value={this.state.repeatpassword} handleChange={this.handleChange} classes="form-control bg-dark text-white" name="repeatpassword" type={"password"} id="repeatpassword" placeholder="Retype Password"></InputForm>
                    <LabelForm text="Retype Password" for="repeatpassword" ></LabelForm>
                </FloatingForm>
                <div className="input-group mt-5">
                    <SubmitButton  text="Signup" name="submit" classes={'btn btn-primary'}>
                    </SubmitButton>
                </div>
            </form>
        )
    }
}