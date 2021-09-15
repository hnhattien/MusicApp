import React, { Component } from 'react';
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import {HomeTemplate} from './ContentComponents/HomeTemplate';
import {RankTemplate} from './ContentComponents/RankTemplate';
import { DiscoverTemplate } from './ContentComponents/DiscoverTemplate';
import { SearchTemplate } from './ContentComponents/SearchTemplate';
import {NotFound404} from './NotFound404';
import {SearchContent} from './SearchUIComponents/SearchContent'
import { MusicInfoTemplate } from './ContentComponents/MusicInfoTemplate';
import {Loading} from './LoadingComponents/Loading';
import { LoginTemplate } from './MemberComponents/LoginTemplate';
import { SignupTemplate } from './MemberComponents/SignupTemplate';
import {MessageBox} from './MessageComponents/MessageBox';
export class MainContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoad: false,
            isShowMessage: false,
            message: {type:"",text: "", position: {x: "50%", y: "50%"}},
            load: {position: {x: 0, y: 0}}

        }
    }
    toggleLoading = (isLoad,position={x:"50%",y:"50%"}) => {
        this.setState({isLoad: isLoad,load: {position}});
    }
    showMessage = (isShowMessage,text="",type,position={x:"50%",y:"50%"}) => {
        this.setState({isShowMessage,message:{text,type,position}});
    }
    render(){
        
        return (
            
            <div className="col-7 bg-dark p-0 position-relative">
                <Switch>
                    <Route path='/' exact={true} render={(routeProps)=><HomeTemplate {...this.props} requestPlayMusicFromSlug={this.props.requestPlayMusicFromSlug} toggleLoading={this.toggleLoading}></HomeTemplate>
                    }>
                        
                    </Route>
                    <Route path="/search" exact={true} 
                    render={(routeProps)=>{
                        return <><SearchTemplate setPlaylist={this.props.setPlaylist} requestPlayMusicFromSlug={this.props.requestPlayMusicFromSlug} toggleLoading={this.toggleLoading}/>
                        </>
                    }
                    }>

                    </Route>
                    <Route path="/rank" exact={true} render={(routeProps)=><RankTemplate toggleLoading={this.toggleLoading}></RankTemplate>}>

                    </Route>
                    <Route path="/discover" exact={true} render={(routeProps)=><DiscoverTemplate toggleLoading={this.toggleLoading}></DiscoverTemplate>}></Route>
                    <Route path="/song/:song" exact={true} render={(routeProps)=>{
                       
                    return <MusicInfoTemplate musicslug={routeProps.match.url} toggleLoading={this.toggleLoading}></MusicInfoTemplate>
                    }} ></Route>

                    <Route path="/login" exact={true} render={(routeProps)=><LoginTemplate {...this.props} toggleLoading={this.toggleLoading} showMessage={this.showMessage}></LoginTemplate>}></Route>
                    <Route path="/signup" component={SignupTemplate} exact={true}></Route>
                    <Route component={NotFound404}></Route>
                    <Redirect from='/home' to='/' exact={true}></Redirect>
                    

                </Switch>
                {this.state.isLoad && <Loading position={this.state.load.position}></Loading>}
                {this.state.isShowMessage && <MessageBox text={this.state.message.text} position={this.state.message.position} type={this.state.message.type}></MessageBox>}  
                
            </div>
           
        )
    }
}