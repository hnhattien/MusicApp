
import React, { Component } from 'react';

export class Header extends Component {
    constructor(props){
      super(props);
    }

    render(){
        return(
            <header style={{height: "64px"}} className="pt-3">
                {this.props.children}
            </header>
        )
    }
}