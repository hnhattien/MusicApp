import React, { Component } from 'react'
import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';



export class HomeAdminTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
          data : null
        }
    }
    componentDidMount = () => {
      this.props.updateLoginStatus();
      this.props.toggleLoading(true);
      fetch('/admin').then((res)=>{
        return res.json();
      }).then(dataRes=>{
        if(dataRes.error){
          this.props.showMessage(true,dataRes.error.message,"danger");
        }
        else{
          this.setState({data: dataRes});
          console.log(dataRes,"sjdaskjd;as")
        }
      }).catch((err)=>{
        this.props.showMessage(true,String(err),"danger");
      }).then(()=>{
        this.props.toggleLoading(false);
      })
    }
    render() {
        return (
            <div className="home-admin">
                  <div className="top-home-admin">
                      <ul className="list-inline info-admin-top-list">
                          <li className="list-inline-item bg-light">
                              <div className="info">
                                   <h4>
                                      User Total
                                   </h4>
                                   <h4>
                                   {this.state.data && this.state.data.userTotal}
                                   <span className="percent">{this.state.data && `+${this.state.data.todayNewUser}`}</span>
                                   </h4>
                              </div>
                              <div className="thumbnail">
                                  <span className="fas fa-globe-asia"></span>
                              </div>
                          </li>
                          <li className="list-inline-item bg-light">
                              <div className="info">
                                   <h4>
                                      Song Total
                                   </h4>
                                   <h4>
                                   {this.state.data && this.state.data.songTotal}
                                   <span className="percent">{this.state.data && `+${this.state.data.todayNewSong}`}</span>
                                   </h4>
                              </div>
                              <div className="thumbnail">
                                  <span className="fas fa-music"></span>
                              </div>
                          </li>
                          <li className="list-inline-item bg-light">
                              <div className="info">
                                   <h4>
                                      Album Total
                                   </h4>
                                   <h4>
                                   {this.state.data && this.state.data.albumTotal}
                                   <span className="percent">{this.state.data && `+${this.state.data.todayNewAlbum}`}</span>
                                   </h4>
                              </div>
                              <div className="thumbnail">
                                  <span className="fas fa-compact-disc"></span>
                              </div>
                          </li>
                          <li className="list-inline-item bg-light">
                              <div className="info">
                                   <h4>
                                      Artist Total
                                   </h4>
                                   <h4>
                                   {this.state.data && this.state.data.artistTotal}
                                   <span className="percent">{this.state.data && `+${this.state.data.todayNewArtist}`}</span>
                                   </h4>
                              </div>
                              <div className="thumbnail">
                                  <span className="fas fa-users"></span>
                              </div>
                          </li>
                      </ul>
                  </div>
            </div>
        )
    }
}

export default HomeAdminTemplate
