import React, { Component } from 'react';
import { MenuLink } from './MenuLink';

export class Home extends Component {
    render(){
        return(
            <li {...this.props}>
                <MenuLink url={'/'}>
                <div>
                   <span className="fas fa-home"></span> <span>Trang chủ</span>
                   
                </div>
                </MenuLink>
            </li>
        )
    }
}