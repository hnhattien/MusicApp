import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
export function BannerListItem(props){
    const [translateX, setTranslateX] = useState(0);
    const [intervalSlider, setIntervalSlider] = useState(null);
    const [offsetLeft, setoffsetLeft] = useState(0);
    const [offsetWidth, setoffsetWidth] = useState(0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  

    

    // componentDidMount = (ev) => {
        
        
    //     // // if(this.slideItemArr){
    //     // //     this.slideItemArr.current.querySelector("img").onload = ()=>{
    //     // //         this.setState({
    //     // //             offsetLeft: this.slideItemRef.current.offsetLeft,
    //     // //             offsetWidth: this.slideItemRef.current.offsetWidth
    //     // //         },()=>{
    //     // //             this.runBannerSlider();
    //     // //         })
    //     // //     }
    //     // // }
       
    // }
    
    
        let data = props.data;
        let index = props.index;
        return (

            <li className={`list-inline-item ${props.slideClass}`} onLoad={setupState}  style={{transform: `translate(${translateX})`}} data-offsetLeft={offsetLeft} data-offsetWidth={offsetWidth} style={{transform: `translateX(${translateX}px)`}}  key={index}>
                        <NavLink to={data.urlTo}>
                            <div className="banner-wrap">
                                <img className="banner" src={data.image}>
                                </img>
                            </div>
                        </NavLink>
            </li>
       )
    
}

export default BannerListItem
