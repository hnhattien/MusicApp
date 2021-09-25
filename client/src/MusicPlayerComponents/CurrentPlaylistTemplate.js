import React, { Component } from 'react'
import MusicTextList from '../ContentComponents/MusicTextList';
import './currentplaylist.css'
export class CurrentPlaylistTemplate extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let displayClasses = this.props.isShowCurrentPlaylist ? `is-show` : ``;
        let currentMusic = this.props.getCurrentMusic();
        return (
            <div className={` ${displayClasses} px-2 current-playlist-wrap position-absolute top-0`}>
                <div className="current-music-wrap mb-4 mt-2">
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Playling</small>
                     <div className="me-2 mb-2">
                      <span role="button" className="text-muted" onClick={this.props.toggleCurrentPlaylist}><i class="fas fa-chevron-down"></i></span>
                      </div>
                    </div>
                    <div className="current-music-wrap d-flex justify-content-between">
                        <div className="d-flex">
                            <div className="me-2">
                                <img className="current-music-icon img rounded" src={`/upload/musics/thumbnails/${currentMusic.music_thumbnail}`}>
                                </img>
                            </div>
                            <div className="d-flex flex-column">
                                <span className="music-title">{currentMusic.title}</span>
                                <span className="artist-name text-muted">{currentMusic.artist_name}</span>
                            </div>
                            
                        </div>
                        <span className="text-muted text-center views"><i class="fas fa-headphones"></i>{currentMusic.viewcount}</span>
                    </div>
                </div>
                <div className="next-musics-wrap">
                    <ul className="list-group bg-dark next-musics-list">
                        <legend className="text-muted small">Next</legend>
                         <MusicTextList {...this.props} playlist={this.props.getPlaylist()}>

                         </MusicTextList>
                    </ul>
                </div>

            </div>
        )
    }
}

export default CurrentPlaylistTemplate
