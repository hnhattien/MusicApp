import React, { Component } from 'react';
import { InputForm } from './InputForm';
import { SubmitButton } from './SumbitButton';
import {LabelForm} from './LabelForm';
import { FloatingForm } from './FloatingForm';
import { NavLink } from 'react-router-dom';
import { ValidFeedbackLabel } from './ValidFeedbackLabel';

import {InvalidFeedbackLabel} from './InvalidFeedbackLabel';

import {withRouter} from 'react-router-dom';
class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }
    handleChange = (ev) => {
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }
    // validate = (ev)=>{
    //     if(this.state.emailPattern.test(this.state.username)){  //If user type email
    //         this.setState({isValidInput: true,feedback: <ValidFeedbackLabel></ValidFeedbackLabel>});
    //     }
    //     else{ //else if user type a username
    //        if(!this.state.usernamePattern.test(this.state.username)){
    //            this.setState({isValidInput: false, feedback: <InvalidFeedbackLabel text={'If you type username then username should only include letter characters and numberic and start with a letter. (nhattien15 is valid but not 1234hello)'}></InvalidFeedbackLabel>});
    //        }
    //        else{
    //            this.setState({isValidInput: true,feedback: <ValidFeedbackLabel></ValidFeedbackLabel>});
    //        }
    //     }
    // }
    loginUser = (ev)=>{
        ev.preventDefault();
        this.props.toggleLoading(true,{x:"50%",y:"50%"});
        let username = this.state.username;
        let password = this.state.password;
        fetch("/auth/login",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({username: username,password: password})
        }).then(res=>{
            return res.json();
        }).then(data=>{
            
          console.log(data);
          if(data.error){
            this.props.showMessage(true,String(data.error.message),"danger",{x:"40%",y:"60%"});  
          }
          else if(data.user){
            window.localStorage.setItem("userid",data.user.id);
            this.props.showMessage(true,String(data.message),"success",{x:"40%",y:"60%"});
            console.log(data);
            this.props.setLoginState(data.user); 
            this.props.history.push("/");
            this.props.toggleLoading(true,{x:"50%",y:"50%"});
          }
          
          
        }).catch(err=>{
            console.log(err);
            if(this.state.isLogin === true){
              this.props.setLogoutState();
            }
            this.props.showMessage(true,String(err),"warning",{x:"40%",y:"60%"});
        }).then(()=>{
           
            this.props.toggleLoading(false);
        })
      }
    
    
    render(){
        return(
            
            <form disabled={true} onSubmit={this.loginUser} className="form-group" method="POST">
                
                <FloatingForm>
                    <InputForm handleBlur={this.handleBlur} name="username" value={this.state.username} handleChange={this.handleChange} placeholder="name@example.com" id="username" type="text" classes="form-control bg-dark text-white" ></InputForm>
                    <LabelForm for={"username"} text="Username or Email"></LabelForm>
                    {this.state.username.length !== 0 && this.state.feedback}
                    
                </FloatingForm>
                
                <FloatingForm>
                    <InputForm handleBlur={this.handleBlur} value={this.state.password} classes="form-control bg-dark text-white" handleChange={this.handleChange} name="password" type={"password"} id="password" placeholder="Type a password to login..."></InputForm>
                    <LabelForm text="Password" for="password" ></LabelForm>
                </FloatingForm>
                <div className=" mt-5">
                    <SubmitButton submitHandle={this.props.submitHanlde} text="Login" name="submit" classes={'btn btn-primary'}>
                    </SubmitButton>
                    <NavLink to={'/forgetpassword'} className="btn text-dark ms-4 btn-danger">
                        Forget Password
                    </NavLink>
                </div>
                
            </form>
            
        )
    }
}

export default withRouter(LoginForm);