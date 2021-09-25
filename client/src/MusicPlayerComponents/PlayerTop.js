import React, { Component } from 'react';
import CurrentPlaylistTemplate from './CurrentPlaylistTemplate';
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
                    <div className="player-info-wrap text-center">
                        <h6 className="text-white song-name text-center">{currentMusic && music.title}</h6>
                        
                        <span className="text-white artist-name d-block">{currentMusic && music.artist_name}</span>
                    </div>
                </div>
                <CurrentPlaylistTemplate {...this.props} playlist={this.props.getPlaylist()}></CurrentPlaylistTemplate>
            </div>
        )
    }
}