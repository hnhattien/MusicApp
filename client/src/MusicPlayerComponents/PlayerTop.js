import React, { Component } from 'react';

export class PlayerTop extends Component {
    constructor(props){
        super(props);
    };

    render(){
        
        let music =this.props.currentMusic;
        
        let spinnerClass = this.props.isPlay && 'running' || 'pause';
        return(
            <div className="top-player-wrap">
                <div className="top-player">
                    <div className="player-thumbnail-wrap text-center mt-5">
                        <img className={`img-fluid player-thumbnail rounded rounded-circle w-75 ${spinnerClass}`} src={`/upload/musics/thumbnails/${this.props.currentMusic && this.props.currentMusic.thumbnail}`}>
                        </img>
                    </div>
                    <div className="player-info-wrap mt-5 me-4">
                        <h6 className="text-white song-name text-end">{this.props.currentMusic && music.title}</h6>
                        
                        <span className="text-white artist-name d-block text-end">{this.props.currentMusic && music.artist_name}</span>
                    </div>
                </div>
            </div>
        )
    }
}