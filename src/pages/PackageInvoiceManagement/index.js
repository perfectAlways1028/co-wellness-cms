import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CCSVLink } from '../../components/atoms'
import { CMTable } from '../../components/molecules';
import { Strings } from '../../constants';
import PackageInvoiceList from './components/PackageInvoiceList';
import { getRole } from '@helpers/storageHelper';

import { inject, observer } from "mobx-react";
const breadcrumbs = [
    {
        to: '/main/package-invoice-management',
        title: Strings.txtPackageInvoice
    }
]

const csvColumns = [
    {
        
        label: 'Invoice ID',
        key: 'packageInvoiceIDCode',
    },
    {
        label: 'Payor Name',
        key: 'payorName',
    },
    {
        label: 'Package Name',
        key: 'packageName',
    },
    {
        label: 'Purchase Date & Time',
        key: 'purchaseDatetime',
    },
    {
        label: 'Price',
        key: 'price',
    },
    {
        label: 'Expire Date',
        key: 'expireDate',
    },
    {
        label: 'Status',
        key: 'status',
    },
]
class PackageInvoiceManagementPage extends Component {

    constructor(props) {
      super(props);

      const role = getRole();
      this.state = {
          isSuperAdmin : role == 'superadmin',
          csvData: []
      };
    }
    onAddNew = () => {
        this.props.history.push('/main/package-invoice-management/add');
    }
    onExportToCSV = () => {
        this.props.packageInvoiceStore.findAllPackageInvoices()
        .then(allInvoices => {
            if(allInvoices) {
                console.log("allInvoices", allInvoices);
                
                this.setState({csvData: allInvoices}, ()=> {
                    this.csvLink.link.click()
                });
            }
        })
    }
    
    render () {

        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtPackageInvoice}</div>
                {
                    this.state.isSuperAdmin &&
                    <div className="buttons">

                        <CButton 
                            onClick={()=>{this.onAddNew()}}
                            type="secondary"
                            containerStyle={{width: '230px', height: '40px', marginLeft: '16px'}}>{Strings.txtBtnAddNewPackageInvoice}</CButton>
                        <div>
                            <CCSVLink
                                data={this.state.csvData}
                                headers={csvColumns}
                                filename="data.csv"
                                ref={(r) => this.csvLink = r}
                            />

                        </div>
                        <CButton 
                            onClick={()=>{this.onExportToCSV()}}
                            type="secondary"
                            containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtBtnExportToCSV}</CButton>
                    </div>
                }
               
            </div>
            <PackageInvoiceList history={this.props.history}/>
        </div>

    }
}

export default inject('packageInvoiceStore')(observer(PackageInvoiceManagementPage));
