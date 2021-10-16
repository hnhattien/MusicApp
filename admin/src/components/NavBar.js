import React, { Component } from 'react'
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import './navbar.css';
import NotificationList from './NotificationList';
export class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
          isShowNotifications: false,
          notificationCount: 0
        }
    }
    showNotifications = (ev) => {
      this.setState({
        isShowNotifications: true
      })
    }
    setNotificationCount = (count) => {
      this.setState({
        notificationCount: count
      })
    }
    componentDidMount = (ev) => {
      fetch('/notifications/unseen').then((res)=>{
         return res.json();
      }).then(dataRes=>{
        if(Array.isArray(dataRes)){
          let unseenNotificationCount = dataRes.filter(notify => notify.seen === 0).length;
          console.log(dataRes.filter(notify => notify.seen === 0))
          this.setNotificationCount(unseenNotificationCount);
        }
      }).catch(err=>{
        this.props.showMessage(true,String(err),"danger",{x:"50%",y:"50%"});
      })

    }
    hideNotifications = (ev) => {
      this.setState({
        isShowNotifications: false
      })
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
            localStorage.removeItem("adminid");
            this.props.updateLoginStatus();
          }
        }).catch(err=>{
          this.props.showMessage(true,String(err),"danger",{x:"50%",y:"50%"});
        }).then(()=>{
          this.props.toggleLoading(false);

        })

      }
    render() {

        return (
            <div style={{height: "100px"}} className="navbar">
                <div className="home">

                    <NavLink to={'/'}>
                    <span role="button" className="fas fa-home text-white"></span>
                       / <span className="text-white">Dashboard</span>
                    </NavLink>
                </div>
                <div className="tool">
                    {!this.props.user && <NavLink to={'/login'}>
                      <div className="text-white">

                        <span role="button" className="fas fa-user"></span>
                        <span className="ms-2 sign-in-link">Sign in</span>


                      </div>
                    </NavLink>}
                    <div className="profile-link-wrap me-4">
                          {this.props.user && <NavLink className="profile-link" to={'/profile'}><img className="avatar rounded-circle" src={`/upload/images/${this.props.user.avatar}`}/> <span className="nickname">{this.props.user.nickname}</span></NavLink> }
                    </div>
                    <div className="logout-link-wrap text-white me-4">
                          {this.props.user && <span role="button" className="logout-link text-white link-btn btn" onClick={this.logoutUser}>Logout</span> }
                    </div>
                    <div onClick={this.showNotifications} role="button" className="text-white notifications-bell-wrap">
                    <span role="button" className="fas fa-bell bell-btn">

                    </span>
                    {this.state.notificationCount > 0 && <span class="badge notifications-badge badge-danger">{this.state.notificationCount}</span>}
                    </div>
                </div>
                {this.state.isShowNotifications && <NotificationList setNotificationCount={this.setNotificationCount} hideNotifications={this.hideNotifications} {...this.props}>
                </NotificationList>}
            </div>

        )
    }
}

export default NavBar
