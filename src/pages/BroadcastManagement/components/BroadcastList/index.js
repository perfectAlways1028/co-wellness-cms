import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../../components/atoms'
import { CMTable } from '../../../../components/molecules';
import { inject, observer } from "mobx-react";
import { getRole } from '@helpers/storageHelper';
import { convertDateToDisplay } from '@helpers/dateHelper';

import { Strings } from '../../../../constants';


const fields = [
    {
        title: Strings.txtFieldBroadcastID,
        field: 'broadcastIDCode'
    },
    {
        title: Strings.txtFieldBroadcastTitle,
        field: 'title',
        sort: true
    },
    {
        title: Strings.txtFieldCreator,
        field: 'payorName',
        type: 'custom',
        sort: true
    },
    {
        title: Strings.txtFieldPostedDate,
        field: 'publishDate',
        type: 'custom',
        sort: true
    }
]

class BroadcastList extends Component {

    constructor(props) {
      super(props);

      this.state = {
        limit: 10,
        currentPage: 1,
        query: null,
        status: null,
        payorID: null,
        startDate: null,
        endDate:null,
        sortParam: null
      };
    }
    
    componentDidMount() {
        this.onLoad();
    }
    onLoad = () => {
        this.onApplyFilter();
        this.props.payorStore.findAllPayors();
    }

    onRowClick = (rowData, index) => {
        let id = rowData.id;
        this.props.history.push(`/main/broadcast-management/detail/${id}`);

    }
    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            payorID: this.state.payorID,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        console.log("filter", filter);
        this.props.broadcastStore.findBroadcasts(filter)
        .then(result => {

        })
    }
    onClear = () => {
        this.setState({
            query: null,
            status: null,
            startDate: null,
            endDate: null,
            payorID: null,
        })
    }

    onChangePage = (page) => {
        this.setState({currentPage: page}, ()=>{
            this.onApplyFilter();
        })
        
    }
    onSort = (field, sortDirection) => {
        let sortParam = field.field + ':'+ sortDirection;
        this.setState({sortParam}, ()=>{
            this.onApplyFilter()
        })

    }

    render () {
        const { totalCount, broadcasts } = this.props.broadcastStore;
        const { allPayors } = this.props.payorStore;
        const role = getRole()
        const isSuperAdmin = role == 'superadmin';
        return (
            <div className="cw-column" style={{flex: 1}}>
                <div className="filter" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                    <div className="cw-row-wrap">
                        {/**
                         * 
                         * <CSelectInput containerStyle={{width: '248px', marginLeft: '16px'}} 
                                    data={creators} label={Strings.txtFilterByCreator} 
                                    placeholder={Strings.txtAll} 
                                    onItemSelected={(item)=>{}}/>
                         */}
                        
                        <CSelectInput containerStyle={{width: '248px' , marginLeft: '16px'}} 
                                    data={allPayors} label={Strings.txtFilterByPayor} 
                                    placeholder={Strings.txtAll} 
                                    selectedItemID={this.state.payorID}
                                    onItemSelected={(item)=>{this.setState({payorID: item.id})}}/>
                        <CDatePicker containerStyle={{width: '248px' , marginLeft: '16px'}} 
                                    label={Strings.txtPostedStartDate} 
                                    selected={this.state.startDate} 
                                    placeholderText={Strings.txtPostedStartDate} 
                                    onChange={(value) => {this.setState({startDate: value})}}/>
                        <CDatePicker containerStyle={{width: '248px' , marginLeft: '16px'}} 
                                    label={Strings.txtPostedEndDate} 
                                    selected={this.state.endDate} 
                                    value={this.state.endDate} 
                                    onChangeValue={(value)=>{this.setState({query: value})}}
                                    placeholderText={Strings.txtPostedEndDate} 
                                    onChange={(value) => {this.setState({endDate: value})}}/>
        
                        <CTextInput type="search" 
                                    placeholder={Strings.txtPackageSearchPlaceholder} 
                                    containerStyle={{minWidth: '248px', marginLeft: '16px'}} 
                                    value={this.state.query}
                                    onChangeValue={(value)=> {this.setState({query: value})}}
                                    label={Strings.txtSearch}/>
                        <CButton 
                            onClick={()=>{this.onApplyFilter()}}
                            isLoading={this.props.broadcastStore.isLoading}
                            containerStyle={{width: '116px', height: '40px', marginLeft: '16px', marginTop:'18px'}}>{Strings.txtApply}</CButton>
                        <CButton 
                            onClick={()=>{this.onClear()}}
                            type='cancel'
                            containerStyle={{width: '116px', height: '40px', marginLeft: '16px', marginTop:'18px'}}>{Strings.txtClear}</CButton>

                    </div>
                </div>
                <div className="content-container">
                    <CMTable
                            fields={fields}
                            data={broadcasts}
                            onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                            renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            
                                if(field.field == 'payorName') {
                               
                                    return <td key={'key'+ colIndex}>
                                        {
                                            <div>{rowData['payorName'] || Strings.txtSilaomHospitals}</div>
                                        }
                                    </td>
                                } else if(field.field == 'publishDate') {
                                           
                                    return <td key={'key'+ colIndex}>
                                        {
                                            <div>{ convertDateToDisplay(rowData['publishDate'])}</div>
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

export default inject('payorStore','broadcastStore')(observer(BroadcastList));
