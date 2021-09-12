import React, {Component} from 'react';
export class TimeLine extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="time-line-wrap text-center">
                <div className="time-line">
                    <input step={1} type="range" className="w-100 px-2 mb-4 form-range" value={this.props.currentTime} onInput={this.props.peekHanlde} max={this.props.duration}>
                    </input>
                </div>
            </div> 
        )
    }
}