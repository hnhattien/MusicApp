import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components';

const NavBarList = styled.ul.attrs((props)=>({
    className: "list-group"
}))`
    & > *{
        margin-top: 5px;
    }
    & > * a:hover{
        color: black !important;
    }
`;

const Logo = styled.h1`
&,h1,h2,h3,h4,h5,h6{
  color: white;
}

`;

// const MenuButton = styled.button.attrs((props)=>({
//     className: "btn btn-dark rounded"
// }))`

// `
export class AdminSideBar extends Component {
  constructor(props){
    super(props);
    this.sidebarRef = React.createRef();

  }

    render() {
        return (
            <div ref={this.sidebarRef} className="col-md-3 d-md-block d-none top-0 bg-dark vh-100">
                <Logo>Admin SE447 Music App</Logo>
                <NavBarList>

                    <li className="btn btn-light list-group-item rounded">
                        <NavLink className="btn link-btn text-dark" to={'/user'}>User Management</NavLink>
                    </li>
                    <li className="btn btn-light list-group-item rounded">
                        <NavLink className="btn link-btn text-dark" to={'/song'}>Song Management</NavLink>
                    </li>
                    <li className="btn btn-light rounded list-group-item rounded">
                        <NavLink className="btn link-btn text-dark" to={'/artist'}>
                        Artist Management
                        </NavLink>
                    </li>
                    <li className="btn btn-light list-group-item rounded">
                        <NavLink className="btn link-btn text-dark" to={"/album"}>
                        Album Management
                        </NavLink>
                    </li>
                    <li className="btn btn-light list-group-item rounded">
                        <NavLink className="btn link-btn text-dark" to={"/category"}>
                        Category Management
                        </NavLink>
                    </li>
                </NavBarList>
            </div>
        )
    }
}

export default AdminSideBar
