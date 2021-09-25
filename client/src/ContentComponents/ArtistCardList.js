import React, { Component } from 'react'
import ArtistCardItem from './ArtistCardItem';

export class ArtistCardList extends Component {
    render() {
        let whichList = this.props.isInlineList ? 'list-inline-item' : 'list-group-item';
        return (
            <>
                {this.props.artistArray.map((artist, index) => {
                    return <li className={`${whichList} artist-wrap bg-dark position-relative border-0`} key={index}>
                        <ArtistCardItem  artist={artist} {...this.props}>

                        </ArtistCardItem>
                    </li>
    
    
                })}
            </>
        )
    }
}

export default ArtistCardList
