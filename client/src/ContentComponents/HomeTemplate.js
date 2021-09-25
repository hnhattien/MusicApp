import React, { Component,Suspense } from 'react';
import NewMusicSlide from '../HomeComponents/NewMusicSlide.js';
import {Loading} from '../LoadingComponents/Loading.js';
import '../HomeComponents/home.css';
import BannerSlider from '../BannerSliderComponents/BannerSlider.js';
// const MusicTemplate = React.lazy(()=> import("./MusicTemplate.js").then(module=>({default: module.MusicTemplate})));


export class HomeTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    componentWillMount = async () => {
        try {
          let res = await fetch('/index');
          let dataRes = await res.json();
          
          if(dataRes.error){
            this.props.showMessage(true,dataRes.error.message,"danger");
          }
          else{
            console.log(dataRes)
            this.setState({data: dataRes['musics']});
            this.props.setPlaylist([...dataRes['musics'].reverse()]);
          }
        }catch(err){
            this.props.showMessage(true,String(err),"danger");
        }

        setTimeout(()=>{
            this.props.showMessage(false);
        },2000);
        // await fetch("/index" ).then(res=>{
        //     return res.json();
        // }).then(data=>{
        
        //   if(data['musics']){
        //     if(this.state.currentMusic === null){
        //       this.setState({
        //         currentMusic: data['musics'][data['musics'].length-1],
        //         newMusics: data['musics']
        //       },()=>{
        //         console.log(this.state.newMusics)
        //       })
        //     }
           
            
           
        //   }     
        // })    
    }
   
    // lazyLoad(){
    //     let loadedData = this.state.data.musics
    //     this.setState({dataload: [...this.state.dataload,...this.state.musics.splice(0,20)]};

    // }
    render(){
        
        return <Suspense fallback={<Loading></Loading>}>

            <div className="container-fluid index-page">
                <BannerSlider></BannerSlider>
                {/* <NewMusicSlide newMusics={this.state.data} {...this.props}></NewMusicSlide> */}
            {/* <MusicTemplate {...this.props} isHome={true} requestPlayMusicFromSlug={this.props.requestPlayMusicFromSlug} musics={this.props.playlist}>
            
            </MusicTemplate> */}
            </div>
        </Suspense>
    }
}