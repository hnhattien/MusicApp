
import React, { Component } from 'react';

export class Header extends Component {
    constructor(props){
      super(props);
    }

    render(){
        return(
            <div className="row">
                <header style={{height: "64px"}} className="pt-3">
                    {this.props.children}
                </header>
            </div>
        )
    }
}