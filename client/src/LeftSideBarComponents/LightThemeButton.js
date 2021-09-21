import React, { Component } from 'react'

export class LightThemeButton extends Component {
    render() {
        return (
            <div role="button" className="d-inline-block" title="Light Theme">
                <span style={{fontSize: "2rem"}}><i className="text-white fas fa-circle"></i></span>
            </div>
        )
    }
}

export default LightThemeButton
