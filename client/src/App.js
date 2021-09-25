// eslint-disable-next-line
import logo from './logo.svg';
import React, { Component } from 'react';
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import {RightSideBar} from './RightSideBar';
import {LeftSideBar} from './LeftSideBarComponents/LeftSideBar';
import { MainContent } from './MainContent';
import {MessageBox} from './MessageComponents/MessageBox';
import {Loading} from './LoadingComponents/Loading';

export class App extends Component {
  constructor(props){
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      user: {
        nickname: '',
        avatar: ''
      },
      isLogin: window.localStorage.getItem("userid") !== null,
      sitemap : [],
      currentMusic : null,
      isLoging: false,
      isPlay: false,
      isLoop: false,
      isRandom: false,
      currentTime: 0,
      duration: 0,
      newMusics: [],
      playlist: [],
      //Loading
      loading: {
        isLoad: false,
        position: {x: 0, y: 0}
      },
      //Message
      messageAlert: {
        isShowMessage: false,
        messageProps: {type:"success",text: "", position: {x: "50%", y: "50%"}},
      }
      
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
    this.setState({playlist: data},()=>{
      this.toggleLoading(false);
    })
  }
  getPlaylist = () => {
    return this.state.playlist;
  }
  // fetchNewestMusics = async ()=>{
  //   // if(this.state.playlist.length === 0){
  //   //   this.toggleLoading(true);
  //   // }
  //   await fetch("/index" ).then(res=>{
  //       return res.json();
  //   }).then(data=>{

  //     if(data['musics']){
  //       if(this.state.currentMusic === null){
  //         this.setState({
  //           currentMusic: data['musics'][data['musics'].length-1],
  //           newMusics: data['musics']
  //         },()=>{
  //           console.log(this.state.newMusics)
  //         })
  //       }
       
  //       this.setPlaylist([...data['musics'].reverse()])
       
  //     }     
  //   })
  // }
  updateHeartChanges = (changedMusic)=>{
    let newPlaylist = this.state.playlist.map((music)=>{
      if(music.id === changedMusic.id){
        return changedMusic;
      }
      else{
        return music;
      }
    })
      
    
    this.setState({
      playlist: newPlaylist
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
  getCurrentMusic = () => {
    return this.state.currentMusic;
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
      
    if(this.state.isRandom){
      this.setRandomSong();
    }
        // if(this.audioRef.current){
        //   this.audioRef.current.currentTime = this.state.currentTime + 10;
        // }
    else{
      let currentMusicIndex = this.state.playlist.indexOf(this.state.currentMusic);
      if( currentMusicIndex === this.state.playlist.length - 1){
        this.setCurrentMusic(this.state.playlist[0]);
      }
      else{
        let nextMusic = this.state.playlist[this.state.playlist.indexOf(this.state.currentMusic)+1];
        this.setCurrentMusic(nextMusic);   
      }
      
    }
    
    

  }
  backwardHandle = (ev) =>{

      
    if(this.state.isRandom){
      this.setRandomSong();
    }

    else{
      let currentMusicIndex = this.state.playlist.indexOf(this.state.currentMusic);
      if( currentMusicIndex === 0){
        this.setCurrentMusic(this.state.playlist[0]);
      }
      else{
        this.setCurrentMusic(this.state.playlist[currentMusicIndex - 1]);
      }
        
    }
  }
  updateViewCount = (music) => {
    console.log(music.id, "Hi")
    fetch('/song/updateview',{
       method : "POST",
       headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         musicId: music.id
       })
     }).then(res=>{
       return res.json();
     }).then(dataRes => {
       console.log(dataRes);
     }).catch(err=>{
       console.log(err);
     })
     console.log("Music");
  }
  endedHandle = (ev)=>{
    console.log("End");
    this.updateViewCount(this.state.currentMusic);
    if(this.state.isLoop === true){
      this.audioRef.current.play().catch(err=>{
        console.log(err);
      });
    }
    else if(this.state.isRandom === true){
      this.setRandomSong();
      
    }
    else if(this.state.playlist.length !== 0){
      // console.log(Object.keys(this.state.playlist[0]));
      // console.log(Object.keys(this.state.currentMusic))
      // this.setCurrentMusic(this.state.playlist[this.state.playlist.map(JSON.stringify).indexOf(JSON.stringify(this.state.currentMusic))+1]);
      this.forwardHandle(ev);
      console.log("Set music")
    } 
    else{
      this.setPauseState();
    } 
  }
  //User
  setLoginState = (user) => {
    console.log(user);
    this.setState({user: {nickname: user.nickname, avatar: user.avatar}});
  }
 
  updateUserChanges = () => {
    this.toggleLoading(true);
    fetch('/auth/loginstatus').then(res=>{
      return res.json();
    }).then(data=>{
      console.log(data);
      if(data.isLogin === true){
        localStorage.setItem("userid",data.id);
        console.log(data)
        this.setState({user:{nickname: data.nickname,avatar: data.avatar}});
      }
      else{
        localStorage.removeItem("userid");
      }
    }).catch(err=>{
      this.showMessage(true,String(err),"danger");
    }).then(()=>{
      this.toggleLoading(false);
      setTimeout(()=>{
        this.showMessage(false);
      },500)
    })
  }
  checkLoginStatus = () => {
    this.toggleLoading(true);
    fetch('/auth/loginstatus').then(res=>{
      return res.json();
    }).then(data=>{
      console.log(data);
      if(data.isLogin === true){
        localStorage.setItem("userid",data.id);
        console.log(data)
        this.setState({user:{nickname: data.nickname,avatar: data.avatar}});
      }
      else{
        localStorage.removeItem("userid");
      }
    }).catch(err=>{
      this.showMessage(true,String(err),"danger");
    }).then(()=>{
      this.toggleLoading(false);
      setTimeout(()=>{
        this.showMessage(false);
      },2000)
    })
  }
  componentDidMount = () => {
    this.checkLoginStatus();
  }
  setLogoutState = () => {
    this.setState({isLogin: false});
  }
  
  //Loading
  toggleLoading = (isLoad,position={x:"50%",y:"50%"}) => {
    this.setState({loading: {isLoad: isLoad, position}});
  }
  //Message Alert
  showMessage = (isShowMessage,text="",type,position={x:"50%",y:"50%"}) => {
    this.setState({messageAlert: {isShowMessage,messageProps:{text,type,position}}});
  }
  render(){
    
    return (
      <Router>
     
      <div className="container-fluid bg-dark">
        {this.state.loading.isLoad && <Loading position={this.state.loading.position}></Loading>}
        {this.state.messageAlert.isShowMessage && <MessageBox text={this.state.messageAlert.messageProps.text} position={this.state.messageAlert.messageProps.position} type={this.state.messageAlert.messageProps.type}></MessageBox>}  
        <div className="row position-relative">
        
      <LeftSideBar updateUserChanges={this.updateUserChanges} user={this.state.user} logoutUser={this.logoutUser} toggleLoading={this.toggleLoading} showMessage={this.showMessage} />
      <MainContent
      updateHeartChanges={this.updateHeartChanges}
      updateUserChanges={this.updateUserChanges} 
      setCurrentMusic={this.setCurrentMusic}
      user={this.state.user} 
      toggleLoading={this.toggleLoading} 
      showMessage={this.showMessage} 
      setLoginState={this.setLoginState} 
      setLogoutState={this.setLogoutState} 
      setPlaylist={this.setPlaylist} 
      getPlaylist={this.getPlaylist} 
      requestPlayMusicFromSlug={this.requestPlayMusicFromSlug}/>

      <RightSideBar 
      updateHeartChanges={this.updateHeartChanges}
      showMessage={this.showMessage}
      peekHanlde={this.peekHandle}
      isPlay={this.state.isPlay} 
      isLoop={this.state.isLoop} 
      isRandom={this.state.isRandom} 
      getCurrentMusic={this.getCurrentMusic}
      setPlayState={this.setPlayState}
      setPauseState={this.setPauseState}
      toggleLoop={this.toggleLoop}
      toggleRandom={this.toggleRandom}
      currentTime={this.state.currentTime}
      duration={this.state.duration}
      cancelMouseHold={this.cancelMouseHold}
      forwardHandle={this.forwardHandle}
      getPlaylist={this.getPlaylist}
      backwardHandle={this.backwardHandle}
      currentMusic={this.state.currentMusic}
      requestPlayMusicFromSlug={this.requestPlayMusicFromSlug}
      />

        </div>
        <audio onError={this.forwardHandle} onEnded={this.endedHandle} onTimeUpdate={this.updateCurrentTime} onLoadedMetadata={this.setDuration}  loop={this.props.isLoop} ref={this.audioRef}> </audio> 
      </div>
      </Router>
    );
  }
}

export default App;
