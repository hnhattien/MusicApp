import React, { Component } from 'react';
import {SearchInput} from '../SearchUIComponents/SearchInput';
import {Header} from '../SearchUIComponents/Header';
export class SearchTemplate extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <React.Fragment>
                <Header>
                    <SearchInput baseClasses={'w-25'}></SearchInput>
                </Header>
            </React.Fragment>
        )
    }
}