import React, { Component } from 'react';

import { PlayerBottom } from './PlayerBottom';
import './musicplayer.css';
import { PlayerTop } from './PlayerTop';
import styled from 'styled-components';
const MusicPlayerStyle = styled.div`
.setting-menu-wrap{
    z-index: 1000;
    background-color: rgb(33, 37, 41) !important;
}
.setting-menu-wrap ul{
    width: 200px;
    height: fit-content
}
.setting-menu-wrap ul li{
    background-color: rgb(33, 37, 41,0.2) !important;
}
.profile-link-wrap{
    padding-right: 10px;
}
.profile-link-wrap:hover{
    
    background-color: rgba(10, 10, 10, 0.1);

}
.avatar-thumbnail-wrap{
    position: relative;
    right: 10px;
    bottom: 2px;
}

.avatar-thumbnail{
    width: 20px;
    height: 20px;
}

.upload-link{
    font-size: 2rem;
    
    margin: auto;
}

.upload-link-wrap{
    position: fixed;
    bottom: 10px;
    width: 100%;
    text-align: left;
    margin-left: 10px;
}

.all-tool-wrap{
    position: relative;
}

`
export class PlayerTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCurrentPlaylist: false
        }
    }
    toggleCurrentPlaylist = (ev) => {
        if(this.state.isShowCurrentPlaylist){
            this.setState({
                isShowCurrentPlaylist: false
            })
        }
        else{
            this.setState({
                isShowCurrentPlaylist: true
            })
        }
    }
    render() {
        let currentMusic = this.props.getCurrentMusic();
        return (
            currentMusic ? <React.Fragment>                
                    <div  style={{ backgroundImage: `url("/upload/musics/thumbnails/${currentMusic.music_thumbnail}")` }} className="player-background">
                    </div>
                    <div className={`player d-flex position-absolute w-100 flex-column justify-content-between h-100`}>
                        <PlayerTop toggleCurrentPlaylist={this.toggleCurrentPlaylist} {...this.props} playlist={this.props.getPlaylist()} isShowCurrentPlaylist={this.state.isShowCurrentPlaylist} isPlay={this.props.isPlay} currentMusic={currentMusic}>

                        </PlayerTop>

                        <PlayerBottom isHearted={currentMusic.liked} {...this.props} toggleCurrentPlaylist={this.toggleCurrentPlaylist} {...this.props}>

                        </PlayerBottom>
                    </div>
                
            </React.Fragment> : ""
        )

    }

}