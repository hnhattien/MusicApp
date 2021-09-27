import React, { Component } from 'react'
import './bannerslider.css';
import slideDataList from './banner-slider-data';
import BannerList from './BannerList';
export class BannerSlider extends Component {
    constructor(props){
        super(props);
        this.listRef = React.createRef();
        this.state = {
            ulWidth: 0,
            currentSlideIndex: 0,
            isShowSlideBtn : false,
            slideInterval : null
        }
    }
    // getTranslateX = (ev) => {
    //     this.liRefArray.forEach((li, index)=>{
    //         if(li && li.current){
    //             console.log(index, li.current.style.transform.translateX);
    //         }
    //     })
    // } 
    // componentDidMount = () => {
    //     this.setState({
    //         interval: setInterval(()=>{
    //            this.getTranslateX();
    //         },200)
    //     })
    // }
    nextSlide = (ev) => {
       if(!ev){
        if(this.state.currentSlideIndex >= slideDataList.length - 1){
            this.setState({
                currentSlideIndex: 0
            });
        }
        else{
            this.setState({
                currentSlideIndex: this.state.currentSlideIndex+1
            })
        }
       }
       else{
           if(this.state.currentSlideIndex >= slideDataList.length - 1){
               this.peekSlide(ev,0);
           }
           else{
               this.peekSlide(ev,this.state.currentSlideIndex+1);
           }
       }
    }

    componentWillUnmount = () => {  
        this.clearSlideInterval();
    }
    prevSlide = (ev) => {
        if(!ev){
            if(this.state.currentSlideIndex <= 0){
                this.setState({
                    currentSlideIndex: slideDataList.length - 1
                })
            }
            else{
                this.setState({
                    currentSlideIndex : this.state.currentSlideIndex - 1
                })
            }
        }
        else{
            if(this.state.currentSlideIndex <= 0){
                this.peekSlide(ev,slideDataList.length-1);
            }
            else{
                this.peekSlide(ev,this.state.currentSlideIndex-1);
            }
        }
    }
    updateUlWidth = (width) => {
        this.setState({
            ulWidth: this.state.ulWidth+width
        })
    }
    toggleShowSlideBtn = (ev,decision) => {
        if(decision === "show"){
            console.log(decision);
           this.setState({
               isShowSlideBtn: true
           })
        }
        else{
            console.log(decision);
            this.setState({
                isShowSlideBtn: false
            })
        }
    }

    peekSlide = (ev, toIndex) => {
        
        this.clearSlideInterval();        
        this.setState({
            currentSlideIndex: toIndex
        },()=>{
            setTimeout(()=>{
               this.setSlideInterval();
            },5000);
        })
    }
    clearSlideInterval = () => {
        clearInterval(this.state.slideInterval);
        this.setState({
            slideInterval: null
        })
    }
    setSlideInterval = () => {
        if(this.state.slideInterval === null){
            this.setState({
                slideInterval : setInterval(()=>{
                  this.nextSlide();
                },5000)
             })
        }
    }
    componentDidMount = () => {
        this.setSlideInterval();
    }
    render() {
       let slideBtnClass = this.state.isShowSlideBtn ? "show" : "";
        return (
            <div onMouseLeave={(ev)=>{this.toggleShowSlideBtn(ev,"hide")}} onMouseEnter={(ev) => {this.toggleShowSlideBtn(ev,"show")}} className="banner-slider-wrap position-absolute rounded">

                <div className="banner-slider banner-list-wrap">
                    <ul style={{width: `${this.state.ulWidth}px`}} className="banner-list list-inline" ref={this.listRef}>
                        <BannerList currentSlideIndex={this.state.currentSlideIndex} prevSlide={this.prevSlide} nextSlide={this.nextSlide} updateUlWidth={this.updateUlWidth} slideDataList={slideDataList}></BannerList>
                    </ul>
                    <div className="foreground-slider position-absolute top-0 h-100 w-100">
                        <div className={`next-slide-btn slide-btn-wrap ${slideBtnClass}`}>
                            <span onClick={this.nextSlide} className={`slide-btn`} role="button"><i class="fas fa-chevron-right"></i></span>
                        </div>
                        <div className={`prev-slide-btn slide-btn-wrap ${slideBtnClass}`}>
                            <span onClick={this.prevSlide} className={`slide-btn ${slideBtnClass}`} role="button"><i class="fas fa-chevron-left"></i></span>
                        </div>
                        <div className="slide-thumb-wrap position-absolute w-100 text-center">
                            {slideDataList.map((el,index)=>{
                                return <span onClick={(ev) => {this.peekSlide(ev,index)}} data-slide-index={index} className={this.state.currentSlideIndex === index ? "slide-thumb active" : "slide-thumb"} role="button">
                                    <i class="fas fa-circle"></i>
                                </span>
                            })}
                        </div>
                    </div>
                
                </div>
                
            </div>
        )
    }
}

export default BannerSlider
