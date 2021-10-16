import React, { Component } from 'react'
import MaterialTable from "material-table";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AvatarCustomizePopup from './AvatarCustomizePopup.js'
export class SongManagement extends Component {
    constructor(props){
        super(props);
        this.avatarFileRef = React.createRef();
        this.state = {
            data: null,
            isShowedAvatarCustomizePopup : false,
            targetAvatarForEdit: null,
            currentEditRowData: {}
        }
    }
    requestChangeAvatar = (rowData) => {
        this.setState({currentEditRowData: rowData});
        if(this.avatarFileRef){
          this.avatarFileRef.current.click();
        }
    }
    toggleAvatarCustomizePopup = () => {
        if(this.state.isShowedAvatarCustomizePopup){
            this.setState({isShowedAvatarCustomizePopup: false});
        }
        else{
            this.setState({isShowedAvatarCustomizePopup: true});
        }

    }
    handleAvatarInput = (ev) => {
        let fileReader = new FileReader();
        fileReader.onload = (ev) => {
            console.log(ev.target.result);
            this.setState({
                isShowedAvatarCustomizePopup: true,
                targetAvatarForEdit: ev.target.result,
            })
        }
        fileReader.readAsDataURL(ev.target.files[0]);

    }
    getMusics = () => {
      this.props.toggleLoading(true);
        fetch('/admin/song').then(res=>{
            return res.json();
        }).then(dataRes=>{
          console.log(dataRes,"sdj;ldad");
            if(dataRes.error){
              this.props.showMessage(true,dataRes.error.message,"danger");
            }
            else{
              let formatedData = dataRes.map((data=>{
                data.upload_time = new Date(data.upload_time).toLocaleString("vi");
                return data;
              }))
              this.setState({
                data: dataRes
              })
            }
        }).catch(err=>{
          this.props.showMessage(true,String(err), 'danger')
        }).then(()=>{
          this.props.toggleLoading(false);
        })
    }
    componentDidMount = () => {
      this.getMusics();
      this.props.updateLoginStatus();
    }

    removeMusic = (music) => {
        confirmAlert({
          title: "Remove song",
          message: `Bạn có chắc muốn xóa bài hát '${music.title}' khỏi ứng dụng.`,

          buttons: [
            {
              label: "Xóa",
              onClick: () => {
                this.props.toggleLoading(true);
                fetch('/admin/deletesong',{
                  method: "POST",
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(
                    {
                      songid: music.id,
                      songname: music.title
                    }
                  )
                }).then(res => {
                  return res.json();
                }).then(dataRes=> {

                  if(dataRes.error){
                    this.props.showMessage(true,dataRes.error.message,"danger");
                  }
                  else{
                    this.props.showMessage(true, dataRes.message, 'success');
                    this.getMusics();
                  }
                }).catch(err=>{
                  this.props.showMessage(true, String(err), "danger");
                }).then(()=>{
                  this.props.toggleLoading(false);
                })
              }
            },
            {
              label: "Hủy"
            }
          ]
        })
    }
    updateMusic(music){
      this.props.toggleLoading(true);
      fetch('/admin/updatesong',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          music: music
        })
      }).then((res)=>{
        return res.json();
      }).then(dataRes=>{
        console.log(dataRes);
        if(dataRes.error){
          this.props.showMessage(true,dataRes.error.message,"danger");
        }
        else{
          this.props.showMessage(true,dataRes.message,"success");
        }
      }).catch((err)=>{
        this.props.showMessage(true,String(err),"danger");
      }).then(()=>{
        this.props.toggleLoading(false);
      })
    }
    render() {
      const data = this.state.data;

        return (

            <div className="user-management">
            {this.state.isShowedAvatarCustomizePopup && <AvatarCustomizePopup isSongEdited={true} rowData={this.state.currentEditRowData} {...this.props} toggleAvatarCustomizePopup={this.toggleAvatarCustomizePopup} reGetData={this.getMusics} targetAvatar={this.state.targetAvatarForEdit}></AvatarCustomizePopup>}
            <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
                 <MaterialTable

                 editable={{

                    onRowUpdate: (newData, oldData)=>{
                      return new Promise((resolve, reject) => {
                        setTimeout(()=>{
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          console.log(newData,"new Data");
                          console.log(dataUpdate[index],"new Index");
                          console.log(Object.keys(newData));
                          this.updateMusic(newData);
                          this.setState({data: [...dataUpdate]});
                          resolve();
                        },1000)
                      })
                    }
                 }}

                 columns={[
                   {title: "Action", render: (rowData)=>{
                     return <div className="remove-button-wrap">
                         <span role="button" className="btn mx-2 btn-dark remove-button far fa-trash-alt" onClick={(ev)=>{this.removeMusic(rowData)}}></span>
                     </div>
                   }},
                   {
                     title: "Ảnh đại diện" , render: (rowData) =>{
                       return <img className="table-data-avatar" title={"Change avatar"} onClick={(ev) => {this.requestChangeAvatar(rowData)}} style={{width: "100%", height: "100%", cursor: "pointer"}} src={`/upload/musics/thumbnails/${rowData.thumbnail}`}/>

                     }
                   },
                   {"title":"id","field":"id", editable: "never"},
                   {"title":"Tên bài hát","field":"title"},
                   {"title":"audio","field":"audio"},
                   {"title":"thumbnail","field":"thumbnail"},
                   {"title":"slug","field":"slug"},
                   {"title":"artist_name","field":"artist_name"},
                   {"title":"cat_id","field":"cat_id"},
                   {"title":"public_year","field":"public_year",type: "numeric"},
                   {"title":"artist_id","field":"artist_id"},
                   {"title":"upload_time","field":"upload_time",type:"datetime", editable: "never"},
                   {"title":"viewcount","field":"viewcount", type: "numeric"}

                 ]}

                 data={data || []}
                 title="Song Management"
                 >

                 </MaterialTable>
                 <input accept="image/*" onInput={this.handleAvatarInput} style={{display: "none"}} type="file" ref={this.avatarFileRef}></input>
            </div>
        )
    }
}

export default SongManagement
