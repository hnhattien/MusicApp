import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './bannerslider.css';
import dataBannerSlider from './banner-slider-data';
export class BannerSlider extends Component {
    constructor(props){
        super(props);
    }
    render() {

        return (
            <div className="banner-slider-wrap position-absolute top-0">
                <div className="banner-slider banner-list-wrap">
                    <ul className="banner-list list-inline">
                        {dataBannerSlider.map((data)=>{
                            return <li className="list-inline-item">
                                <NavLink to={data.urlTo}>
                                    <div className="banner-wrap">
                                        <img className="banner" src={data.image}>
                                        </img>
                                    </div>
                                </NavLink>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default BannerSlider
