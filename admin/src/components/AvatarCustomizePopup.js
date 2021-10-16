import React, { Component } from 'react'

import './avatarcustomize.css';
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
                    height: 250,type:"square"
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
    saveEdit = (rowData) => {
        this.props.toggleLoading(true,{x:"50%",y:"50%"});
        if(this.state.croppieOb){

            this.state.croppieOb.result({format: "jpg", type: "base64"}).then(data=>{
                let urlRequest = '';
                let bodyKeys = [];
                if(this.props.isArtistEdited){
                  urlRequest = '/admin/changeartistthumbnail';
                  bodyKeys[0] = 'artistid';
                  bodyKeys[1] = 'artistname';
                }
                else if(this.props.isAlbumEdited){
                  urlRequest = '/admin/changealbumthumbnail';
                  bodyKeys[0] = 'albumid';
                  bodyKeys[1] = 'albumname';
                }
                else if(this.props.isSongEdited){
                  urlRequest = '/admin/changesongthumbnail';
                  bodyKeys[0] = 'songid';
                  bodyKeys[1] = 'songname';
                }
                else if(this.props.isCategoryEdited){
                  urlRequest = '/admin/changecategorythumbnail';
                  bodyKeys[0] = 'categoryid';
                  bodyKeys[1] = 'categoryname';
                }
                fetch(urlRequest,{
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        filename: `${new Date().valueOf()}${Math.random()*(100000-100)+1}.jpg`,
                        base64Image: data,
                        [bodyKeys[0]]: rowData.id,
                        [bodyKeys[1]]: rowData.title
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
                    this.props.toggleAvatarCustomizePopup();
                    this.props.reGetData();

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
                        <button onClick={(ev) => {this.saveEdit(this.props.rowData)}} className="btn btn-light">
                            Change avatar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AvatarCustomizePopup);
