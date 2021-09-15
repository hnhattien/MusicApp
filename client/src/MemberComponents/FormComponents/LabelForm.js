import React, {Component} from "react";

export class LabelForm extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <label  className="text-white" htmlFor={this.props.label}>{this.props.text}</label>
        )
    }
}