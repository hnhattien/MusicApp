import React, { Component } from 'react'
import MusicCardList from './ContentComponents/MusicCardList';
export class NewestMusicComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props);
        return (
            <div className="newest-music-page">
               <h1 className="mb-5 mt-4">
                    Newest Songs
               </h1>
               <ul className="list-inline">
                <MusicCardList {...this.props} isInlineList={true} musicArray={this.props.newMusics}>

                </MusicCardList>
            </ul>
            </div>
        )
    }
}

export default NewestMusicComponent
