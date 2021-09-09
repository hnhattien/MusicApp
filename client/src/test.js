import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch,NavLink, Redirect, withRouter, Prompt } from 'react-router-dom';

export class Selector extends Component {

    render() {
        return <Router>
            <div className="container-fluid text-white ps-5 bg-dark">
                <div className="row">
                    <div className="col-2">
                        <NavLink to={'/hi'}>
Hi
                        </NavLink>
                        <NavLink to={'/home'}>
Home
                        </NavLink>
                    </div>
                    <div className="col">



                        <Switch>
                        <Route path={'/'} render={(routeProps) => <h1>Home</h1>} exact="true" />
                        <Route path={['/hi']}  exact={true} render={(propsROu) => <h1>Products</h1>} />
                        
                        
                       
                        <Route render={(propsROu) => <h1>404</h1>} />
                        
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    }
}