import React, { Component } from 'react'
import AvatarCustomizeToolList from './AvatarCustomizeToolList';
import './settingprofile.css';
import $ from 'jquery';
import 'croppie/croppie.css'
import * as Croppie from  'croppie'
import {withRouter} from 'react-router-dom';
export class AvatarCustomizePopup extends Component {
    constructor(props){
        super(props);
        this.currentEditImage = React.createRef();
        this.state = {
            croppieOb : null
        }
    }
    componentDidMount = () => {
        if(this.currentEditImage){
            let imagewrap = $(".image-box")[0]
            let image = $(this.currentEditImage.current);
            let options = {
                viewport: {
                    width: 250,
                    height: 250,type:"circle"
                },
                boundary: {
                    width: 250,
                    height: 250
                },
          
                enableOrientation: true,
                enableExif: true,
                enableResize: true,
                mouseWheelZoom: true
            }
            this.setState({croppieOb: new Croppie(image[0],options)}, ()=>{
                $('.my-croppie').on('update.croppie', (ev, cropData) => {
                    
                });
            })
            
          
            
            
        }
    }
    saveEdit = () => {
        this.props.toggleLoading(true,{x:"50%",y:"50%"});
        if(this.state.croppieOb){
           
            this.state.croppieOb.result({format: "jpg", type: "base64"}).then(data=>{
                console.log(data);
                fetch('/users/uploadavatar',{
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        filename: `${new Date().valueOf()}${Math.random()*(100000-100)+1}.jpg`,
                        base64Image: data
                    })
                }).then(res=>{
                    return res.json();
                }).then(dataRes=>{
                    console.log(dataRes);
                    console.log(dataRes);
                    if(dataRes.error){
                      this.props.showMessage(true,String(dataRes.error.message),"danger",{x:"40%",y:"60%"});  
                    }
                    else{
                        this.props.showMessage(true,String(dataRes.message),"success",{x:"40%",y:"60%"});  
                    }
                }).catch(err=>{
                    this.props.showMessage(true,String(err),"danger");  
                }).then(()=>{
                    this.props.toggleLoading(false);
                    this.props.toggleAvatarCustomizePopup(false);
                    this.props.toggleAvatarCustomizeMenu();
                    this.props.updateUserChanges();
                    this.props.history.push("/profile/setting");
                    
                })
            })
        }
    }
    // zoomIn = () => {
       
    // }
    // zoomOut = () => {

    // }
    // rotateLeft = () => {

    // }
    // rotateRight = () => {

    // }
    toggleAvatarCustomizePopup = () => {
        this.setState({isShowedAvatarCustomizePopup: isShow});    
    }
    render() {
        return (
            <div className={'popup-wrapper bg-dark w-75 border'}>
                <div className="text-white customize-avatar-popup-title">
                    <h1 className="text-white">Change avatar</h1>
                </div>
                <div className="popup-inner bg-dark mt-5">
                    <div className="setting-avatar-placeholder-wrap m-auto image-box">
                       <img onError={(ev)=>{ev.target.onerror=null; ev.target.src="/upload/images/defaultavatar.png"}} style={{display: "none"}} ref={this.currentEditImage} className={`setting-avatar-placeholder user-avatar-image image w-100 h-100`} src={this.props.targetAvatar}></img>
                       {/* <div className="setting-avatar-crop-scope">

                       </div> */}
                    </div>
                    <div className="save-btn-wrap">
                        <button onClick={this.props.toggleAvatarCustomizePopup} className="btn btn-light me-2">
Cancel
                        </button>
                        <button onClick={this.saveEdit} className="btn btn-light">
                            Change avatar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AvatarCustomizePopup);
