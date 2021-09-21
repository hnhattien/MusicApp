import React, { Component } from 'react'
import './musiccard.css';
import MusicCardItem from './MusicCardItem';
export class MusicCardList extends Component {
    constructor(props){
        super(props);
    }
   
    render() {
        let whichList = this.props.isInlineList ? 'list-inline-item' : 'list-group-item';
        return (
            <>
                {this.props.musicArray.map((music, index) => {
                    return <li className={`${whichList} music-wrap bg-dark position-relative border-0`} key={index}>
                        <MusicCardItem  music={music} {...this.props}>

                        </MusicCardItem>
                    </li>
    
    
                })}
            </>
        )
    }
}

export default MusicCardList
