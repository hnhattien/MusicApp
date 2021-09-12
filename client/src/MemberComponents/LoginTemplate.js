import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/js/bootstrap'
export class LoginTemplate extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            
            
            <div className="col-12 login-form-wrap">
                <h1>Login</h1>
                <form className="form-group form-control">
                    <div className="form-floating mb-4 input-group">
                        <input className="form-control" id="username" placeholder="Type a username or email" name="username" type="text"/>
                        <label className={"text-dark"} htmlFor="username">Username or Email</label>
                    </div>
                    
                    <div className="form-floating input-group mb-4">
                        
                        <input className="form-control" id="password" placeholder="Type a password to login" type="password" name="password">
                        </input>
                        <label className={"text-dark"} htmlFor="password">Password</label>
                    </div>
                    
                    <div className="btn-group input-group mb-4">
                        <input className="btn btn-light" type="submit"></input>
                    </div>
                </form>
            </div>
                 
 
        )
    }
}