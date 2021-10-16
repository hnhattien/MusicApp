import React, { Component } from 'react'
import Logintemplate from '../MemberComponents/LoginTemplate';
import AdminSideBar from './AdminSideBar';
import ContentWrap from './ContentWrap';
export class AdminHomePage extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount = () => {
        this.props.setAdminPage(true);
    }
    render() {
        return (
            <div className="container-fluid bg-dark">
                <style jsx>
                    {
                    `body{
                        background-color: white !important;
                    }`
                    }
                </style>
                <div className="row">
                    <AdminSideBar {...this.props}></AdminSideBar>
                    <ContentWrap {...this.props}></ContentWrap>
                </div>
            </div>
        )
    }
}

export default AdminHomePage
