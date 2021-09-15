import React,{ Component} from 'react';
import './loading.css';
export class Loading extends React.Component{
    constructor(props){
        super(props);
    }
   
    render(){
       
        
            return(
                <div style={{left: this.props.position.x,top:this.props.position.y}} className="loading-container position-absolute">
                    <div className="m-auto spinner-border spinner-wrap text-light" role="status">
                        <span className="sr-only" >Loading...</span>
                    </div>
                </div>
            )
        
         
        
    }
}