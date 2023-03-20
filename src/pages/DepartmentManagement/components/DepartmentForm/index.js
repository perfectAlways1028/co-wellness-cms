import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../../components/atoms'
import { CMImagePicker } from '../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../constants';
import { inject, observer } from "mobx-react";
import './style.scss'
import { toast } from 'react-toastify';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

class DepartmentForm extends Component {
    constructor(props) {
        super(props);
        const role = getRole();

        this.state = {
            departmentIDCode: null,
            title: null,
            departmentImageUrl: null,
            payorID: null,
            payorName: null,
            isSuperAdmin:  role == 'superadmin',
            errTitle: null,
            errPayor: null,
            errImageUrl: null
        };
    }


    componentDidMount() {
        const { departmentID, isEdit } = this.props;
        if( isEdit && departmentID ) {
            this.props.departmentStore.findOneDepartment(departmentID)
            .then(detailDepartment => {
                  this.setState({
                    departmentIDCode: detailDepartment.departmentIDCode,
                    payorID: detailDepartment.payorID,
                    name: detailDepartment.name,
                    departmentImageUrl: detailDepartment.departmentImgUrl,
                    payorName: detailDepartment.payor ? detailDepartment.payor.name : "",
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }else {
            if(this.state.isSuperAdmin) {
                this.props.payorStore.findAllPayors();
            }
        }
 
    } 

    uploadImage = ( path ) => {
        this.props.departmentStore.uploadImage(path, "department")
        .then(data => {
            if(data && data.path) {
                this.setState({departmentImageUrl: data.path});
            }
        })
    }

    onSave = () => {
        const {  
            name,
            payorID, } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    name,
                    payorID,
                }

                this.props.departmentStore.createDepartment(body)
                .then(created => {
                    toast(Strings.txtDepartmentCreateSuccess);
                    this.props.history.go(-1);
                })
                .catch(err => {
                    console.log("faild", err);
                    toast(Strings.txtUnexpectedError);
                });
            }
        } else {
            if( this.validateForm() ) {
                let body = {
                    name,
                    payorID,
                }
                this.props.departmentStore.updateDepartment(this.props.departmentID, body)
                .then(updated => {
                    toast(Strings.txtDepartmentUpdateSuccess);
                })
                .catch(err => {
                    console.log("faild", err);
                    toast(Strings.txtUnexpectedError);
                });
            }
        }
    }
    validateForm = () => {
        let valid = true;
        let {isSuperAdmin} = this.state;

        let validName = this.state.name && this.state.name != "";
        if(!validName) this.setState({errName: Strings.txtErrNameRequired})
        else this.setState({errName: null})
        valid &= validName;

        if(isSuperAdmin) {
            let validPayor = this.state.payorID && this.state.payorID != "";
            if(!validPayor) this.setState({errPayor: Strings.txtErrPayorSelect})
            else this.setState({errPayor: null})
            valid &= validPayor;
        }
        return valid;
    }
    onDelete = () => {
        const { departmentID } = this.props;
        if (window.confirm('Are you sure you wish to delete this department?'))  {
            this.onDeleteDepartment(departmentID) 
        }
    }
    onDeleteDepartment = (id) => {
        this.props.departmentStore.deleteDepartment(id)
        .then(deleted => {
            toast(Strings.txtDepartmentDeleteSuccess);
            this.props.history.go(-1);
        })
    }
    render() {
        const { isEdit } = this.props;
        const { isSuperAdmin } = this.state;
        const payors = this.props.payorStore.allPayors || [];
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.DEPARTMENT, Constants.PAGE_PERMISSION.CREATE);
        const permissionUpdate = checkPermissionAllowed(Constants.PAGE.DEPARTMENT, Constants.PAGE_PERMISSION.UPDATE);
        const permissionDelete = checkPermissionAllowed(Constants.PAGE.DEPARTMENT, Constants.PAGE_PERMISSION.DELETE);
     
        return <div className="cw-default-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldDepartmentID} 
                            value={this.state.departmentIDCode} 
                            placeholder={Strings.txtFieldDepartmentID} 
                            disable />
                }
                {
                    !isSuperAdmin ?
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldPayorName} 
                        value={this.state.payorName}
                        disable
                       />
                    :
                    <CSelectInput containerStyle={{width: '320px'}} 
                    data={payors} 
                    label={Strings.txtFieldPayorName} 
                    placeholder={Strings.txtFieldPayorName} 
                    selectedItemID={this.state.payorID}
                    error={this.state.errPayor}
                    onItemSelected={(item)=>{this.setState({payorID: item.id, errPayor: null})}}/>
                }


                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldDepartmentName} 
                    value={this.state.name}
                    placeholder={Strings.txtFieldDepartmentName} 
                    error={this.state.errName}
                    onChangeValue={(value) => {this.setState({name: value, errName: null})}}/>

              
               
                 <div className="cw-row" style={{ marginTop: "23px"}}>
                    {
                        ((isEdit && permissionUpdate) || (!isEdit && permissionCreate)) &&
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.departmentStore.isLoading}
                                 onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>
                    }
                    {
                         isEdit && permissionDelete && 
                        <CButton containerStyle={{width: "136px", marginLeft: "30px"}} type="cancel" onClick={()=>{this.onDelete()}}>{Strings.txtBtnDelete}</CButton>
                    }
                    
                 </div>  


                
            </div>

        </div>
    }
}

export default inject('payorStore', 'departmentStore')(observer(DepartmentForm));