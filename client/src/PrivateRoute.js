import React, { Component } from 'react'
import { Redirect,Route } from 'react-router';

export default class PrivateRoute extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let TargetComponent = this.props.component;
      
        return (
            <Route path={this.props.path}  exact={true} render={(routeProps)=>{
                return this.props.auth ? <TargetComponent {...this.props.componentProps}></TargetComponent>: <Redirect from={this.props.path} exact={true} to={{pathname: '/login', state: {from: routeProps.location}}}>

                </Redirect>
            }}>

            </Route>
        )
    }
}

export {PrivateRoute};