import React, { Component } from 'react'

export class AvatarCustomizeMenu extends Component {
    render() {
        return (
            <>
            <ul className="list-group avatar-customize-menu position-absolute">
                <li onClick={this.props.changeAvatar} className="list-group-item" role="button">
                    <span><strong>Change avatar</strong></span>
                </li>
                
            </ul>
            
            </>
        )
    }
}

export default AvatarCustomizeMenu
