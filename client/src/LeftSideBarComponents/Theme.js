import React, { Component } from 'react';
import DarkThemeButton from './DarkThemeButton';
import LightThemeButton from './LightThemeButton';
export class Theme extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
            <li className="list-group-item">
                <DarkThemeButton></DarkThemeButton>
                <LightThemeButton></LightThemeButton>
            </li>
            </>
        )
    }
}

export default Theme;