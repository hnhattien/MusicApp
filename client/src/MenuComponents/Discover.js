import React, { Component } from 'react';
import { MenuLink } from './MenuLink';
import './discovermenu.css';
export class Discover extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShow : false
        }
    }
    toggleDropList = (ev)=>{
        this.setState({
            isShow: !this.state.isShow
        })
    }
    render(){
        let styleDroptShowing = this.state.isShow ? {height: "80px",width:"100%"} : {height: "0px", width:"0px"};
        return(
            <li {...this.props}>
                <div onClick={this.toggleDropList} className="discover-link-wrap" role="button">
                    <span><i className="fas fa-globe-europe"></i></span><span>Khám phá</span>
                </div>
                <div style={styleDroptShowing} className="discover-dropdown-link-wrap">
                    <div className="discover-link">
                        <MenuLink className={``} url='/discover/category'>                       
                            <span>Category</span>              
                        </MenuLink>  
                    </div>
                    <div className="discover-link">
                        <MenuLink className={``} url='/discover/album'>                    
                        <span>Album</span>
                        </MenuLink>  
                    </div>
                </div>
                
                
                
            </li>
        )
    }
}