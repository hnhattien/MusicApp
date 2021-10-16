import React, { Component } from 'react'
import MaterialTable from "material-table";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AvatarCustomizePopup from './AvatarCustomizePopup'
export class ArtistManagement extends Component {
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

    getArtists = () => {
      this.props.toggleLoading(true);
        fetch('/artist/artistinfo').then(res=>{
            return res.json();
        }).then(dataRes=>{
          console.log(dataRes,"sdj;ldad");
            if(dataRes.error){
              this.props.showMessage(true,dataRes.error.message,"danger");
            }
            else{
              let formatedData = dataRes.map((data=>{
                data.adddate = new Date(data.adddate).toLocaleString("vi");
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
      this.getArtists();
    }

    removeArtist = (artist) => {
        confirmAlert({
          title: "Remove Artist",
          message: `Bạn có chắc muốn xóa thông tin ca sĩ '${artist.title}' khỏi ứng dụng. Những bài hát mà ca sĩ này thể hiện sẽ bị xóa (không bao gồm bài hát người dùng tải lên).`,

          buttons: [
            {
              label: "Xóa",
              onClick: () => {
                this.props.toggleLoading(true);
                fetch('/admin/deleteartist',{
                  method: "POST",
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(
                    {
                      artistid: artist.id,
                      artistname: artist.title
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
                    this.getArtists();
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
    updateArtist(artist){
      this.props.toggleLoading(true);
      fetch('/admin/updateartist',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          artist: artist
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
    addArtist = (artist) => {
      this.props.toggleLoading(true);
      fetch('/admin/addartist',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          artist: artist
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
          this.getArtists();
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
            {this.state.isShowedAvatarCustomizePopup && <AvatarCustomizePopup isArtistEdited={true} rowData={this.state.currentEditRowData} {...this.props} toggleAvatarCustomizePopup={this.toggleAvatarCustomizePopup} reGetData={this.getArtists} targetAvatar={this.state.targetAvatarForEdit}></AvatarCustomizePopup>}
            <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
                 <MaterialTable

                 editable={{
                   onRowAdd: newData =>
                   new Promise((resolve, reject) => {
                       setTimeout(() => {
                           /* setData([...data, newData]); */
                           this.addArtist(newData);
                           this.setState({data: [...data, newData]});

                           resolve();
                       }, 1000);
                   }),
                    onRowUpdate: (newData, oldData)=>{
                      return new Promise((resolve, reject) => {
                        setTimeout(()=>{
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          console.log(newData,"new Data");
                          console.log(dataUpdate[index],"new Index");
                          console.log(Object.keys(newData));
                          this.updateArtist(newData);
                          this.setState({data: [...dataUpdate]});
                          resolve();
                        },1000)
                      })
                    }
                 }}

                 columns={[
                   {title: "", render: (rowData)=>{
                     return <div className="remove-button-wrap">
                         <span role="button" className="btn mx-2 btn-dark remove-button far fa-trash-alt" onClick={(ev)=>{this.removeArtist(rowData)}}></span>
                     </div>
                   }},
                   {
                     title: "Ảnh đại diện" , render: (rowData) =>{
                       return <img className="table-data-avatar" title={"Change avatar"} onClick={(ev) => {this.requestChangeAvatar(rowData)}} style={{width: "100%", height: "100%", cursor: "pointer"}} src={`/upload/images/${rowData.thumbnail}`}/>

                     }
                   },
                   {"title":"id","field":"id", editable: "never"},
                   {"title":"Tên","field":"title"},
                   {"title":"File ảnh đại diện","field":"thumbnail"},
                   {"title":"slug","field":"slug"},
                   {"title": "Ngày tải lên", "field": "adddate", editable: "never"},

                 ]}

                 data={data || []}
                 title="Artist Management"
                 >

                 </MaterialTable>
                 <input accept="image/*" onInput={this.handleAvatarInput} style={{display: "none"}} type="file" ref={this.avatarFileRef}></input>
            </div>
        )
    }
}

export default ArtistManagement
