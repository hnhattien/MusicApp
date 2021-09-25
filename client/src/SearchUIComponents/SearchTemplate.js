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
  
    searchInputHandle = async (ev) => {
        this.props.toggleLoading(true);
        
        if(String(ev.target.value).match(new RegExp("[A-Z0-9]","gi")) !== null){
            
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
                setTimeout(()=>{
                    this.props.showMessage(false);
                },1000);
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
            contentRender = "Input"
        }
        else{
    
            contentRender = <SearchContent {...this.props} requestPlayMusicFromSlug={this.props.requestPlayMusicFromSlug} searchValue={this.state.searchValue} data={this.state.data} ></SearchContent>
            
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