import React,{ Component} from 'react';
import './loading.css';
import shape from './loading.svg';
export class Loading extends React.Component{
    constructor(props){
        super(props);
    }

    render(){


            return(
                <div  className="loading-container position-fixed">
                    {/*<div className="m-auto position-relative spinner-border spinner-wrap text-light" role="status">
                        <span className="sr-only" ></span>
                    </div>*/}

                   <img className="img" src={shape}/>

                </div>
            )



    }
}
