import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import ActionOnMusicTemplate from './ActionOnMusicTemplate';
export class MusicCardItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isHearted : ((props.music.liked) ? true : false)
        }
    }
    // componentDidMount = () => {
    //     let isHeart = this.props.music.liked ? true : false;
    //     this.setState({isHearted: isHeart})
    // }
    playMusicFromUrlHandle = (ev)=>{
        this.props.requestPlayMusicFromSlug(ev.target.dataset.musicSlug);
    }
    handleHeartAction = (ev) => {
        let songid = ev.target.dataset.id;
        
        
        if(localStorage.getItem("userid") === null){
           this.props.history.push("/login");
        }
        else{
           
           fetch("/song/heartaction", {
               method: "POST",
               headers: {
                   "Accept": "application/json",
                   "Content-Type": "application/json"
               },
               body: JSON.stringify(
                   {
                       songid: songid
                   }
               )
           }).then(res=>{
               return res.json();
           }).then(dataRes => {
             

             if(dataRes.isRequireLogin){
                this.props.history.push("/login");
             }
             if(dataRes.error){
                
                this.props.showMessage(true,String(dataRes.error.message),"danger",{x:"40%",y:"60%"});  
             }
             else{
                this.setState({isHearted: !this.state.isHearted},()=>{
                    this.props.fetchHomeData();
                });
                this.props.showMessage(true,String(dataRes.message),"secondary",{x:"40%",y:"60%"});
                
             }
           }).catch(err=>{
            
                this.props.showMessage(true,String(err),"danger",{x:"40%",y:"60%"});  
           }).then(()=>{
               setTimeout(()=>{
                   this.props.showMessage(false);
               },600);
           })
        }
    }
    render() {
        
        return (
            <React.Fragment>
                <div className="music">
                    <div className="top-info-wrap">
                        <div className="top-info">
                            <div className="thumbnail-wrap">

                         
                                <img onError={(ev)=>{ev.target.onerror=null; ev.target.src="/upload/musics/thumbnails/default.png"}} className="img-fluid rounded music-thumbnail" src={`/upload/musics/thumbnails/${this.props.music.thumbnail}`} />
                                

                                <div className="overlay">
                                    <span onClick={this.playMusicFromUrlHandle} data-music-slug={this.props.music.music_slug} className="play-music-icon-overlay play-music" ><i data-music-slug={this.props.music.music_slug} className="fas fa-play-circle"></i></span>
                                </div>
                            </div>
                           {!this.props.isInlineList && <ActionOnMusicTemplate  handleHeartAction={this.handleHeartAction} isHearted={this.state.isHearted} {...this.props}></ActionOnMusicTemplate>}
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
