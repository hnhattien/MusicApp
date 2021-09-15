import React, {Component} from "react";

export class InputForm extends Component {
    constructor(props){
        super(props);
      
    }

    render(){
        return(
            <input onChange={this.props.handleChange} onBlur={this.props.handleBlur} value={this.props.value} onChange={this.props.handleChange} placeholder={this.props.placeholder} name={this.props.name} id={this.props.id} className={this.props.classes} type={this.props.type}>
            </input>
        )
    }
}