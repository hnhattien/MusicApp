import React, { Component } from 'react';

import { PlayerBottom } from './PlayerBottom';
import './musicplayer.css';
import { PlayerTop } from './PlayerTop';
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

                        <PlayerBottom {...this.props} toggleCurrentPlaylist={this.toggleCurrentPlaylist} {...this.props}>

                        </PlayerBottom>
                        {/* {console.log("Music1",currentMusic,"Ref",this.audioRef,this.props.isPlay)} */}




                    </div>
                
            </React.Fragment> : ""
        )

    }

}