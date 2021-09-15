import React, {Component} from 'react';

export class InvalidFeedbackLabel extends Component {
    constructor(props){
        super(props);
    }

    render(){

        return(
            <small style={{color: "#dc3545"}} className="invalidfeedback">
               {this.props.text}
            </small>
        )
    }
}