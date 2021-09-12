import React, { Component } from 'react';
import {SearchInput} from '../SearchUIComponents/SearchInput';
import {Header} from '../SearchUIComponents/Header';
import {SearchContent} from '../SearchUIComponents/SearchContent';
import { ErrorTemplate } from './ErrorTemplate';
export class SearchTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
           data: {musics: [], artists: [], albums: [], usermusics: []},
           error: null,
           sampleData: {musics: [], artists: [], albums: [], usermusics: []},
           searchValue: ""
        }
    }
    isEmptyResponse = (data)=>{
        if(typeof data === typeof {}){
            console.log(data['musics'],"Hsl;da")
            if(Object.keys(data).filter(key=>data[key].length !== 0).length !== 0){ // if have one or more not empty
                return false;
            }
            return true;
        }
    }   
  
    searchInputHandle = async (ev) => {
        this.props.toggleLoading(true);
        
        if(String(ev.target.value).match(new RegExp("[A-Z0-9]","gi")) !== null){
            
            let urlFetch = `/search/${ev.target.value}`;
            fetch(urlFetch,{
                method: "GET",
                mode: "cors",
            }).then((res)=>{
                return res.json()
            }).then(data=>{
                if(typeof data === typeof {}){
                   this.props.setPlaylist(data['musics']);
                    if(!this.isEmptyResponse(data)){
                        this.setState({data: data, searchValue: ev.target.value},()=>{
                            this.props.toggleLoading(false);
                        })
                    }  
                    else{
                        this.setState({data: this.state.sampleData, searchValue: ev.target.value},()=>{
                            this.props.toggleLoading(false);
                        });
                    }            
                }
                
            }).catch((error)=>{
                this.setState({error: error});
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
        if(this.state.error){
            contentRender = <h1>{this.state.error.messgae}</h1>
        }
         else{
    
            contentRender = <SearchContent requestPlayMusicFromSlug={this.props.requestPlayMusicFromSlug} searchValue={this.state.searchValue} data={this.state.data} ></SearchContent>
            
         }
        
         return (
            <div className="container-fluid">
            <Header>
                <SearchInput searchInputHanle={this.searchInputHandle} baseClasses={'w-25'}></SearchInput>
            </Header>
   
            {contentRender}
            
        </div>
         )
               
        
    }
        
}