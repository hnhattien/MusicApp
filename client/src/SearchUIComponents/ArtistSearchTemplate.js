import React, { Component } from 'react'
import ArtistCardList from '../ContentComponents/ArtistCardList';

export class ArtistSearchTemplate extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let artistSet = new Set(this.props.artists.map(JSON.stringify));    //Comvert objects to string to Set work
        let artistArray = Array.from(artistSet).map(JSON.parse) //Remove duplicated datas //Remove duplicated datas
        
        
        if (artistArray.length > 0) {
            return <div>
                <h1>Artist</h1>
                <ul className="list-inline bg-dark"> 
                   <ArtistCardList isInlineList={true}  artistArray={artistArray} {...this.props} ></ArtistCardList>
 
                </ul>
            </div>
        }
        else
        {
           return <div>
           <h1>Artist</h1><ul>No data</ul>
       </div>
        }
    }
}

export default ArtistSearchTemplate
