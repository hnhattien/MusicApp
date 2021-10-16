import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import './upload.css';
export class UploadTemplate extends Component {
    constructor(props){
        super(props);
        this.songFileInputRef = React.createRef();
        this.songThumbnailInputRef = React.createRef();
        this.state = {
            songname: "",
            artistname: "",
            category: 1,
            thumbnailfile: "",
            songfile: "",
            thumbnailBlob: ''
        }
    }
    componentDidMount = (ev) => {
        if(localStorage.getItem("userid") === null){
            this.props.history.push('/login');
        }
    }
    handleUploadSongThumbnail = (ev) => {
        if(this.songThumbnailInputRef){
            this.songThumbnailInputRef.current.click();
        }
    }
    handleUploadSongFile = (ev) => {
        if(this.songFileInputRef){
            this.songFileInputRef.current.click();
        }
    }
    handleChange = (ev) => {
        let nameAttr = ev.target.name;
        if(nameAttr === "thumbnailfile"){
            let filename = String(ev.target.value).split(/(\\|\/|\\\\)/g).pop();
            
            this.setState({
                [nameAttr] : filename,
                thumbnailBlob: URL.createObjectURL(ev.target.files[0])
            })
        }
        else if(nameAttr === "songfile"){
            let filename = String(ev.target.value).split(/(\\|\/|\\\\)/g).pop();
            this.setState({ 
                [nameAttr] : filename,
                songname: filename.split(/(\.)[a-zA-Z]+/).shift().split("-").shift(),
                artistname: filename.split(/(\.)[a-zA-Z]+/).shift().split("-").pop().split(/\[.*\]/).shift()
            })
        }
        else{
            this.setState({
                [nameAttr] : ev.target.value
            })
        }
    }
    requestUpload = (songname, artistname, catid, thumbnailfilename, songfilename, songThumbnailFileBase64, songFileBase64) => {
        console.log(catid);
        if(songThumbnailFileBase64 !== null && songFileBase64 !== null){
            console.log(songThumbnailFileBase64);
            console.log(songFileBase64);
            fetch('/song/upload',{
                method: "POST",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    songname,
                    artistname,
                    catid,
                    thumbnailfilename,
                    songfilename,
                    songThumbnailFileBase64,
                    songFileBase64
                })
            }).then((res) => {
                
                return res.json();
            }).then((dataRes) => {
                console.log(dataRes);
                if(dataRes.error){
                    this.props.showMessage(true,dataRes.error.message,"danger");
                }
                else{
                    this.props.showMessage(true,dataRes.message,"success");
                    this.props.history.push("/");
                }
            }).catch(err => {
                this.props.showMessage(true,String(err),"danger");
            }).then(()=>{
                this.props.toggleLoading(false);
               
            })
        }
    }
    uploadSong = () => {
        this.props.toggleLoading(true);
        let songname = this.state.songname,
            artistname = this.state.artistname,
            catid = this.state.category,
            thumbnailfilename = `${new Date().valueOf()}.${Math.random()*(1000000-100+1)}.${this.state.thumbnailfile}`,
            songfilename = `${new Date().valueOf()}.${Math.random()*(1000000-100+1)}.${this.state.songfile}`,
            songFileBase64 = null,
            songThumbnailFileBase64 = null;


        thumbnailfilename = thumbnailfilename.split(" ").join("");
        songfilename = songfilename.split(" ").join("").replace("|","");   
        let songFileReader = new FileReader();
        let thumbnailFileReader = new FileReader();

        songFileReader.onload = (ev) => {
            songFileBase64 = ev.target.result;
            this.requestUpload(songname, artistname, catid, thumbnailfilename, songfilename, songThumbnailFileBase64, songFileBase64)
        }
        thumbnailFileReader.onload = (ev) => {
            songThumbnailFileBase64 = ev.target.result;
            this.requestUpload(songname, artistname, catid, thumbnailfilename, songfilename, songThumbnailFileBase64, songFileBase64)
        }
        songFileReader.readAsDataURL(this.songFileInputRef.current.files[0]);
        thumbnailFileReader.readAsDataURL(this.songThumbnailInputRef.current.files[0]);
    
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1 className="text-center mt-5">
                            Upload Song
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-5">
                        <label htmlFor="songname">Song name</label>
                        <input onInput={this.handleChange} value={this.state.songname} id="songname" placeholder="Song name" name="songname" className="form-control mt-2" type="text">
                        </input>
                    </div>
                    <div className="col-12 mt-5">

                        <label htmlFor="artistname">Artist name</label>
                        <input onInput={this.handleChange} id="artistname" placeholder="Artist name" value={this.state.artistname} name="artistname" className="form-control mt-2" type="text">
                        </input>
                    </div>
                    <div className="col-12 mt-5">
                        <label htmlFor="category">Category</label>
                        <select onInput={this.handleChange} name="category" value={this.state.category} className="form-select">
                            {this.props.categories.map((cat) => {
                                return <option className="text-dark" key={cat.id} value={cat.id}>
                                {cat.title}
                            </option>
                            })}
                            
                        </select>
                    </div>
                    <div className="col-12 file-upload-wrap mt-5">

                        <div className="thumbnail-upload-wrap">
                            
                            <div className="thumbnail-upload file-upload-box">
                                <img onError={(ev)=>{ev.target.onerror=null; ev.target.src="/upload/musics/thumbnails/default.png"}} className="w-100 h-100 rounded" src={this.state.thumbnailBlob || '/upload/musics/thumbnails/cauhencauthe.jpg'}/>
                                <div className="file-upload-label-wrap" onClick={this.handleUploadSongThumbnail}>
                                    <span className="icon" role="button"><i class="fas fa-upload"></i></span>
                                    <span className="filename">{this.state.thumbnailfile}</span>
                                </div>
                            </div>
                            
                        </div>
                        <div className="song-file-upload-wrap">
                            <div className="song-file-upload file-upload-box">
                                
                            <img onError={(ev)=>{ev.target.onerror=null; ev.target.src="/upload/musics/thumbnails/default.png"}} className="w-100 h-100 rounded" src="/upload/musics/thumbnails/mp3songfile.png"/>
                                <div className="file-upload-label-wrap" onClick={this.handleUploadSongFile}>
                                    <span className="icon" role="button"><i class="fas fa-upload"></i></span>
                                    <span className="filename">{this.state.songfile}</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-12 mt-5 mb-5">
                    <div className="upload-btn">
                             <button onClick={this.uploadSong} className="btn btn-light">Upload</button>
                        </div>
                    </div>
                    <input name="thumbnailfile" onInput={this.handleChange} ref={this.songThumbnailInputRef} style={{display: "none"}} type="file" accept="image/*"></input>
                    <input name="songfile" onInput={this.handleChange} ref={this.songFileInputRef} style={{display: "none"}} type="file" accept="audio/*"></input>
                </div>
            </div>
        )
    }
}

export default withRouter(UploadTemplate);
