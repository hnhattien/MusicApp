import React, { Component} from 'react';
import {Search} from './MenuComponents/Search'
import {Home} from './MenuComponents/Home';
import {Rank} from './MenuComponents/Rank';
import {Discover} from './MenuComponents/Discover';
export class MusicMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            style: {background : this.props.background}
        }
    }
    render(){
       
        return <ul className={`${this.props.className}`} style={ {backgroundColor: this.state.style.background}}>
            <Search  style={this.state.style} className={'list-group-item py-3'}></Search>
            <Home  style={this.state.style} className={'list-group-item py-3'}></Home>
            <Discover  style={this.state.style} className={'list-group-item py-3'}></Discover>
            {/* <Rank style={this.state.style} className="list-group-item py-3"></Rank> */}
        </ul>
            
                
            
        
    }
}