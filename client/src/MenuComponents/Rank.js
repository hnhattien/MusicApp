import React, { Component } from 'react';
import { MenuLink } from './MenuLink';

export class Rank extends Component {
    render(){
        return(
            <li {...this.props}>
                <MenuLink url={'/rank'}>
                <div>
                   <span><i className="fas fa-chart-line"></i></span> <span>Rank</span>
                </div>
                </MenuLink>
            </li>
        )
    }
}