import React, {Component} from 'react';

export class MessageBox extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
           <div className={`alert alert-${this.props.type}`} role="alert" style={{position: "absolute", top: this.props.position.y, left: this.props.position.x}}>
               {this.props.text}
           </div>
        )
    }
}