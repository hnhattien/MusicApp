// eslint-disable-next-line

import React, { Component } from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
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
    this.showSideBarButtonRef = React.createRef();
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
      isShowSideBar: false,
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

  //Remember scroll






  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.rememberScroll, true);
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
  setCurrentMusic = (music)=>{

    this.setState({currentMusic: music,currentTime: 0},()=>{
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
    console.log(this.state.playlist.filter(music=>music['music_slug'] === slug))
    let musicFromPlaylist = this.state.playlist.filter(music=>music['music_slug'] === slug);
    if(musicFromPlaylist.length <= 0){
      fetch(`/song/${slug}`).then((res)=>{
           return res.json();
      }).then((musicRes)=>{
        if(typeof musicRes === typeof {}){
          this.setCurrentMusic(musicRes);
          console.log(musicRes,"Music Response")
        }
        else{
          this.showMessage(true,"Response Format is invalid.","danger");
        }
      }).catch(err=>{
        this.showMessage(true,String(err),"danger");
      }).then(()=>{
        setTimeout(()=>{
          this.showMessage(false)
        },3000);
      })
    }else{

      let targetMusic = musicFromPlaylist[0];
      this.setCurrentMusic(targetMusic);
      console.log(targetMusic,"targetd")
      console.log(slug,"Request")
    }

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
    if(this.state.currentMusic){
      document.title = this.state.currentMusic.title + " - " +
      `${this.state.currentMusic.artist_name}`;
    }
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
      if(this.getPlaylist().length > 0){
        if( currentMusicIndex === this.state.playlist.length - 1){
          this.setCurrentMusic(this.state.playlist[0]);
        }
        else{
          let nextMusic = this.state.playlist[this.state.playlist.indexOf(this.state.currentMusic)+1];
          this.setCurrentMusic(nextMusic);
        }
      }
      else{
        if(this.audioRef && this.audioRef.current){
          this.audioRef.current.currentTime = this.audioRef.current.duration+10;
        }
      }

    }



  }
  backwardHandle = (ev) =>{


    if(this.state.isRandom){
      this.setRandomSong();
    }
    else{
      if(this.state.playlist.length > 0){
        let currentMusicIndex = this.state.playlist.indexOf(this.state.currentMusic);
        if( currentMusicIndex === 0){
          this.setCurrentMusic(this.state.playlist[0]);
        }
        else{
          this.setCurrentMusic(this.state.playlist[currentMusicIndex - 1]);
        }
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

  updateLoginStatus = () => {
    this.toggleLoading(true);
    fetch('/auth/loginstatus').then(res=>{
      return res.json();
    }).then(data=>{
      if(data.isLogin === true){
        localStorage.setItem("userid",data.id);
        this.setState({user:{nickname: data.nickname,avatar: data.avatar}},()=>{
        });
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
  toggleSideBar = (ev) => {
      this.setState({
        isShowSideBar: !this.state.isShowSideBar
      })
  }

  registerOpacityHandleShowSideBarButtonForMobile = () => {
    if(window.screen.width <= 576){
      let hideTimer = null;
      console.log(this.showSideBarButtonRef);
      /*if(this.showSideBarButtonRef && this.showSideBarButtonRef.current){
        this.showSideBarButtonRef.current.addEventListener("click",()=>{
          this.showSideBarButtonRef.current.classList.add("show");
          clearTimeout(hideTimer);
          alert("hi");
        })
        this.showSideBarButtonRef.current.addEventListener("mouseover",()=>{
          this.showSideBarButtonRef.current.classList.add("show");
          clearTimeout(hideTimer);
          alert("hi");
        })
      }*/
      document.addEventListener("scroll",()=>{
          if(this.showSideBarButtonRef && this.showSideBarButtonRef.current){
            this.showSideBarButtonRef.current.classList.add("show");
            this.showSideBarButtonRef.current.classList.remove("hide");
          }
          if(hideTimer !== null){
            setTimeout(()=>{
              clearTimeout(hideTimer);
            },1000);
            hideTimer = null;
          }
          else{
            hideTimer = setTimeout(()=>{
              if(this.showSideBarButtonRef && this.showSideBarButtonRef.current){
                this.showSideBarButtonRef.current.classList.remove("show");
                this.showSideBarButtonRef.current.classList.add("hide");

              }
            },5000)
          }
      })
    }
  }
  componentDidMount = () => {
    this.updateLoginStatus();
    this.registerOpacityHandleShowSideBarButtonForMobile();
  }
  setLogoutState = () => {
    this.setState({isLogin: false});
  }
  getAudioElement = () => {
    if(this.audioRef){
      return this.audioRef.current;
    }
    else{
      return null;
    }
  }
  //Loading
  toggleLoading = (isLoad,position={x:"50%",y:"50%"}) => {
    this.setState({loading: {isLoad: isLoad, position}});
  }
  //Message Alert
  showMessage = (isShowMessage,text="",type,position={x:"50%",y:"50%"}) => {
    this.setState({messageAlert: {isShowMessage,messageProps:{text,type,position}}});
  }
  setAdminPage = (isAdminPage) => {
    this.setState({
      isAdminPage
    })
  }
  render(){
    console.log(this.state.playlist);
    let iconLeftSideBarClass = this.state.isShowSideBar ? 'fa-chevron-left' : 'fa-chevron-right';
    return (
      <Router>

        <div className="container-fluid bg-dark">
          <div className="home-btn-wrap">
             <NavLink to={'/'}><span role="button" className="fas fa-home home-btn"></span></NavLink>
          </div>
          <div ref={this.showSideBarButtonRef} onMouseMove={(ev)=>{
            ev.target.classList.add("show");
            ev.target.classList.remove("hide");
          }} className="show-nav-bar-button-wrap">
             <span role="button" onClick={this.toggleSideBar} className={`fas ${iconLeftSideBarClass}`}>
             </span>
          </div>

          {this.state.loading.isLoad && <Loading position={this.state.loading.position}></Loading>}
          {this.state.messageAlert.isShowMessage && <MessageBox showMessage={this.showMessage} text={this.state.messageAlert.messageProps.text} position={this.state.messageAlert.messageProps.position} type={this.state.messageAlert.messageProps.type}></MessageBox>}
          <div className="row position-relative">

        <LeftSideBar isShowSideBar={this.state.isShowSideBar} updateUserChanges={this.updateUserChanges} user={this.state.user} logoutUser={this.logoutUser} toggleLoading={this.toggleLoading} showMessage={this.showMessage} />
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
        requestPlayMusicFromSlug={this.requestPlayMusicFromSlug}
        updateLoginStatus={this.updateLoginStatus}
        getAudioElement={this.getAudioElement}
        getCurrentMusic={this.getCurrentMusic}
        />

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
          <audio onError={(ev) => {
            this.forwardHandle(ev);
            this.showMessage(true,"Mp3 file error.","danger");
          }} onEnded={this.endedHandle} onTimeUpdate={this.updateCurrentTime} onLoadedMetadata={this.setDuration}  loop={this.props.isLoop} ref={this.audioRef}> </audio>
        </div>


      </Router>

    );
  }
}

export default App;
