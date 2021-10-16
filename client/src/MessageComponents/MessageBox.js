import React, {Component} from 'react';
import './messagebox.css';
export class MessageBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayTimeOut : null
        }
    }
    registerDisplayTimeOut = (ev) => {
        if(!this.state.displayTimeOut){
            this.setState({
                displayTimeOut : setTimeout(()=>{
                    this.props.showMessage(false);
                },4000)
            })
        }
    }
    unregisterDisplayTimeout = (ev) => { 
        clearTimeout(this.state.displayTimeOut);
        this.setState({
            displayTimeOut: null,
        })
    }
    componentDidMount = () => {
        this.registerDisplayTimeOut();      
    }
    render(){
        return(
           <div className="message-wrap" onMouseOver={this.unregisterDisplayTimeout} onMouseLeave={this.registerDisplayTimeOut}>
               <div className={`alert alert-${this.props.type} message`} role="alert" >
               {this.props.text}
           </div>
           </div>
        )
    }
}