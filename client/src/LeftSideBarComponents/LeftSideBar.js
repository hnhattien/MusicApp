import React,{Component} from 'react';
import {Logo} from './Logo';
import {MemberToolMenu} from './MemberToolMenu';
import { MusicMenu } from '../MusicMenu';
import {NavLink} from 'react-router-dom';
import './leftsidebar.css';
export class LeftSideBar extends Component{
    constructor(props){
        super(props);
    }
    render(){
      let displaySideBarClass = this.props.isShowSideBar ? 'show' : 'hide';
        return(
            <div className={`${displaySideBarClass} col-2 all-tool-wrap d-none d-sm-block menu-wrap fixed-width left-side-bar vh-100 top-0 bg-dark p-0`}>
                 <Logo>
                 </Logo>
                 <MemberToolMenu {...this.props}>

                 </MemberToolMenu>
                 <MusicMenu className="list-group text-white pt-5" itemPadding={'py-2'} background="#212529" itemBgHex="#212529"></MusicMenu>
                <div className="upload-link-wrap">
                    <NavLink className="upload-link " to="/upload" exact={true}>
                        <span>
                        <i class="fas fa-upload"></i>
                        </span>
                    </NavLink>
                </div>
            </div>
        )
    }
}
