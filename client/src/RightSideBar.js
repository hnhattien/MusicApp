import React,{Component} from 'react';
import MiniPlayer from './MiniPlayer';
import { PlayerTemplate } from './MusicPlayerComponents/PlayerTemplate';
import './rightsidebar.css';
export class RightSideBar extends Component{
    constructor(props){
        super(props);
        this.detectClickOutside = React.createRef();
        this.state = {
            isShowedPlayer : false,

        }
    }
    showPlayer = (ev) => {
        this.setState({
            isShowedPlayer: true
        })
    }
    componentDidMount = () => {
        document.addEventListener("mousedown",this.handleClickOutside);
    }

    componentWillUnmount = () => {
        document.removeEventListener("mousedown",this.handleClickOutside);
    }

    handleClickOutside = (ev) => {
        if(this.detectClickOutside){

            if(!this.detectClickOutside.current.contains(ev.target)){

                this.setState({
                    isShowedPlayer: false
                })
            }
        }
    }

    render(){
        // let currentMusic = this.props.getCurrentMusic();
        // let background = currentMusic && "url(/upload/musics/thumbnails/${currentMusic.thumbnail})"
        let playerDisplayStyle = !this.state.isShowedPlayer ? "-320px" : "0";
        return(
            <>
            <MiniPlayer showPlayer={this.showPlayer}  {...this.props} ></MiniPlayer>
            <div ref={this.detectClickOutside} style={{right: `${playerDisplayStyle}`}} className="p-0 top-0 position-fixed w-75 music-player-wrap right-side-bar-wrap">
               <PlayerTemplate {...this.props}></PlayerTemplate>
            </div>
            </>
        )
    }
}
