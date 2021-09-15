import React, { Component,Suspense } from 'react';
import {Loading} from '../LoadingComponents/Loading.js';
const MusicTemplate = React.lazy(()=> import("./MusicTemplate.js").then(module=>({default: module.MusicTemplate})));


export class HomeTemplate extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount(){
       this.props.fetchHomeData();   
    }
    // lazyLoad(){
    //     let loadedData = this.state.data.musics
    //     this.setState({dataload: [...this.state.dataload,...this.state.musics.splice(0,20)]};

    // }
    render(){
        
        return <Suspense fallback={<Loading></Loading>}>
            {/* <MusicTemplate {...this.props} isHome={true} requestPlayMusicFromSlug={this.props.requestPlayMusicFromSlug} musics={this.props.playlist}>
            
            </MusicTemplate> */}
        </Suspense>
    }
}