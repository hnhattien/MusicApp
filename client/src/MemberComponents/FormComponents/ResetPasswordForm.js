import React, { Component } from 'react'
import { SubmitButton } from './SumbitButton';
import { InputForm } from './InputForm';
import { LabelForm } from './LabelForm';
import { FloatingForm } from './FloatingForm';
import { InvalidFeedbackLabel } from './InvalidFeedbackLabel';
export class ResetPasswordForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            password: "",
            repeatpassword: "",
            validator:{
                toPassword: {isValid: false, text: ""}                
             }
        }
    }
    setValidatorState = (passwordValidateRes)=>{
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
    }
    handleChange = (ev) => {
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }

    validatePassword = () => {
        let password = this.state.password;
        if(password){
            if(password !== this.state.repeatpassword){
                return {error: true,message: "Password not same."}
            }
            else{
                return {error: false};
            }
        }
        else{
            return {error: true, message: "Please fill out to form fully."}
        }
    }

    resetPassword = (ev) => {
        ev.preventDefault();
        let password=this.state.password;
        let repeatpassword=this.state.repeatpassword;
        
        //Frontend validate

        let passwordValidateRes = this.validatePassword();
        this.setValidatorState(passwordValidateRes);
        if(!passwordValidateRes.error){
            if(this.props.selector){
                this.props.toggleLoading(true);
                fetch('/users/changepassword',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({
                        password: password,
                        repeatpassword: repeatpassword,
                        selector: this.props.selector
                    })
                }).then(res=>{
                    return res.json();
                }).then(data=>{
                    console.log(data);
                    if(data['error']){
                        this.props.showMessage(true,data['message'],'danger');     
                    }
                    else{
                        this.props.showMessage(true,data['message'],'success');
                        
                    }
                   
                }).catch(err=>{
                    this.props.showMessage(true,String(err),'warning');
                }).then(()=>{
                    this.props.toggleLoading(false);
                    setTimeout(()=>{
                        this.props.showMessage(false);
                        
                    },5000);
                    this.props.history.push('/login');
                })
            }
            
        }

    }
    render() {
        return (
            <form disabled={true} onSubmit={this.resetPassword} className="form-group" method="POST">
                <legend>Reset password</legend>
                <FloatingForm>
                    <InputForm value={this.state.password} classes="form-control bg-dark text-white" handleChange={this.handleChange} name="password" type={"password"} id="password" placeholder="Type a password"></InputForm>
                    <LabelForm text="Password" for="password" ></LabelForm>
                </FloatingForm>
                <FloatingForm>
                    <InputForm value={this.state.repeatpassword} classes="form-control bg-dark text-white" handleChange={this.handleChange} name="repeatpassword" type={"password"} id="repeatpassword" placeholder="Retype a password"></InputForm>
                    <InvalidFeedbackLabel validator={this.state.validator.toPassword}/>
                    <LabelForm text="Repeat Password" for="repeatpassword" ></LabelForm>
                </FloatingForm>  
                <div className="input-group mt-5">
                    <SubmitButton  text="Change password" name="submit" classes={'btn btn-primary'}>
                    </SubmitButton>
                </div>  
            </form>
        )
    }
}

export default ResetPasswordForm
