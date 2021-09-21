import React, { Component } from 'react'

export class AvatarCustomizeToolList extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <ul className="list-inline setting-avatar-customize-tool-list">
                <li className="list-inline-item">
                    <span className="zoomin-btn tool-btn text-dark" type="button">
                        <span className="text-dark">+</span>
                    </span>
                </li>
                <li className="list-inline-item">
                    <span className="zoomout-btn tool-btn text-dark" type="button">
                        <span className="text-dark">-</span>
                    </span>
                </li>
                <li className="list-inline-item">
                    <span className="left-rotate-btn tool-btn text-dark" type="button">
                        <span className="text-dark"><i className="fas fa-undo text-dark"></i></span>
                    </span>
                </li>
                <li className="list-inline-item">
                    <span className="right-rotate-btn tool-btn text-dark" type="button">
                        <span className="text-dark"><i className="fas fa-redo text-dark"></i></span>
                    </span>
                </li>
            </ul>
        )
    }
}

export default AvatarCustomizeToolList
