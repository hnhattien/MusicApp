import React, { Component,Suspense } from 'react';
import NewMusicSlide from '../HomeComponents/NewMusicSlide.js';
import {Loading} from '../LoadingComponents/Loading.js';
import '../HomeComponents/home.css';
const BannerSlider = React.lazy(()=> import('../BannerSliderComponents/BannerSlider.js'))
const AlbumSlide = React.lazy(()=> import('../HomeComponents/AlbumSlide.js'));
const NhacPhimMusicSlide = React.lazy(()=>import('../HomeComponents/NhacPhimMusicSlide.js'));

const RemixMusicSlide = React.lazy(()=>import('../HomeComponents/RemixMusicSlide'));
const RapMusicSlide = React.lazy(()=>import('../HomeComponents/RapMusicSlide'));
const NhacTreMusicSlide = React.lazy(()=>import('../HomeComponents/NhacTreMusicSlide'));
const BoleroMusicSlide = React.lazy(()=>import('../HomeComponents/BoleroMusicSlide'));
// const MusicTemplate = React.lazy(()=> import("./MusicTemplate.js").then(module=>({default: module.MusicTemplate})));


export class HomeTemplate extends Component {
    constructor(props){
        super(props);
    }
   
   
    // lazyLoad(){
    //     let loadedData = this.state.data.musics
    //     this.setState({dataload: [...this.state.dataload,...this.state.musics.splice(0,20)]};

    // }
    render(){
        
        return <Suspense fallback={<Loading></Loading>}>

            <div className="container-fluid index-page">
                <BannerSlider bannerSlideClass={'banner-slide-wrap'}></BannerSlider>
                <NewMusicSlide styleTop={"30rem"} heading={"News"} cardSlideClass={'new-music-slider-wrap card-slide-wrap'} {...this.props}></NewMusicSlide>
                <AlbumSlide styleTop={"55rem"} heading={"Albums"} cardSlideClass={'new-album-slider-wrap card-slide-wrap'} {...this.props}>

                </AlbumSlide>
                <NhacPhimMusicSlide styleTop={"80rem"} heading="Nhac Phim" {...this.props} cardSlideClass="nhac-phim-slider-wrap card-slide-wrap"></NhacPhimMusicSlide>
                <RemixMusicSlide styleTop={"105rem"} heading="Nhac Remix" cardSlideClass={'remix-music-slider-wrap card-slide-wrap'} {...this.props}></RemixMusicSlide>
                <BoleroMusicSlide styleTop={"130rem"} heading="Nhac Bolero" {...this.props} cardSlideClass={'bolero-music-slider-wrap card-slide-wrap'}></BoleroMusicSlide>
                <RapMusicSlide styleTop={"180rem"} heading="Nhac Rap" {...this.props} cardSlideClass={'rap-music-slider-wrap card-slide-wrap'}></RapMusicSlide>
                <NhacTreMusicSlide styleTop={"155rem"} heading={"Nhac Tre"} cardSlideClass={'remix-music-slider-wrap card-slide-wrap'} {...this.props}></NhacTreMusicSlide>
            {/* <MusicTemplate {...this.props} isHome={true} requestPlayMusicFromSlug={this.props.requestPlayMusicFromSlug} musics={this.props.playlist}>
            
            </MusicTemplate> */}
            </div>
        </Suspense>
    }
}