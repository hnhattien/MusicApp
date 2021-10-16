import React, { Component } from 'react';
import Theme from './Theme';
import LogoutButton from './LogoutButton';

export class SettingMenu extends Component {
    constructor(props){
        super(props);
        this.detectClickOutside = React.createRef();
        
    }
    componentDidMount() {
        document.addEventListener("mousedown",this.handleClickOutsidePopup);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown",this.handleClickOutsidePopup);
    }
    handleClickOutsidePopup = (ev) => {
       if(this.detectClickOutside && !this.detectClickOutside.current.contains(ev.target)){
            this.props.toggleSettingMenu();
       }
    }
    render(){
        return(
            <ul ref={this.detectClickOutside} className="list-group bg-dark settingmenu">
                
                {localStorage.getItem("userid") !== null && <LogoutButton {...this.props}></LogoutButton>}
            </ul>
        )
    }
}

export default SettingMenu;