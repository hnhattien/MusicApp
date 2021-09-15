import React, { Component } from 'react';
import {Loading} from './Loading';
import {MessageBox} from './MessageComponents/MessageBox';
export class Popup extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoad: false,
            isShowMessage: false
        }
    }
    toggleLoading = (isLoad) => {
        this.setState({load: isLoad});
    }
    showMessage = (isShow,text="",type,position={x:"50%",y:"50%"}) => {
        this.setState({showMessage: isShow});
    }
    render(){
        return<>
            {this.state.load && <Loading ></Loading>}
            {this.state.showMessage && <MessageBox></MessageBox>}  
            </>
        
    }
}