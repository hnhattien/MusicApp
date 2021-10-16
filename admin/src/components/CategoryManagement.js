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

    getCategories = () => {
      this.props.toggleLoading(true);
        fetch('/admin/category').then(res=>{
            return res.json();
        }).then(dataRes=>{
          console.log(dataRes,"sdj;ldad");
            if(dataRes.error){
              this.props.showMessage(true,dataRes.error.message,"danger");
            }
            else{
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
      this.getCategories();
    }

    removeCategory= (category) => {
        confirmAlert({
          title: "Remove Category",
          message: `Bạn có chắc muốn xóa category có tên '${category.title}' khỏi ứng dụng. Lưu ý xóa album không có nghĩa là xóa những bài hát bên trong album.`,

          buttons: [
            {
              label: "Xóa",
              onClick: () => {
                this.props.toggleLoading(true);
                fetch('/admin/deletecategory',{
                  method: "POST",
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(
                    {
                      categoryid: category.id,
                      categoryname: category.title
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
                    this.getCategories();
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
    updateCategory(category){
      this.props.toggleLoading(true);
      fetch('/admin/updatecategory',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          category: category
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
    addCategory = (category) => {
      this.props.toggleLoading(true);
      fetch('/admin/addcategory',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          category: category
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
          this.getCategories();
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
            {this.state.isShowedAvatarCustomizePopup && <AvatarCustomizePopup isCategoryEdited={true} rowData={this.state.currentEditRowData} {...this.props} toggleAvatarCustomizePopup={this.toggleAvatarCustomizePopup} reGetData={this.getCategories} targetAvatar={this.state.targetAvatarForEdit}></AvatarCustomizePopup>}
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
                           this.addCategory(newData);
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

                          this.updateCategory(newData);
                          this.setState({data: [...dataUpdate]});
                          resolve();
                        },1000)
                      })
                    }
                 }}

                 columns={[
                   {title: "", render: (rowData)=>{
                     return <div className="remove-button-wrap">
                         <span role="button" className="btn mx-2 btn-dark remove-button far fa-trash-alt" onClick={(ev)=>{this.removeCategory(rowData)}}></span>
                     </div>
                   }},
                   {
                     title: "Ảnh đại diện" , render: (rowData) =>{
                       return <img className="table-data-avatar" title={"Change avatar"} onClick={(ev) => {this.requestChangeAvatar(rowData)}} style={{width: "100%", height: "100%", cursor: "pointer"}} src={`/upload/images/${rowData.thumbnail}`}/>

                     }
                   },
                   {"title":"id","field":"id", editable: "never"},
                   {"title":"Tên thể loại","field":"title"},
                   {"title":"File ảnh đại diện","field":"thumbnail"},
                   {"title":"Slug","field":"slug"}
                 ]}

                 data={data || []}
                 title="Category Management"
                 >

                 </MaterialTable>
                 <input accept="image/*" onInput={this.handleAvatarInput} style={{display: "none"}} type="file" ref={this.avatarFileRef}></input>
            </div>
        )
    }
}

export default AlbumManagement
