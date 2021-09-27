import React, { Component } from 'react'
import './miniplayer.css';
export class MiniPlayer extends Component {
    constructor(props){
        super(props);
    }
    render() {
        
        let currentMusic = this.props.getCurrentMusic();
        console.log(currentMusic,"Hi");
        return (
            currentMusic ? <div className="position-fixed bg-light rounded mini-player bottom-0 d-flex flex-column">
                    <div className="song-info">
                        <h4 className="text-dark">{currentMusic && currentMusic.title}</h4>
                    </div>
                    <div className="control-btn d-flex justify-content-between">
                        <div className="mini-music-controller">
                            {!this.props.isPlay && <span onClick={this.props.setPlayState} role="button" className="text-dark play-btn me-4"><i className="fas text-dark fa-play"></i></span>}
                            {this.props.isPlay && <span onClick={this.props.setPauseState} role="button" className="text-dark play-btn"><i className="fas text-dark fa-pause"></i></span>}
                            {<span onMouseDown={this.props.forwardHandle} role="button" className="text-dark forward-btn"><i className="fas text-dark fa-fast-forward"></i></span>}
                        </div>
                        <div className="player-display-control">
                            <span role="button" onClick={this.props.showPlayer}>
                            <i class="text-dark fas fa-chevron-up"></i>
                            </span>
                        </div>
                    </div>
                </div> : ""
        )
    }
}

export default MiniPlayer
