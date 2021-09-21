import React, { Component } from 'react';

import { PlayerBottom } from './PlayerBottom';

import { PlayerTop } from './PlayerTop';
export class PlayerTemplate extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let playersDisplayClasses = this.props.isShowedPlayer ? 'd-flex' : 'd-none';
        return (
            this.props.currentMusic && <React.Fragment>
                
                    <div  style={{ backgroundImage: `url("/upload/musics/thumbnails/${this.props.currentMusic.thumbnail}")` }} className="player-background">
                    </div>
                    <div className={`player ${playersDisplayClasses} flex-column justify-content-between h-100`}>
                        <PlayerTop isPlay={this.props.isPlay} currentMusic={this.props.currentMusic}>

                        </PlayerTop>

                        <PlayerBottom {...this.props}>

                        </PlayerBottom>
                        {/* {console.log("Music1",this.props.currentMusic,"Ref",this.audioRef,this.props.isPlay)} */}




                    </div>
                
            </React.Fragment>
        )

    }

}