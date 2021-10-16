import React, {Component} from 'react';

export class InvalidFeedbackLabel extends Component {
    constructor(props){
        super(props);
    }

    render(){

        return(
            <small style={{color: "#dc3545", height: "20px"}} className="invalidfeedback">
               {this.props.validator.isValid === false && this.props.validator.text}
            </small>
        )
    }
}