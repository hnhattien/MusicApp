import React, { Component } from 'react';

export class ErrorTemplate extends Component {
    constructor(props){
        super(props);
    }
    render(){

        return(
            <h1 className="text-warning">{this.props.message}</h1>
        )
    }
}