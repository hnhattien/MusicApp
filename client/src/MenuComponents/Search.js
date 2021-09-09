import React, { Component } from 'react';
import {MenuLink} from './MenuLink';
export class Search extends Component {
  
    render(){
        return(
            <li {...this.props} className={`${this.props.className}`}>
                <MenuLink url="/search">
                    <div>
                    <span className="fas fa-search"></span> <span>Tìm kiếm</span>
                    </div>
                </MenuLink>
            </li>
        )
    }
}