
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
export class AlbumListItem extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <>
                {this.props.albums.map((album)=>{
                return <li className="list-inline-item m-2 category-card-wrap">
                    <NavLink to={`/album/${album.slug}`}>
                        <div className="category-card" title={album.title}>
                            <div className="thumbnail-wrap">
                                <img className="rounded category-thumbnail" src={`/upload/images/${album.thumbnail}`}>
                                </img>
                            </div>
                            <div className="category-title-wrap">
                                <h4>{album.title}</h4>
                            </div>
                        </div>
                    </NavLink>
                </li>
                })}              
            </>
        )
    }
}

export default AlbumListItem
