import React, { Component } from 'react'

export class Admin extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount = ()=>{
        this.props.setAdminPage(true);
        console.log(this.props)
    }
    render() {
        
        return (
            <div>
                sdasdassaddsa
            </div>
        )
    }
}

export default Admin
