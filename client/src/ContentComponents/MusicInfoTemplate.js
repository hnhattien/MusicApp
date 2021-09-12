import React, { Component } from 'react';

export class MusicInfoTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            error: null
        }
    }
    isEmptyResponse = (data)=>{
        if(typeof data === typeof {}){
            
            if(Object.keys(data).filter(key=>data[key].length !== 0).length !== 0){ // if have one or more not empty
                return false;
            }
            return true;
        }
    }  
    displayInfoMusic = (slug)=>{
        fetch(slug).then((res)=>{
            return res.json();
        }).then(data=>{
           this.setState({data: data});
        }).catch(err=>{
           this.setState({error: err});            
        })
    }
    render(){
        if(this.state.data === null){
            return <h1>No Data</h1>
        }
        else if(this.state.error){
            return <h1>{this.state.error.message}</h1>
        }
        else{
           return <h1></h1>
        }
    }
}