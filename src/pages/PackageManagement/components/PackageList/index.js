import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CStatus } from '../../../../components/atoms'
import { CMTable } from '../../../../components/molecules';

import { Strings } from '../../../../constants';

import { inject, observer } from "mobx-react";
import { convertDateForDB, convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';

import { formatCurrency } from '@helpers/formatHelper';


const statues = [
    {
        id: true,
        name: Strings.txtActive
    },
    {
        id: false,
        name: Strings.txtNonActive
    },
]

const fields = [
    {
        title: Strings.txtFieldPackageID,
        field: 'packageIDCode'
    },
    {
        title: Strings.txtFieldPackageName,
        field: 'name',
        sort: true
    },
    {
        title: Strings.txtFieldPeriod,
        field: 'period',
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
        title: Strings.txtFieldPackageID,
        field: 'packageIDCode'
    },
    {
        title: Strings.txtFieldPackageName,
        field: 'name',
        sort: true
    },
    {
        title: Strings.txtFieldValidityDays,
        field: 'period',
        sort: true
    },
    {
        title: Strings.txtFieldPrice,
        field: 'price',
        type: 'custom',
        sort: true
    }
]

class PackageList extends Component {

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
    
    componentDidMount() {
        this.onLoad();
    }

    onLoad = () => {
        this.onApplyFilter();
    }
    
    onRowClick = (rowData, index) => {
        let id = rowData.id;
        if(this.state.isSuperAdmin) {
            this.props.history.push(`/main/package-management/detail/${id}`);
        } else {
            this.props.history.push(`/main/package-invoice-tab/package/detail/${id}`);
        }
     

    }

    onImportCSV = () => {

    }


    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            active: this.state.status,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }

        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        
        console.log("filter", filter);
        this.props.packageStore.findPackages(filter)
        .then(result => {

        })
    }
    onClear = () => {
        this.setState({
            query: null,
            status: null,
        })
    }

    onSort = (field, sortDirection) => {
        let sortParam = field.field + ':'+ sortDirection;
        this.setState({sortParam}, ()=>{
            this.onApplyFilter()
        })
    }


    onChangePage = (page) => {
        console.log("onChangePage", page);
        this.setState({currentPage: page}, ()=>{
            this.onApplyFilter();
        })
        
    }
    render () {
        const { totalCount, packages } = this.props.packageStore;

        return (
            <div className="cw-column" style={{flex: 1, marginLeft: '30px', ...this.props.containerStyle}}>
               <div className="filter" style={{marginLeft: '0px'}}>
                {
                    this.state.isSuperAdmin && 
                    <div className="cw-row">
                        <CSelectInput containerStyle={{width: '248px'}} 
                                        data={statues} 
                                        label={Strings.txtFilterByStatus} 
                                        placeholder={Strings.txtAll} 
                                        selectedItemID={this.state.status}
                                        onItemSelected={(item)=>{this.setState({status: item.id})}}/>
                    </div>
                }
              
                <div className="cw-row">
                    <CTextInput type="search" 
                                  placeholder={Strings.txtPackageSearchPlaceholder} 
                                  containerStyle={{minWidth: '248px'}}
                                  value={this.state.query} 
                                  onChangeValue={(value)=>{this.setState({query: value})}}
                                  label={Strings.txtSearch}/>
                    <CButton 
                        onClick={()=>{this.onApplyFilter()}}
                        isLoading={this.props.packageStore.isLoading}
                        containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'8px'}}>{Strings.txtApply}</CButton>
                    <CButton 
                        onClick={()=>{this.onClear()}}
                        type='cancel'
                        containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'8px'}}>{Strings.txtClear}</CButton>

                </div>
            </div>
            <div className="content-container" style={{marginLeft: '0px'}}>
                <CMTable
                        fields={this.state.isSuperAdmin ? fields : payorAdminFields}
                        data={packages}
                        onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                        renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            
                            if(field.field == 'status') {
                                return <td key={'key'+ colIndex}>
                                {
                                    rowData['active'] != null &&
                                    <div style={{ justifyContent: 'flex-start', alignItems: 'center', display:'flex' }}>
                                        <CStatus value={rowData['active'] == true ? Strings.txtStatusActive : Strings.txtStatusInActive} 
                                            color={rowData['active'] == true ? 'green' : 'red'} />
                                    </div>
                               
                                }
                                </td>
                            } else if(field.field == 'price') {
                                return <td key={'key'+ colIndex}>
                                {
                                    <div>{formatCurrency(rowData['price'])}</div>
                                }
                                </td>
                            }
                             else {
                                return null;
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

export default inject('packageStore')(observer(PackageList));
