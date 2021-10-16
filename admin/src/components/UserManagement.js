import React, { Component } from 'react'
import MaterialTable from "material-table";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export class UserManagement extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null
        }
    }

    getUsers = () => {
      this.props.toggleLoading(true);
        fetch('/users').then(res=>{
            return res.json();
        }).then(dataRes=>{
            if(dataRes.error){
              this.props.showMessage(true,dataRes.error.message,"danger");
            }
            else{
              let formatedData = dataRes.map((data=>{
                data.joinday = new Date(data.joinday).toLocaleString("vi");
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
      this.getUsers();
    }

    removeUser = (user) => {
        confirmAlert({
          title: "Remove user",
          message: `Bạn có chắc muốn xóa ${user.username} khỏi ứng dụng. Người dùng này sẽ không thể đăng nhập vào ứng dụng bằng tài khoản này.`,

          buttons: [
            {
              label: "Xóa",
              onClick: () => {
                this.props.toggleLoading(true);
                fetch('/admin/deleteuser',{
                  method: "POST",
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(
                    {
                      id: user.id,
                      username: user.username
                    }
                  )
                }).then(res => {
                  return res.json();
                }).then(dataRes=> {
                  if(dataRes.error){
                    this.props.showMessage(true,dataRes.error,"danger");
                  }
                  else{
                    this.props.showMessage(true, dataRes.message, 'success');
                    this.getUsers();
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
    render() {
      const data = this.state.data;
      console.log(data);
        return (

            <div className="user-management">
            <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
                 <MaterialTable
                 columns={[
                   {title: "Action", render: (rowData)=>{
                     return <div className="remove-button-wrap">
                         <span role="button" className="btn btn-dark remove-button far fa-trash-alt" onClick={(ev)=>{this.removeUser(rowData)}}></span>
                     </div>
                   }},
                   {title: "ID", field: "id"},
                   {title: "Nickname",field: "displayedName"},
                   {title: "Email", field: "email"},
                   {title: "Username", field: "username"},
                   {title: "Join Date",field: "joinday"},
                   {title: "Role", field: "role"}

                 ]}

                 data={data || []}
                 title="User Management"
                 >

                 </MaterialTable>
            </div>
        )
    }
}

export default UserManagement
