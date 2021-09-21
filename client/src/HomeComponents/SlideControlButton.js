import React, { Component } from 'react'

export class SlideControlButton extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let previousBtnClasses =  this.props.translate.x <= 0 ? `text-secondary` : `text-white`;
        let nextBtnClasses =this.props.translate.x >= this.props.slideListWidth ? `text-secondary` : `text-white`;
        return (
            <>
            
               <div>
               <span onClick={this.props.previousSlide} role="button" className="previous-slide-btn slide-btn"><i role="button" className={`fas fa-chevron-left ${previousBtnClasses}`}></i></span>

<span onClick={this.props.nextSlide} role="button" className="next-slide-btn slide-btn"><i role="button" className={`fas ${nextBtnClasses} fa-chevron-right`}></i></span>
               </div>
            
            </>
        )
    }
}

export default SlideControlButton
