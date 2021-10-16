import React, { Component } from 'react';
import  LoginForm  from './FormComponents/LoginForm';
import FacebookLogin from 'react-facebook-login';
import { withRouter } from 'react-router';
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

    requestLogin = (user) => {
      this.props.toggleLoading(true);
      if(typeof user === typeof {}){
        fetch('/auth/facebook',{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user: user})
        }).then(res=>{
            return res.json();
        }).then((resData)=>{
           if(resData.error){
              this.props.showMessage(true, resData.error.message, "danger");
           }
           else{
            this.props.showMessage(true, "Login success", "success");
            localStorage.setItem("userid",resData.id);
            this.props.updateLoginStatus();
            this.props.history.push("/")
           }

        }).catch(err=>{
            setTimeout(()=>{
                this.props.showMessage(true, String(err), "danger");
            },1000);
            this.props.toggleLoading(false);
        })
      }
    }
    getBase64ImageFromBlob = (blobImage) => {

    }
    responseFacebook = async (res)=>{
       let user = {};
       console.log(res);
       if(res.userID){
        let imageBlob = await fetch(res.picture.data.url).then(data=>{
            return data.blob();
        });
        let fileReader = new FileReader();
         fileReader.onload = (ev)=>{
             user.avatarBase64 = ev.target.result;
             user.userid = res.userID;
             user.name = res.name;
             user.email = res.email;
             console.log(user);
             this.requestLogin(user);
         }
         fileReader.readAsDataURL(imageBlob);
       }
    }

    componentWillMount = ()=>{
      if(localStorage.getItem("userid")){
        this.props.history.push('/');
      }
    }
    render(){
        return(
            <>
                <div className="login-form-wrap bg-dark mt-5 d-flex justify-content-center flex-column px-4">
                    <legend className="">Login</legend>
                    <LoginForm {...this.props}></LoginForm>
                    <div className="mt-5 text-center">
                        <FacebookLogin
                           appId="415682653239184"
                           fields="name,email,picture"
                           onClick={this.handleClickLoginFacebook}
                           callback={this.responseFacebook}
                           icon="fa-facebook pe-2"
                           cssClass="btn btn-light"
                        ></FacebookLogin>
                    </div>
                </div>

            </>


        )
    }
}

export default withRouter(LoginTemplate)
