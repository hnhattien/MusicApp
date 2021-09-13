import React, {Component} from 'react';

export class SubmitButton extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <button name={this.props.name} className={this.props.classes}>{this.props.text}</button>
        )
    }
}