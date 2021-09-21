import React, { Component,Suspense } from 'react';
import NewMusicSlide from '../HomeComponents/NewMusicSlide.js';
import {Loading} from '../LoadingComponents/Loading.js';
import '../HomeComponents/home.css';
const MusicTemplate = React.lazy(()=> import("./MusicTemplate.js").then(module=>({default: module.MusicTemplate})));


export class HomeTemplate extends Component {
    constructor(props){
        super(props);

    }
    componentWillMount = async () => {
        await this.props.fetchHomeData();
        console.log(this.props.newMusics);
        this.render();
    }
   
    // lazyLoad(){
    //     let loadedData = this.state.data.musics
    //     this.setState({dataload: [...this.state.dataload,...this.state.musics.splice(0,20)]};

    // }
    render(){
        
        return <Suspense fallback={<Loading></Loading>}>

            <div className="container-fluid index-page">
                <NewMusicSlide {...this.props}></NewMusicSlide>
            {/* <MusicTemplate {...this.props} isHome={true} requestPlayMusicFromSlug={this.props.requestPlayMusicFromSlug} musics={this.props.playlist}>
            
            </MusicTemplate> */}
            </div>
        </Suspense>
    }
}