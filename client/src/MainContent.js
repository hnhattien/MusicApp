import React, { Component } from 'react';
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import {HomeTemplate} from './ContentComponents/HomeTemplate';
import {RankTemplate} from './ContentComponents/RankTemplate';
import { DiscoverTemplate } from './ContentComponents/DiscoverTemplate';
import { SearchTemplate } from './ContentComponents/SearchTemplate';
import {NotFound404} from './NotFound404';
import {SearchContent} from './SearchUIComponents/SearchContent'
import { MusicInfoTemplate } from './ContentComponents/MusicInfoTemplate';
import {Loading} from './Loading';
import { LoginTemplate } from './MemberComponents/LoginTemplate';
import { SignupTemplate } from './MemberComponents/SignupTemplate';
export class MainContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            load: false
        }
    }
    toggleLoading = (isLoad) => {
        this.setState({load: isLoad});
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

                    <Route path="/login" exact={true} component={LoginTemplate}></Route>
                    <Route path="/signup" component={SignupTemplate} exact={true}></Route>
                    <Route component={NotFound404}></Route>
                    <Redirect from='/home' to='/' exact={true}></Redirect>
                    

                </Switch>
                {this.state.load && <Loading ></Loading>}  
                
            </div>
           
        )
    }
}