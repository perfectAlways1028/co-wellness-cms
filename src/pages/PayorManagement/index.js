import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../components/atoms'
import { CMTable } from '../../components/molecules';

import { Strings } from '../../constants';

import { inject, observer } from "mobx-react";

import './style/style.scss'

const breadcrumbs = [
    {
        to: '/main/payor-management',
        title: Strings.txtPayor
    },
    {
        to: '/main/payor-management',
        title: Strings.txtPayorList
    }
]

const payorStatuses = [
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
        title: Strings.txtFieldPayorID,
        field: 'payorIDCode'
    },
    {
        title: Strings.txtFieldPayorName,
        field: 'name',
        sort: true
    },
    {
        title: Strings.txtFieldPhoneNumber,
        field: 'phoneNumber'
    },
    {
        title: Strings.txtFieldEMail,
        field: 'email'
    },
    {
        title: Strings.txtFieldStatus,
        field: 'status',
        type: 'custom'
    }
]

class PayorManagementPage extends Component {


    constructor(props) {
        super(props);
  
        this.state = {
            limit: 10,
            currentPage : 1,
            query: null,
            status: null,
            sortParam: null
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
        this.props.history.push(`/main/payor-management/detail/${id}`);

    }

    onImportCSV = () => {

    }
    onAddNewPayor = () => {
        this.props.history.push('/main/payor-management/add');
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
        this.props.payorStore.findPayors(filter)
        .then(result => {

        })
    }

    onSort = (field, sortDirection) => {
        let sortParam = field.field + ':'+ sortDirection;
        this.setState({sortParam}, ()=>{
            this.onApplyFilter()
        })
    }

    onClear = () => {
        this.setState({
            query: null,
            status: null,
        })
    }
    render () {
        const { totalCount, payors } = this.props.payorStore;
        return <div className="cw-payormanagement-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtPayorList}</div>
                <div className="buttons">
                    <CButton 
                        onClick={()=>{this.onAddNewPayor()}}
                        type="secondary"
                        containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtBtnAddNewPayor}</CButton>
                </div>
            </div>
            <div className="filter">
                <div className="cw-row">
                    <CSelectInput containerStyle={{width: '248px'}} 
                                  data={payorStatuses} 
                                  label={Strings.txtFilterByStatus} 
                                  selectedItemID={this.state.status}
                                  placeholder={Strings.txtAll} 
                                  onItemSelected={(item)=>{this.setState({status: item.id})}}/>
                </div>
                <div className="cw-row">
                <CTextInput type="search" 
                                  placeholder={Strings.txtPayorSearchPlaceholder} 
                                  containerStyle={{minWidth: '248px'}}
                                  value={this.state.query} 
                                  onChangeValue={(value)=>{this.setState({query: value})}}
                                  label={Strings.txtSearch}/>
                    <CButton 
                        onClick={()=>{this.onApplyFilter()}}
                        isLoading={this.props.payorStore.isLoading}
                        containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'8px'}}>{Strings.txtApply}</CButton>
                    <CButton 
                        onClick={()=>{this.onClear()}}
                        type='cancel'
                        containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'8px'}}>{Strings.txtClear}</CButton>

                </div>
            </div> 
            <div className="content-container">
                <CMTable
                        fields={fields}
                        data={payors}
                        onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                        renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            
                            if(field.field == 'status') {
                                return <td key={'key'+ colIndex}>
                                {
                                    rowData['active'] != null &&
                                    <div>{rowData['active'] == true ? Strings.txtActive : Strings.txtNonActive}</div>
                                }
                                </td>
                            } else {
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

    }
}

export default inject('payorStore')(observer(PayorManagementPage));
