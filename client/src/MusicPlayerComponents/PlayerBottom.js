import React, { Component } from 'react';
import { TimeLine } from './TimeLine';

import {PlayerControl} from './PlayerControl';
import ExtraOptionButton from './ExtraOptionButton';
import ShowCurrentPlaylistButton from './ShowCurrentPlaylistButton';
import ActionOnMusicTemplate from '../ContentComponents/ActionOnMusicTemplate';
export class PlayerBottom extends Component {
    constructor(props){
        super(props);
    };
    render(){
        let playlist = this.props.getPlaylist()

        let currentMusic = playlist.filter(music => music.id === this.props.getCurrentMusic().id)[0] || {}; 
        //Get current music by playlist to receive updated changes through updateLikeChange method
        
        return (
            <div className="bottom-player-wrap">
                <div className="extra-function-tool-bar-wrap position-relative">
                    <ul className="extra-tool-list list-inline d-flex justify-content-around">
                        <li className="list-inline-item">
                          <ExtraOptionButton {...this.props}></ExtraOptionButton>
                        </li>
                        <li className="list-inline-item">
                          <ShowCurrentPlaylistButton toggleCurrentPlaylist={this.props.toggleCurrentPlaylist}>
                          </ShowCurrentPlaylistButton>  
                        </li>
                        <li className="list-inline-item">
                          <ActionOnMusicTemplate {...this.props} showMessage={this.props.showMessage} music={currentMusic}></ActionOnMusicTemplate>
                        </li>
                    </ul>
                </div>
                <TimeLine {...this.props}></TimeLine>
                <PlayerControl {...this.props}>
                
                </PlayerControl>
            </div>
        )
    }
}