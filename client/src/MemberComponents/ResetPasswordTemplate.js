import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ResetPasswordForm from './FormComponents/ResetPasswordForm';

export class ResetPasswordTemplate extends Component {
    constructor(props){
        super(props);
        this.state={
            isAuth : false,
            dataRes : {},
            selector: ''
        }
    }
    componentDidMount = () => {
       let url = new URL(document.location);
       let paramSearchsString = url.search;
       let searchsOb = new URLSearchParams(paramSearchsString);
       if(searchsOb.has("sel") && searchsOb.has("token")){
           
         fetch('/users/authresetpassword',{
            method: "POST",
            headers: {
               "Accept" : "application/json",
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sel: searchsOb.get("sel"),
                token: searchsOb.get("token")
            })
         }).then((res)=>{
            return res.json();
         }).then(dataRes=>{
             console.log(dataRes);
             if(dataRes.error){
                 this.props.showMessage(true,dataRes.error.message,"danger");
                 this.setState({isAuth: false, dataRes: dataRes});
             }
             else if(dataRes.isAuth === true){
                 this.props.showMessage(true,dataRes.message,"success");
                 this.setState({selector: searchsOb.get("sel")});
                 this.setState({
                     isAuth: true, dataRes: dataRes
                 })
             }
         }).catch(err=>{
             
         }).then(()=>{
            
         })
       }
       else{
           this.setState({
               isAuth: false, dataRes: {error: {message: "You not permit to get this page."}}
           })
       }
    }
    render() {
        return (
            <div>
                <h1>{!this.state.isAuth && this.state.dataRes.error && this.state.dataRes.error.message}</h1>
                {this.state.isAuth && 
                <ResetPasswordForm selector={this.state.selector} {...this.props}></ResetPasswordForm>
                }
            </div>
        )
    }
}

export default withRouter(ResetPasswordTemplate)
