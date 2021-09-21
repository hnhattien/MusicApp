import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import MusicCardList from './MusicCardList';
export class MusicTemplate extends Component {
    constructor(props) {
        super(props);
    }
    
    
    render() {
        
      
        let musicSet = new Set(this.props.musics.map(JSON.stringify));    //Comvert objects to string to Set work
        let musicArray = Array.from(musicSet).map(JSON.parse) //Remove duplicated datas //Remove duplicated datas
        if(this.props.isHome === true){
            if (musicArray.length > 0) {
                return <ul className="list-group bg-dark"> 
                    <MusicCardList {...this.props}  musicArray={musicArray}></MusicCardList>
                </ul>
            }else{
                return "";
            }
        }
        else{
            if(typeof this.props.searchValue === typeof "l" && this.props.searchValue.length === 0){
                return <h1>Content when seach Input empty</h1>;
            }
            else if (musicArray.length > 0) {
                return <ul className="list-group bg-dark"> 
                <MusicCardList  musicArray={musicArray} {...this.props} ></MusicCardList>

                </ul>
            }
            else{
                return <ul>No data</ul>
            }
        }
    }
}

export default withRouter(MusicTemplate);