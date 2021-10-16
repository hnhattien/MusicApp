import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './musicinfo.css';
import {PROXY_PATH} from '../config';
export class MusicInfoTemplate extends Component {
    constructor(props){
        super(props);
        this.lyricsInputRef = React.createRef();
        this.state = {
            music: null,
            error: null,
            getDataInterval : null,
            lyrics : "",
            oldLyrics: "",
            isEditLyrics: false
        }
    }


    initialGetDataInterval = () => {
        return setTimeout(()=>{
            this.getInfoMusic();
            if(this.state.music !== null){
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
    componentWillMount = () => {
        this.unListen = this.props.history.listen((location, action)=> {
            setTimeout(()=>{
                this.getInfoMusic()
            },100)
        })
    }

    componentWillUnmount = () => {
       this.unListen();
       clearInterval(this.state.getDataInterval);
       this.setState({
           getDataInterval: null
       })
    }
    getInfoMusic = ()=>{
        this.props.toggleLoading(true);
        let slug = this.props.musicSlug;
        fetch(`${slug}`).then((res)=>{
            return res.json();
        }).then(dataRes=>{
          console.log(dataRes,"skldaksd;ksa;d;sad;ls;lda;l");
           if(dataRes.error){
               this.setState({
                   error: dataRes.error.message
               })
           }
           else{
               //Response is object
             this.setState({music: dataRes});
           }
        }).catch(err=>{
           this.setState({error: err});
        }).then(()=>{
            this.props.toggleLoading(false);
        })
    }
    showEditLyrics = (ev) => {

       if(!this.state.isEditLyrics){


            this.setState({
                isEditLyrics: true,
                oldLyrics: this.lyricsInputRef.current.textContent
            },()=>{
                if(this.lyricsInputRef){
                    this.lyricsInputRef.current.focus();
                    let range = new Range();

                    let selection = window.getSelection();
                    if(this.lyricsInputRef.current.firstChild){
                        range.setStart(this.lyricsInputRef.current.firstChild,this.lyricsInputRef.current.textContent.length);
                        range.setEnd(this.lyricsInputRef.current.firstChild,this.lyricsInputRef.current.textContent.length);
                        selection.removeAllRanges();
                        selection.addRange(range)
                    }
                    this.lyricsInputRef.current.classList.add("form-control");

                }
            })
       }
       else{
           //Save Lyrics
         if(this.lyricsInputRef){

            this.props.toggleLoading(true);
            fetch('/song/updatelyrics',{
                method: "POST",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    lyrics: this.lyricsInputRef.current.textContent,
                    songId: this.state.music.id
                })
            }).then(res=>{
                return res.json();
            }).then((dataRes)=>{
               if(dataRes.isRequiredLogin){
                this.props.showMessage(true, String(dataRes.error.message), "danger");
                this.props.history.push("/login");
               }
               if(dataRes.error){
                   this.props.showMessage(true, String(dataRes.error.message), "danger");
               }
               else{
                    this.lyricsInputRef.current.classList.remove("form-control");
                    this.setState({
                        isEditLyrics: false
                    })
                    this.props.showMessage(true,dataRes.message,"success")
               }
            }).catch(err=>{
                console.log(err);
            }).then(()=>{
                this.props.toggleLoading(false);
                // setTimeout(()=>{
                //     this.props.showMessage(false);
                // },4000);
            })
         }

       }
    }
    copyHandle = (ev) => {
        if(this.lyricsInputRef){
            let selection = document.getSelection();
            let range = new Range();
            range.selectNode(this.lyricsInputRef.current);
            selection.selectAllChildren(this.lyricsInputRef.current)
            document.execCommand("copy");
            this.props.showMessage(true,"Copied","success");

        }

    }
    hideEditLyrics = (ev) => {
        this.setState({
            isEditLyrics: false
        },()=>{
            this.lyricsInputRef.current.classList.remove("form-control");
            this.lyricsInputRef.current.textContent=this.state.oldLyrics;
        })
    }
    downloadSong = async (fileName) => {

          let a = document.createElement("a");
          let audioUrl = `${PROXY_PATH}upload/musics/audio/${this.state.music.audio}`;
          let blob = await fetch(audioUrl).then((res)=>{
              return res.blob();
          })
          let fileReader = new FileReader();
          fileReader.readAsDataURL(blob);
          fileReader.onload = (ev) => {
            a.href = ev.target.result;
            a.download = fileName+"SE447-Music-App.mp3";
            a.click();
          }


    }
    render(){
        console.log(this.props.getPlaylist())
        if(this.state.error){
            return <h1>{this.state.error.message}</h1>;
        }
        else if(this.state.music && Object.keys(this.state.music).length === 0 ){
          return <h1>Not Found Music</h1>
        }
        else if(this.state.music){

                let music = this.state.music;
                return <div className="music-info-wrap container-fluid">

                    <div className="row">
                        <div className="col-12 music-top-info d-flex">
                            <div className="music-thumbnail-wrap me-4 position-relative">
                                <img onError={(ev)=>{ev.target.error = null; ev.target.src="/upload/musics/thumbnails/default.png"}} className=' info-music-thumbnail rounded img-fluid' src={`/upload/musics/thumbnails/${music.music_thumbnail}`}></img>
                                <div className="overlay position-absolute top-0">
                                <span onClick={(ev)=>{this.props.requestPlayMusicFromSlug(music.music_slug);}} data-music-slug={music.music_slug} className="play-music-icon-overlay play-music" ><i data-music-slug={music.music_slug} className="fas fa-play-circle"></i></span>

                                </div>

                            </div>

                            <div className="music-info-wrap">
                                <div className="info-music-title">
                                   <span className="text-muted me-2">Song name: </span>
                                   <NavLink className="text-white fw-bold" to={this.props.musicSlug}>
                                       {music.title}
                                   </NavLink>
                                </div>
                                <div className="info-artist-name">
                                    {music.artist_id && <div title={music.artist_name}><NavLink to={`/artist/${music.artist_slug}`}><img className="artist-img-thumbnail" onError={(ev)=>{ev.target.src="/upload/images/defaultartist.jpg"; ev.target.onerror = null; }} src={`/upload/musics/thumbnails/${music.artist_thumbnail}`}></img><span>{music.artist_name}</span></NavLink></div>}
                                    {!music.artist_id && <div title={music.artist_name}><img className="artist-img-thumbnail" onError={(ev)=>{ev.target.src="/upload/images/defaultartist.jpg"; ev.target.onerror = null; }} src={`/upload/artist/thumbnails/${music.artist_thumbnail}`}></img><span>{music.artist_name}</span></div>}
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
                    <button onClick={(ev) => {this.downloadSong(music.title)}} className="btn donwload-btn btn-light ms-2">Download this song</button>
                    <div className="row mt-5">
                        <div className="col-12 lyrics-wrap">
                            <div className="lyrics-header justify-content-between d-flex">
                                <div className="lyrics-info">
                                    <h1 className="h4">Lyrics</h1>
                                    <span>Edited by {music.editLyricBy ? music.editLyricBy : "Unknown" }</span>
                                </div>
                                <div className="lyrics-tool my-auto me-5">
                                    <button onClick={this.copyHandle} className="btn btn-dark mx-2"><i class="far fa-clone"></i><span className="ms-2">Copy</span></button>
                                    <button onClick={this.showEditLyrics} className="btn btn-dark mx-2"><i class="fas fa-pencil-alt"></i><span className="ms-2">Edit</span></button>
                                </div>
                            </div>

                            <div ref={this.lyricsInputRef} className="lyrics text-white" contentEditable={this.state.isEditLyrics ? true: false}>
                                {music.lyrics && String(music.lyrics).trim().replace(/\'/g," ")}
                            </div>
                            <div>
                            {this.state.isEditLyrics && <button className="btn btn-light m-2" onClick={this.hideEditLyrics}>Cancel</button>}
                            {(!music.lyrics && <button className="btn btn-light m-2" onClick={this.showEditLyrics}>Add lyrics</button>) || (this.state.isEditLyrics && <button className="btn btn-light m-2" onClick={this.showEditLyrics}>Add lyrics</button>)}

                            </div>
                        </div>
                    </div>
                </div>

        }
        else{
            return "";
        }
    }
}

export default withRouter(MusicInfoTemplate);
