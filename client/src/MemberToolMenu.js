import React, {Component} from 'react';

export class MemberToolMenu extends Component{
    render(){
        return (
            <div className="member-tool-wrap w-100 d-flex justify-content-around w-100">
                <div className="ps-3">
                    <span className="me-2">
                            <a className="text-white text-decoration-none signin-link login-link" href="#login">Đăng nhập</a>
                    </span>
                        |
                    <span className="ms-2">
                        <a className="text-white text-decoration-none signup-link" href="#signup">Đăng ký</a>
                    </span>
                </div>
                    <span>
                        <a href="#setting">
                            <span className="fa-cog fa text-white"></span>
                        </a>
                    </span>
            </div>
        )
    }
}
