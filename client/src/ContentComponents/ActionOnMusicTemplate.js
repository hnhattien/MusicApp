import React, { Component } from 'react'

export class ActionOnMusicTemplate extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let heartbtnClasses = (this.props.isHearted === true) ? "fas" : 'far';
        return (
            <div className="action-on-music-wrap position-absolute">
                <ul className="list-inline">
                                    {/* <li className="list-inline-item me-4">
                                                <span role="button"><i className="fas fa-play"></i></span>
                                            </li> */}
                    <li className="list-inline-item me-4">
                        <span data-id={this.props.music.id} onClick={this.props.handleHeartAction} role="button"><i data-id={this.props.music.id} className={`fa-heart ${heartbtnClasses}`}></i></span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ActionOnMusicTemplate
