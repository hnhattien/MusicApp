import React, {Component} from 'react';
import { SettingMenu } from './SettingMenu';

export class SettingButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowMenu: false
        }
    }

    toggleSettingMenu = (ev) => {
        
       if(this.state.isShowMenu){
           this.setState({isShowMenu: false});
       }
       else{
        this.setState({isShowMenu: true});
       }
    }
    render(){
        return(
            <div className="setting-wrap position-relative">
                <div className="setting-btn-wrap">
                   <span onClick={this.toggleSettingMenu} role="button"><i className="fa-cog fa text-white"></i></span>
                </div>
                <div className="bg-dark setting-menu-wrap position-absolute">
                {this.state.isShowMenu && <SettingMenu  {...this.props} toggleSettingMenu={this.toggleSettingMenu}>

</SettingMenu>}
                </div>
            </div>
        )
    }
}

export default SettingButton;