import React, { Component } from 'react';
import { MenuLink } from './MenuLink';
export class Discover extends Component {
    render(){
        return(
            <li {...this.props}>
                <MenuLink url='/discover'>
                <div>
                   <span><i className="fas fa-globe-europe"></i></span> <span>Khám phá</span>
                </div>
                </MenuLink>
            </li>
        )
    }
}