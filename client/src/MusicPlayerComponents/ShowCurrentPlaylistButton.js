import React, { Component } from 'react'

export class ShowCurrentPlaylistButton extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="current-playlist-btn" onClick={this.props.toggleCurrentPlaylist} role="button">
                <span>Current Playlist</span>
            </div>
        )
    }
}

export default ShowCurrentPlaylistButton
