
import React, { Component } from 'react';


export class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            style: {backgroundColor: '#212A35',outlineWidth: "0px"}
        }
    }
    handleSearch = (ev) => {
        
    }
    render(){
        return (
            <div className="search-input-wrap input-group pe-5">
                <label style={this.state.style} className="input-group-text"><span><i className="fas fa-search"></i></span></label>
                <input onKeyPress={this.handleSearch} style={this.state.style} className="form-control text-white" name="searchInput" id="searchInput" placeholder="Search a song..." />
            </div>
        )
    }
}