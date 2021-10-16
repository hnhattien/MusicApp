import React, { Component } from 'react'
import { withRouter } from 'react-router';
import {PROXY_PATH} from '../config';


export class ExtraOptionButton extends Component {
    constructor(props){
        super(props);
        this.detectClickOutside = React.createRef();
        this.state = {
            isShowMenu: false
        }
    }
    toggleOptionMenu = (ev) => {
        this.setState({
            isShowMenu: !this.state.isShowMenu
        })
    }
    componentDidMount = () => {
        document.addEventListener("mousedown",this.handleClickOutside);
    }

    componentWillUnmount = () => {
        document.removeEventListener("mousedown",this.handleClickOutside);
    }

    handleClickOutside = (ev) => {
        if(this.detectClickOutside && this.detectClickOutside.current){
            
            if(!this.detectClickOutside.current.contains(ev.target)){
                
                this.setState({
                    isShowMenu: false
                })
            }
        }
    }
    goToSong = (ev) => {
       this.props.history.push(`/song/${this.props.getCurrentMusic().music_slug}`);
    }
    copyCurrentSongLink = (ev) => {
      let value = `${window.location.host}/song/${this.props.getCurrentMusic().music_slug}`;
      navigator.clipboard.writeText(value).then(()=>{
        this.props.showMessage(true,"Copied","success");
      }).catch((err)=>{
        this.props.showMessage(true,String(err),"danger");
      }).then(()=>{
        this.setState({isShowMenu: false});
      
        // setTimeout(()=>{
        //     this.props.showMessage(false,);
        // },4000)
      })
      
    }
    downloadSong = async (fileName) => {
        let a = document.createElement("a");
          let audioUrl = `${PROXY_PATH}upload/musics/audio/${this.props.getCurrentMusic().audio}`;
          let blob = await fetch(audioUrl).then((res)=>{
              return res.blob();
          })
          let fileReader = new FileReader();
          fileReader.readAsDataURL(blob);
          fileReader.onload = (ev) => {
            a.href = ev.target.result;
            a.download = fileName+"SE447-Music-App.mp3";
            a.click();
          }
    }
    render() {
        return (
            <div className="menu-control-wrap action-on-music-wrap">
                <style>
                        {`
                        .option-menu li{
                            background-color: #212A35 !important;
                        }
                        .option-menu{
                            z-index: 4000;
                        }
                        
                        .action-on-music-wrap{
                            width: 100%;
                            height: 100%;
                        }
                        `}
                    </style>
                {this.state.isShowMenu &&
                <ul ref={this.detectClickOutside} style={{transform: `translate(10px,-30px)`}} className="list-group option-menu bg-dark position-absolute bottom-0">
                    
                    <li className="list-group-item">
                        <span onClick={this.goToSong} role="button">Go to song</span>
                    </li>
                    <li className="list-group-item">
                        <span onClick={this.copyCurrentSongLink} role="button">Copy link</span>
                    </li>
                    <li className="list-group-item ">
                        <span onClick={(ev) => {this.downloadSong(this.props.getCurrentMusic().title)}} role="button">Download this song</span>
                    </li>
                </ul>
                }
                <span onClick={this.toggleOptionMenu} className="text-white menu-btn" role="button" >
                    <i class="fas fa-ellipsis-v"></i>
                </span>
               
               
            </div>
        )
    }
}

export default withRouter(ExtraOptionButton) ;    
