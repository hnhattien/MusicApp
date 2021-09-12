import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export class MusicTemplate extends Component {
    constructor(props) {
        super(props);
    }
    playMusicFromUrlHandle = (ev)=>{
        
      
        
        
      
        this.props.requestPlayMusicFromSlug(ev.target.dataset.musicSlug);
        
        
    }
    render() {
        
      
        let musicSet = new Set(this.props.musics.map(JSON.stringify));    //Comvert objects to string to Set work
        let musicArray = Array.from(musicSet).map(JSON.parse) //Remove duplicated datas //Remove duplicated datas
        if(this.props.isHome === true){
            if (musicArray.length > 0) {
                return <ul className="list-group bg-dark"> {musicArray.map((music, index) => {
                    return <li className="list-group-item bg-dark border-0 list-group-item-dark" key={index}>
    
                        <div className="music">
                            <div className="top-info-wrap">
                                <div className="top-info">
                                    <div className="thumbnail-wrap">
                                       
    
    
                                        <img className="img-fluid rounded w-50 music-thumbnail" src={`/upload/musics/thumbnails/${music.thumbnail}`} />
    
                                        <div className="overlay">
                                            <span onClick={this.playMusicFromUrlHandle} data-music-slug={music.music_slug}  className="play-music-icon-overlay play-music" ><i data-music-slug={music.music_slug} className="fas fa-play-circle"></i></span>
                                        </div>
                                    </div>
                                    <div className="action-on-music-wrap position-absolute">
                                        <ul className="list-inline">
                                            <li className="list-inline-item me-4">
                                                <span role="button"><i className="fas fa-play"></i></span>
                                            </li>
                                            <li className="list-inline-item me-4">
                                                <span role="button"><i className="far fa-heart"></i></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
    
    
                            </div>
    
                            <div className="bottom-info">
                                <h5 className="card-title mt-2 text-white">
                                    <NavLink to={`/song/${music.music_slug}`} exact={true} className="text-white">
                                        {music.title}
                                    </NavLink>
    
                                </h5>
                                <h6 className="card-title">
                                {music.artist_slug && <NavLink to={`/artist/${music.artist_slug}`} exact={true} className="text-muted text-secondary">
                                            {music.artist_name}
                                </NavLink> || <span className="artist-no-link">{music.artist_name}</span>}
    
                                </h6>
                            </div>
                        </div>
                    </li>
    
    
                })}
                </ul>
            }else{
                return "";
            }
        }
        else{
            if(typeof this.props.searchValue === typeof "l" && this.props.searchValue.length === 0){
                return <h1>Content when seach Input empty</h1>;
            }
            else if (musicArray.length > 0) {
                return <ul className="list-group bg-dark"> {musicArray.map((music, index) => {
                    return <li className="list-group-item bg-dark border-0 list-group-item-dark" key={index}>
    
                        <div className="music">
                            <div className="top-info-wrap">
                                <div className="top-info">
                                    <div className="thumbnail-wrap">
                                       
    
    
                                        <img className="img-fluid rounded w-50 music-thumbnail" src={`/upload/musics/thumbnails/${music.thumbnail}`} />
    
                                        <div className="overlay">
                                            <span onClick={this.playMusicFromUrlHandle} data-music-slug={music.music_slug}  className="play-music-icon-overlay play-music" ><i data-music-slug={music.music_slug} className="fas fa-play-circle"></i></span>
                                        </div>
                                    </div>
                                    <div className="action-on-music-wrap position-absolute">
                                        <ul className="list-inline">
                                            <li className="list-inline-item me-4">
                                                <span role="button"><i className="fas fa-play"></i></span>
                                            </li>
                                            <li className="list-inline-item me-4">
                                                <span role="button"><i className="far fa-heart"></i></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
    
    
                            </div>
    
                            <div className="bottom-info">
                                <h5 className="card-title mt-2 text-white">
                                    <NavLink to={`/song/${music.music_slug}`} exact={true} className="text-white">
                                        {music.title}
                                    </NavLink>
    
                                </h5>
                                <h6 className="card-title">
                                {music.artist_slug && <NavLink to={`/artist/${music.artist_slug}`} exact={true} className="text-muted text-secondary">
                                            {music.artist_name}
                                </NavLink> || <span className="artist-no-link">{music.artist_name}</span>}
    
                                </h6>
                            </div>
                        </div>
                    </li>
    
    
                })}
                </ul>
            }
            else{
                return <ul>No data</ul>
            }
        }
    }
}