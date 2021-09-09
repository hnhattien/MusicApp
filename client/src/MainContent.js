import React, { Component } from 'react';
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import {HomeTemplate} from './ContentComponents/HomeTemplate';
import {RankTemplate} from './ContentComponents/RankTemplate';
import { DiscoverTemplate } from './ContentComponents/DiscoverTemplate';
import { SearchTemplate } from './ContentComponents/SearchTemplate';
import {NotFound404} from './NotFound404';
export class MainContent extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
       
            <div className="col-8 bg-dark p-0">
            <Switch>
                <Route path='/' exact={true} render={(routeProps)=><HomeTemplate></HomeTemplate>}>
                    
                </Route>
                <Route path="/search" exact={true} render={(routeProps)=><SearchTemplate></SearchTemplate>}>

                </Route>
                <Route path="/rank" exact={true} render={(routeProps)=><RankTemplate></RankTemplate>}>

                </Route>
                <Route path="/discover" exact={true} render={(routeProps)=><DiscoverTemplate></DiscoverTemplate>}></Route>
                <Route component={NotFound404}></Route>
                <Redirect from='/home' to='/' exact={true}></Redirect>
            </Switch>
            </div>
           
        )
    }
}