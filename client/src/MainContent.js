import React, { Component } from 'react';
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import {HomeTemplate} from './ContentComponents/HomeTemplate';
import {RankTemplate} from './ContentComponents/RankTemplate';
import { DiscoverTemplate } from './DiscoverComponents/DiscoverTemplate';
import { SearchTemplate } from './SearchUIComponents/SearchTemplate';
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
import ForgetPasswordTemplate from './MemberComponents/ForgetPasswordTemplate';
import ResetPasswordTemplate from './MemberComponents/ResetPasswordTemplate';
import UploadTemplate from './ContentComponents/UploadTemplate';
import NewestMusicComponent from './NewestMusicComponent';
import CategoryTemplate from './ContentComponents/CategoryTemplate';
import AlbumTemplate from './ContentComponents/AlbumTemplate';
import ArtistInfoTemplate from './ContentComponents/ArtistInfoTemplate';
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
        })
        // .then(()=>{
        //     setTimeout(() => {
        //         this.props.showMessage(false,);
        //     },4000);
        // })
    }
    componentDidMount = () => {
        this.getCategories();
    }
    render(){

        return (

            <div className="col bg-dark p-0 position-relative">
                <Switch>
                    <Route path='/' exact={true} render={(routeProps)=><HomeTemplate {...this.props} ></HomeTemplate>
                    }/>


                    <Route path="/search" exact={true} render={(routeProps)=>{return <><SearchTemplate {...this.props}/></>}}/>
                    <Route path="/rank" exact={true} render={(routeProps)=><RankTemplate {...this.props}></RankTemplate>}/>

                    <Route path={"/category/:slug"} exact={true} render={(routeProps)=>{
                        return <CategoryTemplate {...routeProps} categorySlug={routeProps.match.url} {...this.props} />
                    }}/>
                    <Route path={"/album/:slug"} exact={true} render={(routeProps)=>{
                        return <AlbumTemplate {...routeProps} albumSlug={routeProps.match.url} {...this.props} />
                    }}/>
                    <Route path="/discover/category" exact={true} render={(routeProps)=><DiscoverTemplate {...routeProps} isCategory={true} {...this.props}></DiscoverTemplate>}></Route>
                    <Route path="/discover/album" exact={true} render={(routeProps)=><DiscoverTemplate {...routeProps} isAlbum={true} {...this.props}></DiscoverTemplate>}></Route>
                    <Route path="/song/:song" exact={true} render={(routeProps)=>{

                    return <MusicInfoTemplate {...routeProps} {...this.props} musicSlug={routeProps.match.url}></MusicInfoTemplate>
                    }} />

                    <Route path="/artist/:artist" exact={true} render={(routeProps)=>{

                       return <ArtistInfoTemplate {...this.props} artistSlug={routeProps.match.url}></ArtistInfoTemplate>
                    }} />


                    <Route path="/login" exact={true} render={(routeProps)=><LoginTemplate {...routeProps} {...this.props}></LoginTemplate>}></Route>
                    <Route path="/signup" render={(routeProps) => <SignupTemplate {...routeProps} {...this.props}/>} exact={true}></Route>
                    <Route path="/forgetpassword" render={(routeProps) => <ForgetPasswordTemplate {...this.props}/>} exact={true}></Route>
                    <Route path="/resetpassword" render={(routeProps) => <ResetPasswordTemplate {...this.props}/>} exact={true}></Route>
                    <PrivateRoute componentProps={this.props} component={ProfileSetting} path={'/profile/setting'} auth={localStorage.getItem("userid") !== null} ></PrivateRoute>
                    <PrivateRoute componentProps={this.props} component={Profile} path={'/profile'} auth={localStorage.getItem("userid") !== null}/>
                    <Route path="/upload" exact={true} render={(routeProps) => {
                        console.log(this.state.categories);

                        return <UploadTemplate categories={this.state.categories} {...routeProps} {...this.props} /> ;
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
