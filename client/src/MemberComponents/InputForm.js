import React, {Component} from "react";

export class InputForm extends Component {
    constructor(props){
        super(props);
      
    }

    render(){
        return(
            <input placeholder={this.props.placeholder} name={this.props.name} id={this.props.id} className={this.props.classes} type={this.props.type}>
            </input>
        )
    }
}