import React, { Component } from 'react'
// import Message from './';
export class AdminTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null
        }
    }
    componentDidMount = () => {
        let endpoint = this.props.match.url;
        fetch(endpoint).then(res=>{
            return res.json();
        }).then(dataRes=>{
            if(dataRes.error){
                // <Message x={"90vw"} y={"10px"}></Message>
            }
            else{
                this.setState({data: dataRes});
            }
        })
        
        
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default AdminTemplate
