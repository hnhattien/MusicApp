import React, { Component } from 'react';

import {PlayerBottom} from './PlayerBottom';

import {PlayerTop} from './PlayerTop';
export class PlayerTemplate extends Component {
    constructor(props){
        super(props);
       
    }
    
    render(){
        return (
            <React.Fragment>
                <div  className="player d-flex flex-column justify-content-between h-100">
                    <PlayerTop isPlay={this.props.isPlay} currentMusic={this.props.currentMusic}>

                    </PlayerTop>
                    
                    <PlayerBottom {...this.props}>
                        
                    </PlayerBottom>
                    {/* {console.log("Music1",this.props.currentMusic,"Ref",this.audioRef,this.props.isPlay)} */}

                    
                   
                    
                </div>
            </React.Fragment>
        )
        
    }
  
}