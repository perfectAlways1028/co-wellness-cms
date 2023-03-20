import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CCheckbox } from '../../../components/atoms'
import { CMTable } from '../../../components/molecules';

import { Strings, Constants } from '../../../constants';

import { inject, observer } from "mobx-react";
import { toast } from 'react-toastify';
import { getRole } from '@helpers/storageHelper';

const fields = [
    {
        title: Strings.txtFieldAdminPage,
        field: 'adminPage'
    },
    {
        title: Strings.txtFieldCreate,
        field: 'create',
        type: 'custom'
    },
    {
        title: Strings.txtFieldRead,
        field: 'read',
        type: 'custom'
    },
    {
        title: Strings.txtFieldUpdate,
        field: 'update',
        type: 'custom'
    },
    {
        title: Strings.txtFieldDelete,
        field: 'delete',
        type: 'custom'
    }
]


class AdminAccessManagement extends Component {

    constructor(props) {
      super(props);
      const role = getRole();
      this.state = {
          data: Constants.baseAdminAccesses,
          isSuperAdmin:  role == 'superadmin',
      };
    }

    componentDidMount() { 
        const { id } = this.props.match.params; 
        this.props.packageStore.findAdminAccess(id)
        .then(adminAccesses => {
            if(adminAccesses) {
                let loadedAdminAccesses = Constants.baseAdminAccesses.map(pagePermission => {
                    let permission = this.findItemByPage(pagePermission.page, adminAccesses);
                    if(permission) {
                        return {
                            page: pagePermission.page,
                            adminPage: pagePermission.adminPage,
                            create: permission.create,
                            read: permission.read,
                            update: permission.update,
                            delete: permission.delete
                        }
                    }else
                        return pagePermission;
                    
                })
                this.setState({
                    data: loadedAdminAccesses
                })
            }
          
        })

    }

    onSave = () => {
        const { id } = this.props.match.params; 
        const { data } = this.state
        this.props.packageStore.updateAdminAccess(id, {adminAccess: data})
        .then(updated => {
            toast(Strings.txtPackageUpdateSuccess);
        })
    }

    findItemByPage= (page, items) => {
        const data = items || this.props.data || [];
        const foundItem = data.find(element => element.page == page);
        return foundItem;
    }
    getPageNameFromPage = (page) => {

    }
 
    getBreadCrumbs = (id) => {
        if(this.state.isSuperAdmin) {
            return [
                {
                    to: '/main/package-management',
                    title: Strings.txtMasterData
                },
                {
                    to: '/main/package-management',
                    title: Strings.txtPayorList
                },
                {
                    to: `/main/package-management/detail/${id}`,
                    title: Strings.txtPackageDetail
                },
                ,
                {
                    to: `/main/package-management/detail/${id}/set-admin-access`,
                    title: Strings.txtSetAdminAccessibility
                },
            ]
        }else {
            return [
                {
                    to: '/main/package-invoice-tab',
                    title: Strings.txtPackageAndInvoice
                },
                {
                    to: `/main/package-invoice-tab/package/detail/${id}`,
                    title: Strings.txtPackageDetail
                },
                {
                    to: `/main/package-invoice-tab/package/detail/${id}/see-admin-access`,
                    title: Strings.txtSeeAdminAccessibility
                },
            ]
        }
       
    }

    onItemCheck = (field, rowData, rowIndex, colIndex) => {
        if(this.state.isSuperAdmin) {
            let permissions = this.state.data;
            permissions[rowIndex][field.field] = !permissions[rowIndex][field.field];
            this.setState({data: permissions});
        }
    
    }

    render () {
        const { id } = this.props.match.params; 
        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>

            <div className="content-container">
                <CMTable
                        fields={fields}
                        data={this.state.data}
                        renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            return <td key={'key'+ colIndex}>
                                {
                                    rowData[field.field] != null &&
                                    <CCheckbox onChange={()=>{this.onItemCheck(field, rowData, rowIndex, colIndex)}} checked={rowData[field.field]}/>
                                }
                                  
                            </td>
                        }}
                        containerStyle={{marginTop: '16px'}}
                />
                     
           
            </div>
            {
                this.state.isSuperAdmin &&
                <div className="cw-row" style={{ marginTop: "23px", marginLeft: '30px'}}>
                    
                    <CButton containerStyle={{width: "136px"}} 
                      isLoading={this.props.packageStore.isLoading}
                    onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>
                </div>  
            }
   
        </div>

    }
}

export default inject('packageStore')(observer(AdminAccessManagement));