import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './musicinfo.css';
export class MusicInfoTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            error: null,
            getDataInterval : null
        }
    }
    // isEmptyResponse = (data)=>{
    //     if(typeof data === typeof {}){
            
    //         if(Object.keys(data).filter(key=>data[key].length !== 0).length !== 0){ // if have one or more not empty
    //             return false;
    //         }
    //         return true;
    //     }
    // }  
    initialGetDataInterval = () => {
        return setTimeout(()=>{
            console.log("Hi") ;
            this.getInfoMusic();
            if(this.state.data !== null){
                clearInterval(this.state.getDataInterval)
            }
        },100);
    }
    componentDidMount(){
        if(this.state.getDataInterval === null){
            this.setState({
                getDataInterval : this.initialGetDataInterval()
            })
        }
    }
    getInfoMusic = ()=>{
        this.props.toggleLoading(true);
        let slug = this.props.musicSlug;
        console.log(this.props);
        fetch(`${slug}`).then((res)=>{
            return res.json();
        }).then(dataRes=>{
            console.log(dataRes);
           if(dataRes.error){
               this.setState({
                   error: dataRes.error.message
               })
           } 
           else{
               //Response is object
             this.setState({data: dataRes});    
           }
        }).catch(err=>{
           this.setState({error: err});            
        }).then(()=>{
            this.props.toggleLoading(false);
        })
    }
    render(){
        if(this.state.error){
            return <h1>{this.state.error.message}</h1>;
        }
        else if(this.state.data){
            
                let music = this.state.data;
                return <div className="music-info-wrap container-fluid">
                    
                    <div className="row">
                        <div className="col-12 music-top-info d-flex">
                            <div className="music-thumbnail-wrap me-4">
                                <img className=' info-music-thumbnail rounded img-fluid' src={`/upload/musics/thumbnails/${music.music_thumbnail}`}></img>
                            </div>
                            <div className="music-info-wrap">
                                <div className="music-title">
                                   <span className="text-muted me-2">Song name: </span>
                                   <NavLink className="text-white fw-bold" to={this.props.musicSlug}>
                                       {music.title}
                                   </NavLink>
                                </div>
                                <div className="artist-name">
                                    {music.artist_id && <div><NavLink to={`/artist/${music.artist_slug}`}><img onError={(ev)=>{ev.target.error = null; ev.target.src=""}} src={`/upload/artist/thumbnails/${music.artist_thumbnail}`}></img><span>{music.artist_name}</span></NavLink></div>}
                                    {!music.artist_id && <div><img src={`/upload/artist/thumbnails/${music.artist_thumbnail}`}></img><span>{music.artist_name}</span></div>}
                                </div>
                                <div className="view-count upload-time mt-2">
                                    <span className="me-5">
                                        {music.viewcount} views
                                    </span>
                                    <span>
                                        {new Date(music.upload_time).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                    </div>
                </div>
            
        }
        else{
            return "";
        }
    }
}

export default withRouter(MusicInfoTemplate);