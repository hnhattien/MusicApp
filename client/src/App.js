import logo from './logo.svg';
import React, { Component } from 'react';
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import {RightSideBar} from './RightSideBar';
import {LeftSideBar} from './LeftSideBar';
import { MainContent } from './MainContent';

export class App extends Component {
  constructor(props){
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      isLogin: window.localStorage.getItem("userid") !== null,
      sitemap : [],
      currentMusic : null,
      isLoging: false,
      isPlay: false,
      isLoop: false,
      isRandom: false,
      currentTime: 0,
      duration: 0,
      newestMusics: [],
      playlist: [],
    }
  }

  // componentWillMount = () => {
  //   fetch('/loginstatus').then(result=>{
  //     console.log(result);
  //       return result.json();
  //   }).then(data=>{
  //     console.log(data)
  //     if(data.user){
        
  //       this.setState({user: data.user});
  //     }
  //     else{
  //       this.setState({user: null});
  //     }
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // }
  
  setPlaylist = (data)=>{
    this.setState({playlist: data})
  }
  fetchNewestMusics = ()=>{
    fetch("/index").then(res=>{
        return res.json();
    }).then(data=>{
      if(data['musics'] && data['usermusics']){
        this.setState({
          newestMusics: [...data['musics'],...data['usermusics']]
        },()=>{
          this.setPlaylist([...data['musics'],...data['usermusics']]);
        })
      } 
    }) 
  }
  setCurrentMusic = (data)=>{
    this.setState({currentMusic: data,currentTime: 0},()=>{
      if(this.audioRef.current){
        this.audioRef.current.currentTime = 0;
      }
      this.playMusic();
    });
  }
  requestPlayMusicFromSlug = (slug)=>{
    console.log(slug);
    console.log(this.state.playlist)
    console.log(this.state.playlist.filter(music=>music['music_slug'] === slug))
    let targetMusic = this.state.playlist.filter(music=>music['music_slug'] === slug)[0];
    this.setCurrentMusic(targetMusic);
  }
  playMusic = ()=>{
    if(this.state.currentMusic){
      this.audioRef.current.src = `/upload/musics/audio/${this.state.currentMusic.audio}`;
      this.setPlayState();
      
    }
  }
setDuration = ()=>{
  
    if(this.audioRef.current){
      this.setState({duration: this.audioRef.current.duration});
     
    }  
 
  
}
  setPlayState = ()=>{
    this.setState({isPlay: true});
  }
  setPauseState = (ev)=>{
    this.setState({isPlay: false});
  }
  toggleLoop = (ev)=>{
    this.setState({isLoop: !this.state.isLoop});
  }
  toggleRandom = (ev)=>{
    this.setState({isRandom: !this.state.isRandom});
  }

  componentDidUpdate(){
    if(this.state.isPlay === true){
      if(this.audioRef.current){
         
         if(this.audioRef.current.paused){
          let playPromise = this.audioRef.current.play();

          if(playPromise !== undefined){
            playPromise.then(()=>{

            }).catch(err=>{
              console.log(err);
              
            });
          }
          
        }
        
        
      }
    }
    else{

      if(this.audioRef.current){
        if(!this.audioRef.current.paused){
          let pausePromise = this.audioRef.current.pause();
          if(pausePromise !== undefined){
            pausePromise.then(()=>{

            }).catch(err=>{
              console.log(err);
            });
          }
          
        }
        
      }
    }
  }
  
  

  peekHandle = (ev)=>{
    if(this.audioRef.current){
      this.audioRef.current.currentTime = ev.target.value;
    }
  }
  
  updateCurrentTime = (ev)=>{
    if(this.audioRef.current){
      this.setState({currentTime: this.audioRef.current.currentTime})
    }
    
  }
  resetCurrentTime = ()=>{
    this.setState({currentTime: 0});
  }

  
  setRandomSong = ()=>{
    let min = 0;
    let max = this.state.playlist.length;
    let random = Math.floor(Math.random()*(max-min+min))
    let music = this.state.playlist.at(random);
    this.setCurrentMusic(music);
  }
  forwardHandle = (ev) =>{
      if(this.state.currentTime < this.state.duration){
        if(this.audioRef.current){
          this.audioRef.current.currentTime = this.state.currentTime + 10;
        }
      }
      else{
        if(this.state.isRandom){
          this.setRandomSong();
        }
      }
    
    

  }
  backwardHandle = (ev) =>{

      if(this.state.currentTime > 0){
        if(this.audioRef.current){
          this.audioRef.current.currentTime = this.state.currentTime - 10;
        }
      }
      else{
        if(this.state.isRandom){
          this.setRandomSong();
        }
      }
  }
  endedHandle = ()=>{
    if(this.state.isLoop === true){
      this.audioRef.current.play();
    }
    else if(this.state.isRandom === true){
      this.setRandomSong();
      
    }
    else if(this.state.playlist.length !== 0){
      console.log(Object.keys(this.state.playlist[0]));
      console.log(Object.keys(this.state.currentMusic))
      this.setCurrentMusic(this.state.playlist[this.state.playlist.map(JSON.stringify).indexOf(JSON.stringify(this.state.currentMusic))+1]);
      console.log("Set music")
    } 
    else{
      this.setPauseState();
    } 
  }
  //User
  setLoginState = () => {
    this.setState({isLogin: true});
  }

  setLogoutState = () => {
    this.setState({isLogin: false});
  }
  render(){
    
    return (
      <div className="container-fluid bg-dark">
        <div className="row">
              <Router>
                <LeftSideBar isLogin={this.state.isLogin}/>
                <MainContent setLoginState={this.setLoginState} setLogoutState={this.setLogoutState} setPlaylist={this.setPlaylist} playlist={this.state.playlist} fetchHomeData={this.fetchNewestMusics} requestPlayMusicFromSlug={this.requestPlayMusicFromSlug}/>
                <RightSideBar 
                 peekHanlde={this.peekHandle}
                 isPlay={this.state.isPlay} 
                 isLoop={this.state.isLoop} 
                 isRandom={this.state.isRandom} 
                 currentMusic={this.state.currentMusic}
                 setPlayState={this.setPlayState}
                 setPauseState={this.setPauseState}
                 toggleLoop={this.toggleLoop}
                 toggleRandom={this.toggleRandom}
                 currentTime={this.state.currentTime}
                 duration={this.state.duration}
                 cancelMouseHold={this.cancelMouseHold}
                 forwardHandle={this.forwardHandle}
                 
                 backwardHandle={this.backwardHandle}
                 />
              </Router>
            
        </div>
        <audio onEnded={this.endedHandle} onTimeUpdate={this.updateCurrentTime} onLoadedMetadata={this.setDuration}  loop={this.props.isLoop} ref={this.audioRef}> </audio> 
      </div>
    );
  }
}

export default App;
