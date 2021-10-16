import React, { Component } from 'react'
import { FloatingForm } from './FormComponents/FloatingForm';
import { InputForm } from './FormComponents/InputForm';
import { LabelForm } from './FormComponents/LabelForm';
import { SubmitButton } from './FormComponents/SumbitButton';
export class ForgetPasswordTemplate extends Component {
    constructor(props){
        super(props);
        this.state={
            username: ""
        }
    }
    handleChange = (ev) => {
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }
    sendToEmail = (ev) => {
        ev.preventDefault();
        this.props.toggleLoading(true);
        fetch("/users/resetpassword",{
            method: "POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": this.state.username
            })
        }).then((res)=>{
            
            return res.json();
        }).then((dataRes)=>{
            console.log(dataRes);
            if(dataRes.error){
                this.props.showMessage(true,dataRes.error.message,"danger");
            }
            else{
                this.props.showMessage(true,dataRes.message,"success");
            }
        }).catch(err=>{
            this.props.showMessage(true,String(err),"danger");
        }).then(()=>{
            this.props.toggleLoading(false);
           
        })
    }
    render() {
        return (
            <div className="login-form-wrap bg-dark mt-5 d-flex justify-content-center flex-column px-4">
                <legend className="">Reset Password.</legend>
                <form disabled={true} onSubmit={this.sendToEmail} className="form-group" method="POST">
                <FloatingForm>
                        <InputForm handleBlur={this.handleBlur} name="username" value={this.state.username} handleChange={this.handleChange} placeholder="name@example.com" id="username" type="text" classes="form-control bg-dark text-white" ></InputForm>
                        <LabelForm for={"username"} text="Username hoặc email liên kết tài khoản"></LabelForm>
                        <SubmitButton text="Yêu cầu khôi phục mật khẩu" name="submit" classes={'btn mt-4 btn-primary'}>
                        </SubmitButton>
                        
                    </FloatingForm>
                </form>
            </div>
        )
    }
}

export default ForgetPasswordTemplate
