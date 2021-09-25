import React, { Component } from 'react'
import './musictextlist.css';
export class MusicTextList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let playlist = this.props.getPlaylist();
        return (
            playlist && playlist.map((music)=>{
                return <li role="button" onClick={(ev)=>{this.props.requestPlayMusicFromSlug(ev.currentTarget.dataset.musicSlug);}} data-music-slug={`${music.music_slug}`} className="list-group-item music-list-item bg-dark py-2 d-flex justify-content-between">
                    <div className="music-info-wrap">
                        <div className="music-title-wrap">
                            <h4 className="music-title">{music.title}</h4>
                        </div>
                        <div className="artist-name-wrap">
                            <h6 className="artist-name text-muted">{music.artist_name}</h6>
                        </div>
                    </div>
                    <span className="text-muted views">
                    <i class="fas fa-headphones"></i> {music.viewcount}
                    </span>
                </li>
            })
        )
    }
}

export default MusicTextList
