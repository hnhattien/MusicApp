import React, { Component } from 'react';
import CurrentPlaylistTemplate from './CurrentPlaylistTemplate';
import {NavLink} from 'react-router-dom';
export class PlayerTop extends Component {
    constructor(props){
        super(props);
    };

    render(){
        let currentMusic = this.props.getCurrentMusic();
        let music = currentMusic;
        
        let spinnerClass = this.props.isPlay && 'running' || 'pause';
        return(
            <div className="top-player-wrap position-relative" style={{height:"70vh"}}>
                <div className="top-player">
                    <div className="player-thumbnail-wrap text-center mt-5">
                        <img className={`player-thumbnail rounded-circle ${spinnerClass}`} src={`/upload/musics/thumbnails/${currentMusic && currentMusic.music_thumbnail}`}>
                        </img>
                    </div>
                    <div className="player-info-wrap mt-5">
                        <h6 className="text-white song-name text-center"><NavLink to={`/song/${currentMusic.music_slug}`}>{currentMusic && music.title}</NavLink></h6>
                        
                        <h6 className="text-white text-center">{currentMusic && music.artist_name}</h6>
                    </div>
                </div>
                <CurrentPlaylistTemplate {...this.props} playlist={this.props.getPlaylist()}></CurrentPlaylistTemplate>
            </div>
        )
    }
}