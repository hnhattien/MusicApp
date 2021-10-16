import React, { Component } from 'react'
import { withRouter } from 'react-router';
export class ActionOnMusicTemplate extends Component {
    constructor(props){
        super(props);
        this.toggleHeartRef = React.createRef();
       
    }
    handleHeartAction = (ev) => {
        let songid = ev.target.dataset.id;
        
        if(localStorage.getItem("userid") === null){
           this.props.history.push("/login");
        }
        else{    
           ev.currentTarget.querySelector("i").classList.toggle("far");
           ev.currentTarget.querySelector("i").classList.toggle("fas")
           fetch("/song/heartaction", {
               method: "POST",
               headers: {
                   "Accept": "application/json",
                   "Content-Type": "application/json"
               },
               body: JSON.stringify(
                   {
                       songid: songid
                   }
               )
           }).then(res=>{
               return res.json();
           }).then(dataRes => {
             

             if(dataRes.isRequireLogin){
                this.props.history.push("/login");
             }
             if(dataRes.error){
                
                this.props.showMessage(true,String(dataRes.error.message),"danger",{x:"40%",y:"60%"});  
             }
             else{                                                
                this.props.updateHeartChanges(dataRes['music']);
                this.props.showMessage(true, "Liked", "secondary");
             }
           }).catch(err=>{
            
                this.props.showMessage(true,String(err),"danger",{x:"40%",y:"60%"});  
           })
        //    .then(()=>{
        //        setTimeout(()=>{
        //            this.props.showMessage(false);
        //        },4000);
        //    })
        }
    }
    render() {
        let heartbtnClasses = (this.props.isHearted) ? "fas" : 'far';
        return (
            <div className="action-on-music-wrap">
                {/* <ul className="list-inline"> */}
                                    {/* <li className="list-inline-item me-4">
                                                <span role="button"><i className="fas fa-play"></i></span>
                                            </li> */}
                    {/* <li className="list-inline-item me-4"> */}
                        <span ref={this.toggleHeartRef} data-id={this.props.music.id} onClick={this.handleHeartAction} role="button"><i data-id={this.props.music.id} className={`fa-heart ${heartbtnClasses}`}></i></span>
                    {/* </li> */}
                {/* </ul> */}
            </div>
        )
    }
}

export default withRouter(ActionOnMusicTemplate)
