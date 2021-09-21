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
import Profile from './Profile/Profile';
import PrivateRoute from './PrivateRoute';
import ProfileSetting from './Profile/ProfileSetting';
import UploadTemplate from './ContentComponents/UploadTemplate';
import NewestMusicComponent from './NewestMusicComponent';
export class MainContent extends Component {
    constructor(props){
        super(props);
        this.state = {
           categories: []

        }
    }
    getCategories = () => {
        fetch('/category/').then((res)=>{
            return res.json();
        }).then(dataRes => {
            if(dataRes.error){
               this.props.showMessage(true,dataRes.error.message,"danger");
            }
            else{
                this.setState({
                    categories: dataRes
                })
            }
            
        }).catch(err=>{
            this.props.showMessage(true,String(err),"danger");
        }).then(()=>{
            setTimeout(() => {
                this.props.showMessage(false,);
            },1000);
        })
    }
    componentDidMount = () => {
        this.getCategories();
    }
    render(){
        
        return (
            
            <div className="col bg-dark p-0 position-relative">
                <Switch>
                    <Route path='/' exact={true} render={(routeProps)=><HomeTemplate {...this.props} ></HomeTemplate>
                    }>
                        
                    </Route>
                    <Route path="/search" exact={true} 
                    render={(routeProps)=>{
                        return <><SearchTemplate {...this.props}/>
                        </>
                    }
                    }>

                    </Route>
                    <Route path="/rank" exact={true} render={(routeProps)=><RankTemplate {...this.props}></RankTemplate>}>

                    </Route>
                    <Route path="/discover" exact={true} render={(routeProps)=><DiscoverTemplate {...this.props}></DiscoverTemplate>}></Route>
                    <Route path="/song/:song" exact={true} render={(routeProps)=>{
                       
                    return <MusicInfoTemplate {...this.props} musicSlug={routeProps.match.url}></MusicInfoTemplate>
                    }} ></Route>

                    <Route path="/login" exact={true} render={(routeProps)=><LoginTemplate {...this.props}></LoginTemplate>}></Route>
                    <Route path="/signup" render={(routeProps) => <SignupTemplate {...this.props}/>} exact={true}></Route>
                    <PrivateRoute componentProps={this.props} component={ProfileSetting} path={'/profile/setting'} auth={localStorage.getItem("userid") !== null} ></PrivateRoute>
                    <PrivateRoute componentProps={this.props} component={Profile} path={'/profile'} auth={localStorage.getItem("userid") !== null}/>
                    <Route path="/upload" exact={true} render={(routerProps) => {
                        console.log(this.state.categories);
                        return <UploadTemplate categories={this.state.categories} {...this.props} /> ;
                    }} 
                    />
                    <Route path="/newest" exact={true} render={()=>{
                          return <NewestMusicComponent {...this.props}></NewestMusicComponent>
                    }}>
                    </Route>
                    <Redirect from='/home' to='/' exact={true}></Redirect>
                    

                </Switch>
                
                
            </div>
           
        )
    }
}