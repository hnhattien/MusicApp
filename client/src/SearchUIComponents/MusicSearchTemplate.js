import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import MusicCardList from '../ContentComponents/MusicCardList';
export class MusicSearchTemplate extends Component {
    constructor(props) {
        super(props);
    }
    
    
    render() {
        
      
        let musicSet = new Set(this.props.musics.map(JSON.stringify));    //Comvert objects to string to Set work
        let musicArray = Array.from(musicSet).map(JSON.parse) //Remove duplicated datas //Remove duplicated datas
        // if(this.props.isHome === true){
        //     if (musicArray.length > 0) {
        //         return <ul className="list-group bg-dark"> 
        //             <MusicCardList isInlineList={true} {...this.props}  musicArray={musicArray}></MusicCardList>
        //         </ul>
        //     }else{
        //         return "";
        //     }
        // }
        // else{
            
            if (musicArray.length > 0) {
                return <ul className="list-inline bg-dark"> 
                <MusicCardList isInlineList={true}  musicArray={musicArray} {...this.props} ></MusicCardList>

                </ul>
            }
            else{
                return <div>
                    <h1>Music</h1><ul>No data</ul>
                </div>
            }
        // }
    }
}

export default withRouter(MusicSearchTemplate);