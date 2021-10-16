import React, { Component } from 'react'
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
export class NotificationList extends Component {
    constructor(props){
        super(props);
        this.detectClickOutside = React.createRef();
        this.state = {
          data: null
        }
    }
    componentDidMount = () => {

      document.addEventListener("mousedown",this.handleClickOutside);
      fetch("/notifications").then(res=>{
        return res.json();
      }).then(dataRes=>{


        if(Array.isArray(dataRes)){
          this.setState({
            data : dataRes
          })

        }
      }).catch(err=>{
        this.props.showMessage(true,String(err),"danger");
      })
    }

    componentWillUnmount = () => {
        document.removeEventListener("mousedown",this.handleClickOutside);
        fetch('/notifications/unseen').then((res)=>{
           return res.json();
        }).then(dataRes=>{
          console.log(dataRes);
          if(Array.isArray(dataRes)){
            let unseenNotificationCount = dataRes.filter(notify => notify.seen === 0).length;
            console.log(dataRes.filter(notify => notify.seen === 0))
            this.props.setNotificationCount(unseenNotificationCount);
          }
        }).catch(err=>{
          this.props.showMessage(true,String(err),"danger",{x:"50%",y:"50%"});
        })
    }
    setSeenState = () => {
      fetch('/notifications/updateseenstate',{
        method: "POST",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json"
        }
      }).then(res=>{
        return res.json();
      }).then((dataRes)=>{
        if(dataRes.error){
            this.props.showMessage(true,String(dataRes.error.message),"danger",{x:"40%",y:"60%"});
        }
      }).catch((err)=>{
        this.props.showMessage(true,String(err),"danger");
      })
    }
    handleClickOutside = (ev) => {
        if(this.detectClickOutside){

            if(!this.detectClickOutside.current.contains(ev.target)){
                this.setSeenState();
                this.props.hideNotifications();
            }
        }
    }
    render() {
        return (
            <div ref={this.detectClickOutside} className="notifications">
                <ul className="list-group">
                    {
                      (!this.state.data || this.state.data.length === 0) && (
                        <span>No notifications</span>
                      )
                    }
                    {this.state.data && this.state.data.length > 0 && this.state.data.map((notify) => {
                        let decisionSeen = notify.seen === 0 ? 'unseen' : 'seen';
                        return <li className={`list-group-item ${decisionSeen}`}>
                            <div className="notify">
                                <div className="thumbnail">
                                    <span className={`${notify.iconclasses}`}></span>
                                </div>
                                <div className="content">
                                    <h4 className="title">{notify.title}</h4>
                                    <span className="time">{new Date(notify.time).toLocaleString("vi")}</span>
                                </div>
                            </div>
                        </li>


                    })}
                </ul>
            </div>

        )
    }
}

export default NotificationList
