import React, { Component } from 'react';
import * as EmailValidator from 'email-validator';
import { FloatingForm } from './FloatingForm';
import { LabelForm } from './LabelForm';
import { SubmitButton } from './SumbitButton';
import { InputForm } from './InputForm';
import {InvalidFeedbackLabel} from './InvalidFeedbackLabel';
import {withRouter} from 'react-router-dom';
export class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repeatpassword: '',
            validator:{
               toEmail: {isValid: false, text:""},
               toUsername: {isValid: false, text:""},
               toPassword: {isValid: false, text: ""}
            }
        }
    }
    validateEmail = () => {
        //Validate Email
        let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(this.state.email){
            if(!emailPattern.test(this.state.email)){
                return {error: true, message: "Email is invalid!"};
            }
            else{
                return {error: false, message: ""};
            }
        }
        else{
            return {error: true, message: "Please fill out to form fully."}
        }
    }
    validateUsername = () => {
        let usernamePattern = /^[a-zA-Z]+[0-9a-zA-Z]*$/;
        if(this.state.username){
            if(!usernamePattern.test(this.state.username)){
                return {error: true,message: "Username is invalid. Username must to start with a letter, can include letter and numberic. Not include special character!"}
            }
            else{
                return {error: false,message: ""}
            }
        }
        else{
            return {error: true, message: "Please fill out to form fully."}
        }
    }
    validatePassword = () => {
        //min 8
        let password = this.state.password;
        let isStrong = true;
        if(password){
            if(password !== this.state.repeatpassword){
                return {error: true,message: "Password not same."}
            }
            if(password.length < 8){
                console.log("1")
               isStrong = false;
            }
            // if(password.match(/[A-Z]+/) === null){
            //     console.log("2")
            //    isStrong = false;
            // }
            if(password.match(/[a-z]+/) === null){
                console.log("3")
                isStrong = false;
            }
            // if(password.match(/[0-9]+/) === null){
            //     isStrong = false;
            // }
            if(password.match(/\s+/) !== null){
                console.log("4")
                isStrong = false;
            }
            if(password.match(/^hello1234$ | password | ^123456789$/) !== null){
                console.log("5")
                isStrong = false;
            }
            if(isStrong === false){
                return {error: true, message:"Please choose a password stronger"};
            }
            else{
                return {error: false, message: ""}
            }
        }
        else{
            return {error: true, message: "Please fill out to form fully."}
        }
    }
    setValidatorState = (emailValidateRes,usernameValidateRes,passwordValidateRes)=>{
        console.log(this.state)
        console.log(emailValidateRes,usernameValidateRes,passwordValidateRes);
        if(emailValidateRes.error){
            this.setState((currentState)=>{
                let validator = Object.assign({},currentState.validator);
                validator.toEmail.isValid = false;
                validator.toEmail.text = emailValidateRes.message;
                return validator;
            },()=>{
                console.log(this.state);
            })
        }
        else{
            this.setState((currentState)=>{
                let validator = Object.assign({},currentState.validator);
                validator.toEmail.isValid = true;
                validator.toEmail.text = emailValidateRes.message;
                return validator;
            },()=>{
                console.log(this.state);
            })
        }
        if(usernameValidateRes.error){
            this.setState((currentState)=>{
                let validator = Object.assign({},currentState.validator);
                validator.toUsername.isValid = false;
                validator.toUsername.text = usernameValidateRes.message;
                return validator;
            },()=>{
                console.log(this.state);
            })
        }
        else{
            this.setState((currentState)=>{
                let validator = Object.assign({},currentState.validator);
                validator.toUsername.isValid = true;
                validator.toUsername.text = usernameValidateRes.message;
                return validator;
            },()=>{
                console.log(this.state);
            })
        }
        if(passwordValidateRes.error){
            this.setState((currentState)=>{
                let validator = Object.assign({},currentState.validator);
                validator.toPassword.isValid = false;
                validator.toPassword.text = passwordValidateRes.message;
                return validator;
            },()=>{
                console.log(this.state);
            })
        }
        else{
            this.setState((currentState)=>{
                let validator = Object.assign({},currentState.validator);
                validator.toPassword.isValid = true;
                validator.toPassword.text = passwordValidateRes.message;
                return validator;
            },()=>{
                console.log(this.state);
            })
        }
    }
    handleSignup = (ev) => {
        let username = this.state.username,
        email=this.state.email,
        password=this.state.password,
        repeatpassword=this.state.repeatpassword;
        ev.preventDefault();
        //Frontend validate

        let emailValidateRes = this.validateEmail();
        let usernameValidateRes = this.validateUsername();
        let passwordValidateRes = this.validatePassword();
        this.setValidatorState(emailValidateRes,usernameValidateRes, passwordValidateRes);
        if(!emailValidateRes.error && !usernameValidateRes.error && !passwordValidateRes.error){
            this.props.toggleLoading(true);
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
                if(data['error']){
                    this.props.showMessage(true,data.error.message,'danger');
                }
                else{
                    this.props.showMessage(true,data['message'],'success');
                    this.props.history.push('/login');
                }

            }).catch(err=>{
                this.props.showMessage(true,String(err),'warning');
            }).then(()=>{
                this.props.toggleLoading(false);


            })
        }
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
                    <InvalidFeedbackLabel validator={this.state.validator.toUsername}/>
                    <LabelForm for={"username"} text="Username"></LabelForm>
                </FloatingForm>

                <FloatingForm>
                    <InputForm value={this.state.email} handleChange={this.handleChange} placeholder="name@example.com" id="email" name="email" type="email" classes="form-control bg-dark text-white" ></InputForm>
                    <InvalidFeedbackLabel validator={this.state.validator.toEmail}/>
                    <LabelForm for={"email"} text="Email"></LabelForm>

                </FloatingForm>

                <FloatingForm>
                    <InputForm value={this.state.password} handleChange={this.handleChange} classes="form-control bg-dark text-white" name="password" type={"password"} id="password" placeholder="Type a password strong"></InputForm>
                    <InvalidFeedbackLabel validator={this.state.validator.toPassword}/>
                    <LabelForm text="Password" for="password" ></LabelForm>
                </FloatingForm>
                <FloatingForm>
                    <InputForm value={this.state.repeatpassword} handleChange={this.handleChange} classes="form-control bg-dark text-white" name="repeatpassword" type={"password"} id="repeatpassword" placeholder="Retype Password"></InputForm>
                    <InvalidFeedbackLabel validator={this.state.validator.toPassword}/>
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

export default withRouter(SignupForm);
