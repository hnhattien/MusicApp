import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
export class BannerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            offsetWidth: 0,
            offsetLeft: 0
        }
    }
    loadHanleSlideItem = (ev)=>{
        console.log(ev.target.offsetWidth)
        this.setState({
            offsetLeft : ev.target.offsetLeft,
            offsetWidth: ev.target.offsetWidth
        })
    }
    
    getBeforeWardSlideClasses = (slideIndex) => {
        let currentSlideIndex = this.props.currentSlideIndex;
        let beforewardClasses;
        if(currentSlideIndex === 0){
            beforewardClasses = (slideIndex === this.props.slideDataList.length-1) ? 'prev' : "";
        }
        else {
            beforewardClasses = currentSlideIndex === slideIndex + 1 ? 'prev' : "";
        }
        return beforewardClasses;
    }
    getAfterwardSlideClasses = (slideIndex) => {
        let currentSlideIndex = this.props.currentSlideIndex;
        let afterwardClasses;
            
        if(currentSlideIndex === this.props.slideDataList.length - 1){
            afterwardClasses = slideIndex === 0 ? "next" : "";
        }
        else{
            afterwardClasses = currentSlideIndex === slideIndex - 1 ? 'next' : "";
        }
        return afterwardClasses;
    }
    getCurrentSlideClass = (slideIndex) => {
        let currentSlideIndex = this.props.currentSlideIndex;
        return currentSlideIndex===slideIndex ? 'active' : ""
    }
    render() {
        let sliderList = this.props.slideDataList.map((data, index) => {
            let beforewardClasses = this.getBeforeWardSlideClasses(index);
            let afterwardClasses = this.getAfterwardSlideClasses(index);
            let activeClasses = this.getCurrentSlideClass(index);
             //index is index number of each li element
            return <li className={`${activeClasses}${beforewardClasses}${afterwardClasses}`} data-offsetwidth={this.state.offsetWidth} data-offsetleft={this.state.offsetLeft} onLoad={(ev)=>{this.loadHanleSlideItem(ev)}} key={index} index={index}>
                    <NavLink to={data.urlTo}>
                <div className="banner-wrap">
                    <img onLoad={(ev)=>{this.props.updateUlWidth(ev.target.offsetWidth)}} className="banner" src={data.image}>
                </img>
                </div>
                </NavLink>
                </li>
        })
            
         
        return (
            <>
             {sliderList}
        
            </>
        )
    }
}

export default BannerList
