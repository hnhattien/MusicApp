import React, { Component } from 'react'
import './musiccard.css';
import MusicCardItem from './MusicCardItem';
import ActionOnMusicTemplate from './ActionOnMusicTemplate';
export class MusicCardList extends Component {
    constructor(props){
        super(props);
    }
   
    render() {
        let whichList = this.props.isInlineList ? 'list-inline-item' : 'list-group-item d-flex justify-content-between';
        return (
            <>
                {this.props.musicArray.map((music, index) => {
                    return <li className={`${whichList} music-wrap bg-dark position-relative border-0`} key={index}>
                        <MusicCardItem  music={music} {...this.props}>

                        </MusicCardItem>
                        {!this.props.isInlineList && !this.props.isHideHeart && <ActionOnMusicTemplate music={music} isHearted={music.liked === true ? true : false} {...this.props}></ActionOnMusicTemplate>}
                    </li>
    
    
                })}
            </>
        )
    }
}

export default MusicCardList
