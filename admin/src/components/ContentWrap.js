import React, { Component } from 'react'
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import AdminTemplate from './AdminTemplate';
import UserManagement from './UserManagement';
import styled from 'styled-components';
import LoginTemplate from './LoginTemplate';
import SignupTemplate from './SignupTemplate';
import NavBar from './NavBar';
import HomeAdminTemplate from './HomeAdminTemplate';
import SongManagement from './SongManagement'
import ArtistManagement from './ArtistManagement';
import AlbumManagement from './AlbumManagement';
import CategoryManagement from './CategoryManagement';
export class ContentWrap extends Component {
    constructor(props){
        super(props);
    }
    render() {

        return (
            <div className="col-9 bg-dark">
                <NavBar {...this.props}></NavBar>
                <Switch>
                    <Route path='/' exact={true} render={(routeProps) => <HomeAdminTemplate {...routeProps} {...this.props}></HomeAdminTemplate>}></Route>
                    <Route path={'/user'} exact={true} render={(routeProps)=><UserManagement {...routeProps} {...this.props}></UserManagement>
                    }></Route>
                    <Route path={'/song'} exact={true} render={(routeProps)=><SongManagement {...routeProps} {...this.props}></SongManagement>
                    }></Route>
                    <Route path={'/artist'} exact={true} render={(routeProps)=><ArtistManagement {...routeProps} {...this.props}></ArtistManagement>
                    }></Route>
                    <Route path={'/album'} exact={true} render={(routeProps)=><AlbumManagement {...routeProps} {...this.props}></AlbumManagement>
                    }></Route>
                    <Route path={'/category'} exact={true} render={(routeProps)=><CategoryManagement {...routeProps} {...this.props}></CategoryManagement>
                    }></Route>
                    <Route path={'/signup'} exact={true} render={(routeProps) => <SignupTemplate {...routeProps} {...this.props}></SignupTemplate>}></Route>
                    <Route path="/login" exact={true} render={(routeProps)=><LoginTemplate {...routeProps} {...this.props}></LoginTemplate>}></Route>
                </Switch>

            </div>
        )
    }
}

export default ContentWrap
