import React, { Component } from 'react';
import { TimeLine } from './TimeLine';

import {PlayerControl} from './PlayerControl';

export class PlayerBottom extends Component {
    constructor(props){
        super(props);
    };
    render(){
        return (
            <div className="bottom-player-wrap mb-5">
                <TimeLine {...this.props}></TimeLine>
                <PlayerControl {...this.props}>
                
                </PlayerControl>
            </div>
        )
    }
}