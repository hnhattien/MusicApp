import React, { Component } from 'react';
import { MusicSearchTemplate } from './MusicSearchTemplate';
import ArtistSearchTemplate from './ArtistSearchTemplate';
export class SearchContent extends Component {
    constructor(props){
        super(props);
    }
    render(){
    
        
        return(
            <div className="row bg-dark">
                <MusicSearchTemplate {...this.props}  searchValue={this.props.searchValue} musics={[...this.props.data.musics]}>

                </MusicSearchTemplate>
                <ArtistSearchTemplate artists={[...this.props.data.artists]} {...this.props}>

                </ArtistSearchTemplate>
            </div>
        )
    }
}