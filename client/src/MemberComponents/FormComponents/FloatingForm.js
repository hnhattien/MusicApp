import React, { Component } from 'react';

export class FloatingForm extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="form-floating mb-3">
                {this.props.children}
                
            </div>
        )
    }
}