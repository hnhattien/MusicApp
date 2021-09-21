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
        let background = this.props.currentMusic && "url(/upload/musics/thumbnails/${this.props.currentMusic.thumbnail})"
        let playerDisplayStyle = !this.state.isShowedPlayer ? "-300px" : "0";
        return(
            <>
            <MiniPlayer showPlayer={this.showPlayer}  {...this.props} ></MiniPlayer>
            <div style={{right: `${playerDisplayStyle}`}} className="p-0 top-0 position-fixed right-side-bar-wrap">
                
                <div className="" ref={this.detectClickOutside}>{this.state.isShowedPlayer && <div><PlayerTemplate isShowedPlayer={this.state.isShowedPlayer} {...this.props}></PlayerTemplate></div>}</div>
                
            </div>
            </>
        )
    }
}