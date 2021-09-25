import React, { Component } from 'react';
import AlbumList from './AlbumList';
import CategoryList from './CategoryList';
import './categorylist.css';
export class DiscoverTemplate extends Component {
    constructor(props){
        super(props);
        
    }
    
    render(){
        return <div className="container-fluid">
            <div className="row">
            <div className="col-12">
                <h1>{this.props.isCategory ? "Category" : "Album"}</h1>
            </div>
            </div>
            <div className="row">
              
                <div className="col-12">
                   {this.props.isCategory ? <CategoryList {...this.props}></CategoryList> : <AlbumList {...this.props}></AlbumList>}
                </div>
            </div>
        </div>
    }
}