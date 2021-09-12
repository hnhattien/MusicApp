import React,{Component} from 'react';
import { PlayerTemplate } from './MusicPlayerComponents/PlayerTemplate';
export class RightSideBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowPlayer : true
        }
    }
    render(){
        return(
            this.props.currentMusic && <div className="col-3 player-wrap p-0 top-0">
                <div style={{backgroundImage: `url(/upload/musics/thumbnails/${this.props.currentMusic.thumbnail})`}} className="player-background"></div>
                <PlayerTemplate {...this.props}>

                </PlayerTemplate>
            </div>
        )
    }
}