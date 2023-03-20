import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CStatus } from '../../components/atoms'
import { CMTable } from '../../components/molecules';

import { Strings, Constants } from '../../constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const breadcrumbs = [
    {
        to: '/main/competition-management',
        title: Strings.txtCompetition
    }
]

const statues = [
    {
        id: Constants.competitionStatus.pending,
        name: Strings.txtStatusPending
    },
    {
        id: Constants.competitionStatus.started,
        name: Strings.txtStatusStarted
    },
    {
        id: Constants.competitionStatus.expired,
        name: Strings.txtStatusExpired
    },
]

const fields = [
    {
        title: Strings.txtFieldCompetitionID,
        field: 'competitionIDCode'
    },
    {
        title: Strings.txtFieldPayorName,
        field: 'payorName',
        sort: true
    },
    {
        title: Strings.txtFieldCompetitionTitle,
        field: 'name'
    },
    {
        title: Strings.txtFieldPeriod,
        field: 'period',
        type: 'custom',
        sort: true
    },
    {
        title: Strings.txtFieldStatus,
        field: 'status',
        type: 'custom',
        sort: true
    }
]

class CompetitionManagementPage extends Component {

    constructor(props) {
      super(props);
      const role = getRole();
      this.state = {
          currentPage : 1,
          query: null,
          limit: 10,
          category: null,
          status: null,
          isSuperAdmin: role == 'superadmin',
          payorID: null,
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
        this.props.history.push(`/main/competition-management/detail/${id}`);

    }

    onAddNew = () => {
        this.props.competitionStore.clearCompetition();
        this.props.history.push('/main/competition-management/add');
    }

    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            category: this.state.category,
            payorID: this.state.payorID,
            status: this.state.status,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        console.log("filter", filter);
        this.props.competitionStore.findCompetitions(filter)
        .then(result => {

        })
    }
    onClear = () => {
        this.setState({
            query: null,
            status: null,
            category: null,
        })
    }

    onChangePage = (page) => {
        this.setState({currentPage: page}, ()=>{
            this.onApplyFilter();
        })
        
    }

    onSort = (field, sortDirection) => {
        let sortParam = field.field + ':'+ sortDirection;
        if(field.field == 'period' ) {
            sortParam = `startDate:${sortDirection},endDate:${sortDirection}`
        } 
        if(field.field == 'status') {
            sortParam = `endDate:${sortDirection}`
        }
        this.setState({sortParam}, ()=>{
            this.onApplyFilter()
        })
    }
    getStringFromStatus = (status) => {
        switch(status) {
            case Constants.competitionStatus.started:
                return Strings.txtStatusStarted;
            case Constants.competitionStatus.pending:
                return Strings.txtStatusPending;
            case Constants.competitionStatus.expired:
                return Strings.txtStatusExpired;
        }
        return Strings.txtStatusExpired;
    }
    getColorFromStatus = (status) => {
        switch(status) {
            case Constants.competitionStatus.started:
                return 'green';
            case Constants.competitionStatus.pending:
                return 'yellow';
            case Constants.competitionStatus.expired:
                return 'red';
        }
        return Strings.txtStatusExpired;
    }
    getStatusFromDate = (startDate, endDate) => {

        let now = new Date();
        let nowTimestamp = now.getTime();
        let startDateTimeStamp = startDate ? (new Date(startDate)).getTime() : null;
        let endDateTimeStamp = endDate ?  (new Date(endDate)).getTime() : null;

        if(startDateTimeStamp && nowTimestamp <= startDateTimeStamp)
            return Constants.competitionStatus.pending
        else if( endDateTimeStamp && nowTimestamp >= endDateTimeStamp)
            return Constants.competitionStatus.expired
        else if( !startDateTimeStamp )
            return Constants.competitionStatus.pending
        else 
            return Constants.competitionStatus.started
    }
    render () {
        const { allPayors } = this.props.payorStore;
        const { totalCount, competitions } = this.props.competitionStore;
        let { isSuperAdmin } = this.state;
        const permissionRead = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.READ);
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.CREATE);

        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtCompetition}</div>
                <div className="buttons">
                    {
                        !isSuperAdmin && permissionCreate &&
                        <CButton 
                            onClick={()=>{this.onAddNew()}}
                            type="secondary"
                            containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtBtnAddNewCompetition}</CButton>
                    }
                </div>
            </div>
            {
                permissionRead && 
                <div className="filter">
                    <div className="cw-row">
                        {
                            isSuperAdmin &&
                            <CSelectInput containerStyle={{width: '248px'}} 
                                        data={allPayors} 
                                        label={Strings.txtFilterByPayor} 
                                        placeholder={Strings.txtAll} 
                                        selectedItemID={this.state.payorID}
                                        onItemSelected={(item)=>{this.setState({payorID: item.id})}}/>
                        }
                        <CSelectInput containerStyle={{width: '248px', marginLeft: isSuperAdmin? '16px': '0px'}} 
                                    data={statues} 
                                    label={Strings.txtFilterByStatus} 
                                    placeholder={Strings.txtAll} 
                                    selectedItemID={this.state.status}
                                    onItemSelected={(item)=>{this.setState({status: item.id})}}/>
                        <CTextInput type="search" 
                                placeholder={Strings.txtSearchCompetitionPlaceholder} 
                                containerStyle={{minWidth: '248px', marginLeft: '16px'}} 
                                label={Strings.txtSearch}
                                value={this.state.query} 
                                onChangeValue={(value)=>{this.setState({query: value})}}/>
                    </div>
                    <div className="cw-row">
                    
                        <CButton 
                            onClick={()=>{this.onApplyFilter()}}
                            isLoading={this.props.competitionStore.isLoading}
                            containerStyle={{width: '136px', height: '40px', marginTop:'8px'}}>{Strings.txtApply}</CButton>
                        <CButton 
                            onClick={()=>{this.onClear()}}
                            type='cancel'
                            containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'8px'}}>{Strings.txtClear}</CButton>

                    </div>
                </div>
            }
            {
                permissionRead &&
                <div className="content-container">
                    <CMTable
                            fields={fields}
                            data={competitions}
                            onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                            renderCustomField={(field, rowData, rowIndex, colIndex) => {
                                
                                if(field.field == 'status') {
                                    let status = this.getStatusFromDate(rowData['startDate'], rowData['endDate']);
                                    return <td key={'key'+ colIndex}>
                                        <div style={{ justifyContent: 'flex-start', alignItems: 'center', display:'flex' }}>
                                            <CStatus value={this.getStringFromStatus(status)} 
                                                color={this.getColorFromStatus(status)} />
                                        </div>
                                    </td>
                                }  else if(field.field == 'period') {
                                
                                    
                                    let periodStr = (convertDateToDisplay(rowData['startDate']) || "") + ' ~ ' + (convertDateToDisplay(rowData['endDate']) || "");
                                    return <td key={'key'+ colIndex}>
                                    {
                                        <div>{periodStr}</div>
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
            }
            
           
        </div>

    }
}

export default inject('payorStore','competitionStore')(observer(CompetitionManagementPage));