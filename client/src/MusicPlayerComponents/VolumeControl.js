import React, { Component } from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './volumecontrol.css';

export class VolumeControl extends Component {
    constructor(props){
        super(props);
        this.volumeBtnRef = React.createRef();
        this.state = {
            isShowVolumeBar: false,
            value: 100
        }
    }
    showVolumeBar = (ev) => {
        if(this.volumeBtnRef){
            this.volumeBtnRef.current.classList.add("show-volume-bar");
        }
    }

    hideVolumeBar = (ev) => {
        if(this.volumeBtnRef){
            this.volumeBtnRef.current.classList.remove("show-volume-bar");
        }
    }
    render() {
        return (
            <div className="volume-control-wrap">
                
                
                <span ref={this.volumeBtnRef} onMouseOver={this.showVolumeBar} onMouseOut={this.hideVolumeBar} className="text-white volume-btn" role="button" >
                <div className="volume-control-bar-wrap position-relative">
                <InputRange maxValue={100} value={this.state.value} onChange={value=>{this.setState({value})}} minValue={0} step={`1`}></InputRange>       
                </div>
                <div onMouseOver={this.showVolumeBar} onMouseOut={this.hideVolumeBar} className="slider-zone-wrap">

                </div>
                    <i class="fas fa-volume-up"></i>
                </span>
               
               
            </div>
        )
    }
}

export default VolumeControl
