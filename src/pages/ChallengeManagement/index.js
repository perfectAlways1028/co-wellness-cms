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
        to: '/main/challenge-management',
        title: Strings.txtChallenge
    }
]

const statues = [
    {
        id: Constants.challengeStatus.pending,
        name: Strings.txtStatusPending
    },
    {
        id: Constants.challengeStatus.started,
        name: Strings.txtStatusStarted
    },
    {
        id: Constants.challengeStatus.expired,
        name: Strings.txtStatusExpired
    },
]

const fields = [
    {
        title: Strings.txtFieldChallengeID,
        field: 'challengeIDCode'
    },
    {
        title: Strings.txtFieldPayorName,
        field: 'payorName',
        sort: true
    },
    {
        title: Strings.txtFieldCategory,
        field: 'category'
    },
    {
        title: Strings.txtFieldChallengeTitle,
        field: 'title'
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

const data = [
    {
        id: 1,
        challengeIDCode: 'CH000001',
        category: 'Steps',
        title: '16,000 Steps a Day',
        period: '2 Jan 2020 ~  2 Mar 2020',
        status: 'EXPIRED'
    },
    {
        id: 2,
        challengeIDCode: 'CH000002',
        category: 'Steps',
        title: '16,000 Steps a Day',
        period: '2 Jan 2020 ~  2 Mar 2020',
        status: 'PENDING'
    },

    {
        id: 3,
        challengeIDCode: 'CH000003',
        category: 'Steps',
        title: '16,000 Steps a Day',
        period: '2 Jan 2020 ~  2 Mar 2020',
        status: 'STARTED'
    },


]

class ChallengeManagementPage extends Component {

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
        this.props.history.push(`/main/challenge-management/detail/${id}`);

    }

    onGotoTemplate = () => {
        this.props.history.push('/main/challenge-template-use');
    }
    onAddNew = () => {
        this.props.history.push('/main/challenge-management/add');
    }

    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            category: this.state.category,
            status: this.state.status,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        console.log("filter", filter);
        this.props.challengeStore.findChallenges(filter)
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
            case Constants.challengeStatus.started:
                return Strings.txtStatusStarted;
            case Constants.challengeStatus.pending:
                return Strings.txtStatusPending;
            case Constants.challengeStatus.expired:
                return Strings.txtStatusExpired;
        }
        return Strings.txtStatusExpired;
    }
    getColorFromStatus = (status) => {
        switch(status) {
            case Constants.challengeStatus.started:
                return 'green';
            case Constants.challengeStatus.pending:
                return 'yellow';
            case Constants.challengeStatus.expired:
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
            return Constants.challengeStatus.pending
        else if( endDateTimeStamp && nowTimestamp >= endDateTimeStamp)
            return Constants.challengeStatus.expired
        else if( !startDateTimeStamp )
            return Constants.challengeStatus.pending
        else 
            return Constants.challengeStatus.started
    }
    render () {
        const { totalCount, challenges } = this.props.challengeStore;
        let { isSuperAdmin } = this.state;
        const permissionRead = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.READ);
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.CREATE);

        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtChallenge}</div>
                <div className="buttons">
                    {
                        !isSuperAdmin && permissionCreate &&
                        <CButton 
                            onClick={()=>{this.onGotoTemplate()}}
                            type="secondary"
                            containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtChallengeTemplate}</CButton>
                    } 
                    {
                        !isSuperAdmin && permissionCreate &&
                        <CButton 
                            onClick={()=>{this.onAddNew()}}
                            type="secondary"
                            containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtAddNewChallenge}</CButton>
                    }
                </div>
            </div>
            {
                permissionRead && 
                <div className="filter">
                    <div className="cw-row">
                        <CSelectInput containerStyle={{width: '248px'}} 
                                        data={Constants.callengeCategories} 
                                        label={Strings.txtFilterByChallengeCategory} 
                                        placeholder={Strings.txtAll} 
                                        selectedItemID={this.state.category}
                                        onItemSelected={(item)=>{this.setState({category: item.id})}}/>
                        <CSelectInput containerStyle={{width: '248px', marginLeft: '16px'}} 
                                    data={statues} 
                                    label={Strings.txtFilterByStatus} 
                                    placeholder={Strings.txtAll} 
                                    selectedItemID={this.state.status}
                                    onItemSelected={(item)=>{this.setState({status: item.id})}}/>
                    </div>
                    <div className="cw-row">
                        <CTextInput type="search" 
                                    placeholder={Strings.txtSearchChallengePlaceholder} 
                                    containerStyle={{minWidth: '248px'}} 
                                    label={Strings.txtSearch}
                                    value={this.state.query} 
                                    onChangeValue={(value)=>{this.setState({query: value})}}/>
                        <CButton 
                            onClick={()=>{this.onApplyFilter()}}
                            isLoading={this.props.challengeStore.isLoading}
                            containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'8px'}}>{Strings.txtApply}</CButton>
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
                            data={challenges}
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

export default inject('payorStore','challengeStore')(observer(ChallengeManagementPage));