import React, {Component} from 'react';

export class ValidFeedbackLabel extends Component {
    constructor(props){
        super(props);
    }

    render(){
        
        return (
            <small className="validfeedback text-success">
                Looks good!
            </small>
        )
    }
}