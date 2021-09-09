import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import React, { Component } from 'react';
export class MenuLink extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
               
                    <NavLink className={`${this.props.className} h-100 d-block`} to={this.props.url}>
                    {this.props.children}
                </NavLink>
               
        )
    }
}