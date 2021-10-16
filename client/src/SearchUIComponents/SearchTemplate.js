import React, { Component } from 'react';
import {SearchInput} from './SearchInput';
import {Header} from './Header';
import {SearchContent} from './SearchContent';
import { ErrorTemplate } from '../ContentComponents/ErrorTemplate';
export class SearchTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
           data: {musics: [], artists: [], albums: []},
           error: null,
           sampleData: {musics: [], artists: [], albums: []},
           searchValue: ""
        }
    }
    // isEmptyResponse = (data)=>{
    //     if(typeof data === typeof {}){
    //         console.log(data['musics'],"Hsl;da")
    //         if(Object.keys(data).filter(key=>data[key].length !== 0).length !== 0){ // if have one or more not empty
    //             return false;
    //         }
    //         return true;
    //     }
    // }   
    // componentWillMount = ()=>{
    //     if(localStorage.getItem("searchHistory") === null){
    //         localStorage.setItem("searchHistory",[]);
    //     }
    // }
    searchInputHandle = async (ev) => {
        this.props.toggleLoading(true);
        
        if(String(ev.target.value).match(new RegExp("[A-Z0-9]","gi")) !== null){
            // if(String(ev.target.value).length > 4){
            //     if(localStorage.getItem("searchHistory")){
            //         let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
            //         localStorage.setItem("searchHistory",[...searchHistory,ev.target.value]);
            //     }
            //     else{
            //         localStorage.setItem("searchHistory",[ev.target.value]);
            //     }
            // } 
            let urlFetch = `/search/${ev.target.value}`;
            fetch(urlFetch).then((res)=>{
                return res.json()
            }).then(dataRes=>{
                
                if(dataRes.error){
                    this.props.showMessage(true,dataRes.error.message,"danger");
                                        
                }
                else{
                    this.props.setPlaylist(dataRes['musics']);
                    this.setState({
                        data: dataRes,
                        searchValue: ev.target.value
                    })
                }
            }).catch((err)=>{
                this.props.showMessage(true,String(err),"danger");
            }).then(()=>{
                this.props.toggleLoading(false);
               
            })
        }
        else{
            this.setState({data: this.state.sampleData, searchValue: ev.target.value}, ()=>{
                this.props.toggleLoading(false);
            });
        }
        
    }

    render(){
        let contentRender = "";
        if(this.state.searchValue.length === 0){
            contentRender = "Content when not type input yet";
        }
        else{
    
            contentRender = <SearchContent isSearch={true} {...this.props} requestPlayMusicFromSlug={this.props.requestPlayMusicFromSlug} searchValue={this.state.searchValue} data={this.state.data} ></SearchContent>
            
        }
        
         return (
            <div className="container-fluid">
            <Header>
                <SearchInput searchInputHanle={this.searchInputHandle} baseClasses={'w-25'}></SearchInput>
            </Header>
   
            {contentRender}
            {/* {JSON.parse(localStorage.getItem("searchHistory")).map((his)=>{
                return <h1>{his}</h1>
            })} */}
        </div>
         )
               
        
    }
        
}