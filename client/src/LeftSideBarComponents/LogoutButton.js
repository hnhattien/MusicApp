import React, { Component } from 'react'

export class LogoutButton extends Component {
    constructor(props){
        super(props);
    }
    logoutUser = () => {
        this.props.toggleLoading(true);
        fetch('/auth/logout',{
          method: "POST",
          headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
          }
        }).then(res=>{
          return res.json();
        }).then(data=>{
          if(data.error){
            this.props.showMessage(true,data.error.message,"danger",{x:"50%",y:"50%"});
          }
          else{
            this.props.showMessage(true,data.message,"success",{x:"50%",y:"50%"});
            localStorage.removeItem("userid");
          }
        }).catch(err=>{
          this.props.showMessage(true,String(err),"danger",{x:"50%",y:"50%"});
          console.log(err);
        }).then(()=>{
          this.props.toggleLoading(false);
          this.props.toggleSettingMenu();
          
        })
        
      }
    render() {
        return (
           <li className="list-group-item">
                <div>
                <span style={{userSelect: "none"}} onClick={this.logoutUser} className="text-white" role="button">Logout</span>
                </div>
           </li>
        )
    }
}

export default LogoutButton
