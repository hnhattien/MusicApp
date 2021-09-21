import React, {Component} from 'react';
import './messagebox.css';
export class MessageBox extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
           <div className="message-wrap">
               <div className={`alert alert-${this.props.type} message`} role="alert" >
               {this.props.text}
           </div>
           </div>
        )
    }
}