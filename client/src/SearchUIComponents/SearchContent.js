import React, { Component } from 'react';
import { MusicTemplate } from '../ContentComponents/MusicTemplate';
export class SearchContent extends Component {
    constructor(props){
        super(props);
    }
    render(){
    
        
        return(
            <div className="row bg-dark">
                <MusicTemplate  requestPlayMusicFromSlug={this.props.requestPlayMusicFromSlug}  searchValue={this.props.searchValue} musics={[...this.props.data.musics, ...this.props.data.usermusics]}>

                </MusicTemplate>
            </div>
        )
    }
}