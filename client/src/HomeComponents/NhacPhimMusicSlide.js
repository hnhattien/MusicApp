import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import MusicCardList from '../ContentComponents/MusicCardList';
import SlideControlButton from './SlideControlButton';
export class NhacPhimMusicSlide extends Component {
    constructor(props) {
        super(props);
        this.slideList = React.createRef();
        this.slideListWrap = React.createRef();
        this.state = {
            translate: {
                x: 0,
                y: 0,
                z: 0
            },
            data: [],
            slideListWidth: 0,
            slideViewportWidth: 0,
            getOffsetWidthSlideInterval : null
        }
    }
    getWidthSlideInterval = () =>{
        
        return setInterval(()=>{
            try{
                if(this.slideList && this.slideListWrap){
                    let slideListWidth = this.slideList.current.offsetWidth;
                    let slideViewportWidth = this.slideListWrap.current.offsetWidth;
                    this.setState((prevState,prevProps)=>{
                        let newState = {};
                        if(slideViewportWidth !== prevState.slideViewportWidth){
                            newState['slideListWidth'] = slideListWidth;
                        }
                        if(slideListWidth !== prevState.slideListWidth){
                            newState['slideViewportWidth'] = slideViewportWidth;
                        }
                        return newState;
                    },()=>{
                        if(this.state.slideListWidth!==0 && this.state.slideViewportWidth !==0){
                            clearInterval(this.state.getOffsetWidthSlideInterval);
                        }
                    })
                }
            }
            catch(err){

            }
        },100);
    }
    handleResize = () => {
        console.log(this.state);
        if(this.slideListWrap && this.slideListWrap.current && this.slideList && this.slideList.current){
            this.setState({
                slideViewportWidth: this.slideListWrap.current.offsetWidth,
                slideListWidth: this.slideList.current.offsetWidth
            })
        }
    }
    initialSlideInterval = () =>{
        
        this.setState({getOffsetWidthSlideInterval: this.getWidthSlideInterval()});
       
    }
    componentWillUnmount = () => {
        clearInterval(this.state.getOffsetWidthSlideInterval);
    }
    componentDidMount = async ()=>{

       window.addEventListener("resize",this.handleResize);
       this.initialSlideInterval();
       try {
        let res = await fetch('/song/category/nhac-phim');
        let musics = await res.json();
        
        if(musics.error){
          this.props.showMessage(true,musics.error.message,"danger");
        }
        else{
          console.log(musics)
          this.setState({data: musics});
        }
      }catch(err){
          this.props.showMessage(true,String(err),"danger");
      }

     
    }
    nextSlide = () => {
        if(this.state.translate.x < this.state.slideListWidth){
            this.setState((state, props)=>{
                let translate = {};
                translate.x = state.translate.x + state.slideViewportWidth -100;
                translate.y = 0;
                translate.z = 0;
                return {translate};
            })
            
        }
        else{
            this.setState((state, props)=>{
                let translate = {};
                translate.x = this.state.translate.x;
                translate.y = 0;
                translate.z = 0;
                return {translate};
            })
        }
        
    }
    previousSlide = () => {
       if(this.state.translate.x > 0){
         
            
            console.log(this.state);
            this.setState((state, props)=>{
                let translate = {};
                translate.x = state.translate.x - state.slideViewportWidth +100;
                translate.y = 0;
                translate.z = 0;
                return {translate};
            })
       }
       else{
        this.setState((state, props)=>{
            let translate = {};
            translate.x = 0;
            translate.y = 0;
            translate.z = 0;
            return {translate};
        })
       }
    }


    render() {
        return (
            <>
                <div style={{top: this.props.styleTop}} className={`row new-music-slider-wrap ${this.props.cardSlideClass}`}>

                    <div className="col-12 slide-wrap" id="nhacphimslideWrap">
                        <div className="new-songs-link-wrap">
                        
                            <div className="top-slide">
                  
                                <div className="control-slide-btn-wrap">
                                    <SlideControlButton slideViewportWidth={this.state.slideViewportWidth} slideListWidth={this.state.slideListWidth} translate={this.state.translate}  previousSlide={this.previousSlide} nextSlide={this.nextSlide}
                                    >

                                    </SlideControlButton>
                                </div>
                            </div>
                        </div>
                       
                   
                           <div ref={this.slideListWrap} className="slide-list-wrap">
                           <NavLink to={`/category/nhac-phim`} exact={true}>
                           <h4>{this.props.heading}</h4>
                            </NavLink>
                                <ul ref={this.slideList} style={{transform: `translate3d(-${this.state.translate.x}px,0px,0px)`}} className={`list-inline position-relative slide-list`}>
                                    <MusicCardList isInlineList={true} {...this.props} musicArray={this.state.data}>
                                    </MusicCardList>
                                </ul>

                            </div>
                        

                 
                    </div>
                </div>
            </>
        )
    }
}

export default NhacPhimMusicSlide
