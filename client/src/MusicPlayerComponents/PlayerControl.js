import React, { Component } from 'react';

export class PlayerControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            pauseicon: <i className="fas fa-pause"></i>,
            playicon: <i className="fas fa-play"></i>
        }
    }

    render(){

        let loopBtnClass = this.props.isLoop && 'text-primary' || 'text-white'
        let randomBtnClass = this.props.isRandom && 'text-primary' || 'text-white';
        return(
            <div className="player-tool-bar-wrap">
                <ul className="list-inline player-tool-bar d-flex justify-content-around">
                    <li className="list-inline-item">
                        <span  onClick={this.props.toggleRandom} role="button" className={`random-btn`}><i className={`fas fa-random ${randomBtnClass}`}></i></span>
                    </li>
                    <li className="list-inline-item">
                        <span onMouseDown={this.props.backwardHandle} role="button" className="text-white backward-btn"><i className="fas fa-fast-backward"></i></span>
                    </li>
                    <li className="list-inline-item">
                        {!this.props.isPlay && <span onClick={this.props.setPlayState} role="button" className="text-white play-btn">{this.state.playicon}</span>}
                        {this.props.isPlay && <span onClick={this.props.setPauseState} role="button" className="text-white play-btn">{this.state.pauseicon}</span>}
                    </li>
                    <li className="list-inline-item">
                        <span onMouseDown={this.props.forwardHandle} role="button" className="text-white forward-btn"><i className="fas fa-fast-forward"></i></span>
                    </li>
                    <li className="list-inline-item">
                        <span role="button" onClick={this.props.toggleLoop} className={`repeat-btn`}><i className={`fas fa-redo-alt ${loopBtnClass}`}></i></span>
                    </li>
                </ul>
            </div>
        )
    }
}