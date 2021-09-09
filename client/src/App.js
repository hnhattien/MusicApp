import logo from './logo.svg';
import React, { Component } from 'react';
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import {RightSideBar} from './RightSideBar';
import {LeftSideBar} from './LeftSideBar';
import { MainContent } from './MainContent';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sitemap : []
    }
  }  
  render(){
    return (
      <div className="container-fluid">
        <div className="row">
              <Router>
                <LeftSideBar/>
                <MainContent/>
                <RightSideBar/>
              </Router>
            
            
        </div>
      </div>
    );
  }
}

export default App;
