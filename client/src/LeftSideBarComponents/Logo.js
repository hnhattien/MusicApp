import React,{Component} from 'react';
import logo from './logo.svg';

export class Logo extends Component{

    render(){
        return (
            <div className="logo-wrap identity-site-wrap w-100">
                <h4 className={"text-white  text-center"}>
                    <img src={logo} width={100} height={100}></img>
                </h4>
            </div>
        )
    }
}