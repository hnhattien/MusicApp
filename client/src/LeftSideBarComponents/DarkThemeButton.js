import React, { Component } from 'react'

export class DarkThemeButton extends Component {
    render() {
        return (
            <div title="Dark Theme" role="button" className="d-inline-block">
                <span style={{fontSize: "2rem"}}><i className="text-dark fas fa-circle"></i></span>
            </div>
        )
    }
}

export default DarkThemeButton
