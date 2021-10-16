import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';

export class MusicCardItem extends Component {
    constructor(props){
        super(props);
    }
    // componentDidMount = () => {
    //     let isHeart = this.props.music.liked ? true : false;
    //     this.setState({isHearted: isHeart})
    // }
  
   
    render() {
        
        return (
            <React.Fragment>
                <div className="music">
                    <div className="top-info-wrap">
                        <div className="top-info">
                            <div className="thumbnail-wrap">

                         
                                <img onError={(ev)=>{ev.target.onerror=null; ev.target.src="/upload/musics/thumbnails/default.png"}} className="img-fluid rounded music-thumbnail" src={`/upload/musics/thumbnails/${this.props.music.music_thumbnail}`} />
                                

                                <div className="overlay">

                                <span 
            onClick={(ev)=>{this.props.requestPlayMusicFromSlug(this.props.music.music_slug)}} 
            data-music-slug={this.props.music.music_slug} className="play-music-icon-overlay play-music" ><i data-music-slug={this.props.music.music_slug} className="fas fa-play-circle"></i></span>
                                
                                </div>
                            </div>
                           
                        </div>


                    </div>
                    <div className="bottom-info">
                        <h5 className="card-title mt-2 text-white">
                            <NavLink to={`/song/${this.props.music.music_slug}`} exact={true} className="text-white">
                                {this.props.music.title}
                            </NavLink>

                        </h5>
                        <h6 className="card-title">
                            {this.props.music.artist_id && <NavLink to={`/artist/${this.props.music.artist_slug}`} exact={true} className="text-muted text-secondary">
                                {this.props.music.artist_name}
                            </NavLink> }
                            {!this.props.music.artist_id && <span className="artist-no-link">{this.props.music.artist_name}</span>}

                        </h6>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(MusicCardItem);
