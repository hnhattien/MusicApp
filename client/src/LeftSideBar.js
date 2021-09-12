import React,{Component} from 'react';
import {Logo} from './Logo';
import {MemberToolMenu} from './MemberToolMenu';
import { MusicMenu } from './MusicMenu';
export class LeftSideBar extends Component{
    render(){
        return(
            <div className="col-2 all-tool-wrap d-none d-sm-block menu-wrap fixed-width left-side-bar vh-100 top-0 bg-dark p-0">
                 <Logo>
                 </Logo>
                 <MemberToolMenu>

                 </MemberToolMenu>
                 <MusicMenu className="list-group text-white pt-5" itemPadding={'py-2'} background="#212529" itemBgHex="#212529"></MusicMenu>
                 
            </div>
        )
    }
}