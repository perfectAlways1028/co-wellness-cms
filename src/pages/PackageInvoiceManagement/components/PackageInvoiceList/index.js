import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CStatus } from '../../../../components/atoms'
import { CMTable } from '../../../../components/molecules';
import { getRole } from '@helpers/storageHelper';
import { Strings } from '../../../../constants';

import { inject, observer } from "mobx-react";
import { convertDateForDB, convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';
import { formatCurrency } from '@helpers/formatHelper';


const fields = [
    {
        title: Strings.txtFieldInvoiceID,
        field: 'packageInvoiceIDCode'
    },
    {
        title: Strings.txtFieldPayor,
        field: 'payorName',
        sort: true
    },
    {
        title: Strings.txtFieldPackage,
        field: 'packageName',
        sort: true
    },
    {
        title: Strings.txtFieldPurchaseDateTime,
        field: 'purchaseDatetime',
        sort: true
    },
    {
        title: Strings.txtFieldExpireDate,
        field: 'expireDate',
        sort: true
    },
    {
        title: Strings.txtFieldPrice,
        field: 'price',
        type: 'custom',
        sort: true
    },    
    {
        title: Strings.txtFieldStatus,
        field: 'status',
        type: 'custom'
    }
]

const payorAdminFields = [
    {
        title: Strings.txtFieldInvoiceID,
        field: 'packageInvoiceIDCode'
    },
    {
        title: Strings.txtFieldPackage,
        field: 'packageName',
        sort: true
    },
    {
        title: Strings.txtFieldPurchaseDateTime,
        field: 'purchaseDatetime',
        sort: true
    },
    {
        title: Strings.txtFieldExpireDate,
        field: 'expireDate',
        sort: true
    },
    {
        title: Strings.txtFieldPrice,
        field: 'price',
        type: 'custom',
        sort: true
    },
    {
        title: Strings.txtFieldStatus,
        field: 'status',
        type: 'custom'
    }
]
class PackageInvoiceList extends Component {

    constructor(props) {
      super(props);
      const role = getRole();
      this.state = {
        limit: 10,
        currentPage : 1,
        query: null,
        packageID: null,
        payorID: null,
        startDate: null,
        endDate: null,
        status: null,
        sortParam: null,
        isSuperAdmin:  role == 'superadmin',
      };
    }
    
    onRowClick = (rowData, index) => {
        let id = rowData.id;
        this.props.history.push(`/main/package-invoice-management/detail/${id}`);
       
     

    }


    componentDidMount() {
        this.onLoad();
    }

    onLoad = () => {
        this.onApplyFilter();
    }
    

    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            packageID: this.state.packageID,
            payorID: this.state.payorID,
            purchaseStartDate: convertDateForDB(this.state.startDate),
            purchaseEndDate: convertDateForDB(this.state.endDate),
            status: this.state.status,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        console.log("filter", filter);
        this.props.packageStore.findPackages({})
        this.props.payorStore.findPayors({})
        this.props.packageInvoiceStore.findPackageInvoices(filter)
    }
    onClear = () => {
        this.setState({
            query: null,
            status: null,
            payorID: null,
            packageID: null,
            startDate: null,
            endDate: null
        })
    }

    onChangePage = (page) => {
        console.log("onChangePage", page);
        this.setState({currentPage: page}, ()=>{
            this.onApplyFilter();
        })
    }

    convertPackageInvoices = ( items ) => {
        return items.map(item => {
            return {
                ...item,
                purchaseDatetime: convertDatetimeToDisplay(item.purchaseDatetime),
                expireDate: convertDateToDisplay(item.expireDate)
            }
       
        })
    }

    getStringFromStatus = (status) => {
        switch(status) {
            case 'pending': 
                return Strings.txtStatusOnProgress
            case 'paid':
                return Strings.txtStatusPaid
        }
        return Strings.txtStatusOnProgress
    }

    getColorFromStatus = (status) => {
        switch(status) {
            case 'pending': 
                return 'yellow'
            case 'paid':
                return 'green'
        }
        return 'yellow'
    }
    onSort = (field, sortDirection) => {
        let sortParam = field.field + ':'+ sortDirection;
        this.setState({sortParam}, ()=>{
            this.onApplyFilter()
        })

    }

    render () {
        const { packages } = this.props.packageStore;
        const { payors } = this.props.payorStore;

        const { totalCount, packageInvoices } = this.props.packageInvoiceStore;
        const data = this.convertPackageInvoices(packageInvoices);
        return (
            <div className="cw-column" style={{flex: 1, marginLeft: '30px', ...this.props.containerStyle}}>
                <div className="filter" style={{marginLeft: '0px', paddingLeft: '0px', paddingRight: '0px'}}>
                    <div className="cw-row-wrap"> 
                        {
                            this.state.isSuperAdmin && 
                            <CSelectInput containerStyle={{width: '248px', marginLeft: '16px'}} 
                                        data={payors} label={Strings.txtFilterByPayor} 
                                        placeholder={Strings.txtAll} 
                                        selectedItemID={this.state.payorID}
                                        onItemSelected={(item)=>{this.setState({payorID: item.id})}}/>
                        }
                        {
                        this.state.isSuperAdmin && 
                        <CSelectInput containerStyle={{width: '248px' , marginLeft: '16px'}} 
                                    data={packages} label={Strings.txtFilterByPackage} 
                                    placeholder={Strings.txtAll} 
                                    selectedItemID={this.state.packageID}
                                    onItemSelected={(item)=>{this.setState({packageID: item.id})}}/>
                        }
                        <CDatePicker containerStyle={{width: '248px' , marginLeft: '16px'}} 
                                    label={Strings.txtPurchaseStartDate} 
                                    selected={this.state.startDate} 
                                    placeholderText={Strings.txtPurchaseStartDate} 
                                    onChange={(value) => {this.setState({startDate: value})}}/>
                        <CDatePicker containerStyle={{width: '248px' , marginLeft: '16px'}} 
                                    label={Strings.txtPurchaseEndDate} 
                                    selected={this.state.endDate} 
                                    placeholderText={Strings.txtPurchaseEndDate} 
                                    onChange={(value) => {this.setState({endDate: value})}}/>
        
                        <CTextInput type="search" 
                                    placeholder={Strings.txtPackageSearchPlaceholder} 
                                    containerStyle={{minWidth: '248px', marginLeft: '16px'}} 
                                    value={this.state.query} 
                                    onChangeValue={(value)=>{this.setState({query: value})}}
                                    label={Strings.txtSearch}/>
                        <CButton 
                            onClick={()=>{this.onApplyFilter()}}
                            isLoading={this.props.packageInvoiceStore.isLoading}
                            containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'18px'}}>{Strings.txtApply}</CButton>
                        <CButton 
                            onClick={()=>{this.onClear()}}
                            type='cancel'
                            containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'18px'}}>{Strings.txtClear}</CButton>

                    </div>
                </div>
                <div className="content-container" style={{marginLeft: '0px'}}>
                    <CMTable
                            fields={this.state.isSuperAdmin ? fields : payorAdminFields}
                            data={data}
                            onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                            renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            
                                if(field.field == 'status') {
                                    return <td key={'key'+ colIndex}>
                                    <div style={{ justifyContent: 'flex-start', alignItems: 'center', display:'flex' }}>
                                        <CStatus value={this.getStringFromStatus(rowData['status'])} 
                                            color={this.getColorFromStatus(rowData['status'])} />
                                    </div>
                                    </td>
                                }else if(field.field == 'price') {
                                    return <td key={'key'+ colIndex}>
                                    {
                                        <div>{formatCurrency(rowData['price'])}</div>
                                    }
                                    </td>
                                } 
                            
                            }}
                            onRowClick={(rowData, rowIndex) => {this.onRowClick(rowData, rowIndex)}}
                            containerStyle={{marginTop: '16px'}}
                    />
                    {
                        totalCount > this.state.limit &&
                        <CPagination
                            onChange={(page)=>{this.onChangePage(page)}}
                            current={this.state.currentPage}
                            pageSize={this.state.limit}
                            total={totalCount}
                        />
                    }

                    
                </div>
            </div>
        )

    }
}

export default inject('packageInvoiceStore', 'packageStore', 'payorStore')(observer(PackageInvoiceList));
