import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import AdminSideBar from './components/AdminSideBar';
import ContentWrap from './components/ContentWrap';
import {BrowserRouter as Router} from 'react-router-dom';
import {MessageBox} from './components/MessageComponents/MessageBox';
import { Loading } from './components/LoadingComponents/Loading';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div.attrs(props=>({
  className: 'container-fluid bg-dark'
}))`

`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLogin: window.localStorage.getItem("adminid") !== null,
      sitemap : [],
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
  componentDidMount = () => {
    this.updateLoginStatus();

  }
  updateLoginStatus = () => {
    this.toggleLoading(true);
    fetch('/auth/adminloginstatus').then(res=>{
      return res.json();
    }).then(data=>{
      console.log(data,"jsdksd");
      if(data.isLogin === true){
        localStorage.setItem("adminid",data.id);
        this.setState({user:{nickname: data.nickname,avatar: data.avatar}},()=>{
        });
      }
      else{
        localStorage.removeItem("adminid");
        this.setState({
          user: null
        })
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
  setLoginState = (user) => {
    console.log(user);
    this.setState({user: {nickname: user.nickname, avatar: user.avatar}});
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
      <Container>
        {this.state.loading.isLoad && <Loading position={this.state.loading.position}></Loading>}
        {this.state.messageAlert.isShowMessage && <MessageBox showMessage={this.showMessage} text={this.state.messageAlert.messageProps.text} position={this.state.messageAlert.messageProps.position} type={this.state.messageAlert.messageProps.type}></MessageBox>}
        <div className="row">
          <Router>
            <AdminSideBar toggleLoading={this.toggleLoading} showMessage={this.showMessage}></AdminSideBar>
            <ContentWrap updateLoginStatus={this.updateLoginStatus} user={this.state.user} setLoginState={this.setLoginState} toggleLoading={this.toggleLoading} showMessage={this.showMessage}>

            </ContentWrap>
          </Router>
        </div>
      </Container>
    );
  }
}

export default App;
