import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../components/atoms'
import { CMTable } from '../../components/molecules';

import { Strings, Constants } from '../../constants';
import { inject, observer } from "mobx-react";
import './style/style.scss'
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const breadcrumbs = [
    {
        to: '/main/job-management',
        title: Strings.txtJobLevel
    }
]

const statuses = [
    {
        id: true,
        name: Strings.txtActive
    },
    {
        id: false,
        name: Strings.txtNonActive
    },
]


const superAdminFields = [
    {
        title: Strings.txtFieldJobLevelID,
        field: 'jobIDCode'
    },
    {
        title: Strings.txtFieldJobLevel,
        field: 'name'
    },
    {
        title: Strings.txtFieldPayorName,
        field: 'payorName'
    }
    ];

const payorAdminFields = [
    {
        title: Strings.txtFieldJobLevelID,
        field: 'jobIDCode'
    },
    {
        title: Strings.txtFieldJobLevelName,
        field: 'name'
    },];

class JobLevelManagementPage extends Component {

    constructor(props) {
      super(props);

      this.state = {
          limit: 10,
          currentPage: 1,
          query: null,
          status: null,
          payorID: null,
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
        this.props.history.push(`/main/job-management/detail/${id}`);

    }

    onImportCSV = () => {

    }
    onAddNewJob = () => {
        this.props.history.push('/main/job-management/add');
    }

    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            payorID: this.state.payorID,
            active: this.state.status,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        console.log("filter", filter);
        this.props.jobStore.findJobs(filter)
        .then(result => {

        })
    }
    onClear = () => {
        this.setState({
            query: null,
            status: null,
            payorID: null,
        })
    }

    onChangePage = (page) => {
        this.setState({currentPage: page}, ()=>{
            this.onApplyFilter();
        })
        
    }

    render () {
        const { totalCount, jobs } = this.props.jobStore;
        const { allPayors } = this.props.payorStore;
        const permissionRead = checkPermissionAllowed(Constants.PAGE.JOB_LEVEL, Constants.PAGE_PERMISSION.READ);
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.JOB_LEVEL, Constants.PAGE_PERMISSION.CREATE);
       
        const role = getRole()
        const isSuperAdmin = role == 'superadmin';
        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtJobLevel}</div>
                <div className="buttons">
                    {
                        permissionCreate &&
                        <CButton 
                            onClick={()=>{this.onAddNewJob()}}
                            type="secondary"
                            containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtBtnAddNewJobLevel}</CButton>
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
                        <CSelectInput containerStyle={{width: '248px', marginLeft: isSuperAdmin ? '30px' : '0px'}} 
                                    data={statuses} 
                                    label={Strings.txtFilterByStatus} 
                                    placeholder={Strings.txtAll} 
                                    selectedItemID={this.state.status}
                                    onItemSelected={(item)=>{this.setState({status: item.id})}}/>
                    </div>
                    <div className="cw-row">
                        <CTextInput type='search' 
                                    placeholder={Strings.txtUserManagementSearchPlaceholder} 
                                    containerStyle={{width: '248px'}} 
                                    value={this.state.query} 
                                    onChangeValue={(value)=>{this.setState({query: value})}}
                                    label={Strings.txtSearch}/>
                        <CButton 
                            onClick={()=>{this.onApplyFilter()}}
                            isLoading={this.props.jobStore.isLoading}
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
                            fields={isSuperAdmin ? superAdminFields : payorAdminFields}
                            data={jobs}
                            renderCustomField={(row, col, field, item) => {
                                return null;
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

export default inject('payorStore','jobStore')(observer(JobLevelManagementPage));
