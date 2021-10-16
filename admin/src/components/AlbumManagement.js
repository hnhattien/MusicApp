import React, { Component } from 'react'
import MaterialTable from "material-table";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AvatarCustomizePopup from './AvatarCustomizePopup'
export class AlbumManagement extends Component {
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

    getAlbums = () => {
      this.props.toggleLoading(true);
        fetch('/admin/album').then(res=>{
            return res.json();
        }).then(dataRes=>{
          console.log(dataRes,"sdj;ldad");
            if(dataRes.error){
              this.props.showMessage(true,dataRes.error.message,"danger");
            }
            else{
              let formatedData = dataRes.map((data=>{
                data.madedate = new Date(data.madedate).toLocaleString("vi");
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
      this.props.updateLoginStatus();
      this.getAlbums();
    }

    removeAlbum = (album) => {
        confirmAlert({
          title: "Remove Album",
          message: `Bạn có chắc muốn xóa album có tên '${album.title}' khỏi ứng dụng. Lưu ý xóa album không có nghĩa là xóa những bài hát bên trong album.`,

          buttons: [
            {
              label: "Xóa",
              onClick: () => {
                this.props.toggleLoading(true);
                fetch('/admin/deletealbum',{
                  method: "POST",
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(
                    {
                      albumid: album.id,
                      albumname: album.title
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
                    this.getAlbums();
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
    updateAlbum(album){
      this.props.toggleLoading(true);
      fetch('/admin/updatealbum',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          album: album
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
    render() {
      const data = this.state.data;

        return (

            <div className="user-management">
            {this.state.isShowedAvatarCustomizePopup && <AvatarCustomizePopup isAlbumEdited={true} rowData={this.state.currentEditRowData} {...this.props} toggleAvatarCustomizePopup={this.toggleAvatarCustomizePopup} reGetData={this.getAlbums} targetAvatar={this.state.targetAvatarForEdit}></AvatarCustomizePopup>}
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
                          this.updateAlbum(newData);
                          this.setState({data: [...dataUpdate]});
                          resolve();
                        },1000)
                      })
                    }
                 }}

                 columns={[
                   {title: "", render: (rowData)=>{
                     return <div className="remove-button-wrap">
                         <span role="button" className="btn mx-2 btn-dark remove-button far fa-trash-alt" onClick={(ev)=>{this.removeAlbum(rowData)}}></span>
                     </div>
                   }},
                   {
                     title: "Ảnh đại diện" , render: (rowData) =>{
                       return <img className="table-data-avatar" title={"Change avatar"} onClick={(ev) => {this.requestChangeAvatar(rowData)}} style={{width: "100%", height: "100%", cursor: "pointer"}} src={`/upload/images/${rowData.thumbnail}`}/>

                     }
                   },
                   {"title":"id","field":"id", editable: "never"},
                   {"title":"Tên album","field":"title"},
                   {"title":"File ảnh đại diện","field":"thumbnail"},
                   {"title":"Slug","field":"slug"},
                   {"title":"Artist id","field":"artist_id"},
                   {"title":"Category Id","field":"cat_id"},
                   {"title": "Ngày tải lên", "field": "madedate", editable: "never"},

                 ]}

                 data={data || []}
                 title="Album Management"
                 >

                 </MaterialTable>
                 <input accept="image/*" onInput={this.handleAvatarInput} style={{display: "none"}} type="file" ref={this.avatarFileRef}></input>
            </div>
        )
    }
}

export default AlbumManagement
