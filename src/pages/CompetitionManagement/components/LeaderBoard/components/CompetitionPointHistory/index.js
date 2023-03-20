import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CStatus, CLinkButton } from '@components/atoms'
import { CMTable } from '@components/molecules';

import { Strings, Constants, Images } from '@constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';


const fields = [
    {
        title: Strings.txtFieldCompetitionTitle,
        field: 'competitionName',
    },
    {
        title: Strings.txtFieldMiniChallengeName,
        field: 'challengeTitle'
    },
    {
        title: Strings.txtFieldCompletedDate,
        field: 'createdAt',
        type: 'custom'
    },
    {
        title: Strings.txtFieldDiamonds,
        field: 'amount',
        type: 'custom',
    }
]

class CompetitionPointHistory extends Component {

    constructor(props) {
      super(props);
        
      this.state = {
          currentPage : 1,
          query: null,
          limit: 10,
          category: null,
          status: null,
          sortParam: null,
          competitionID: this.props.competitionID,
          employeeID: this.props.params ? this.props.params.employeeID : null,
          name: this.props.params ? this.props.params.name : null
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
    }
    onAdd = () => {
        if(this.props.onChangePage) {
            this.props.onChangePage('form', {isEdit: false})
        }
    }

    onApplyFilter = () => {
        let filter = {
            competitionID: this.state.competitionID,
            employeeID: this.state.employeeID,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        console.log("filter", filter);
        this.props.competitionLeaderboardStore.findCompetitionPointHistory(filter)
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
    onCancel = () => {
        if(this.props.onChangePage) {
            this.props.onChangePage('leaderboard')
        }
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
        const { pointHistoryTotalCount, pointHistoryRecords } = this.props.competitionLeaderboardStore;
        const permissionRead = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.READ);
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.CREATE);
        const totalCount = pointHistoryTotalCount;

        return <div className="form-container">  
            <div className="header" style={{marginLeft: '0px', paddingLeft: '0px'}}>
                <div className="title">{(this.state.name? (this.state.name+"'s "):"")+Strings.txtLeaderboardHistory}</div>
            </div>
            {
                permissionRead &&
                <div className="content-container" style={{marginLeft: '0px', marginRight: '16px'}}>
                    <CMTable
                            fields={fields}
                            data={pointHistoryRecords}
                            onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                            renderCustomField={(field, rowData, rowIndex, colIndex) => {
                                
                                if(field.field == 'amount') {
                                    return <td key={'key'+ colIndex}>
                                      {<img src={Images.diamond} style={{width:'12px', height: '12px', marginRight: '4px'}}/>}
                                        {rowData[field.field]}
                                    </td>
                                }  else if(field.field == 'createdAt') {
                                
                                    
                                    let completedDate = convertDateToDisplay(rowData['createdAt']) || "";
                                    return <td key={'key'+ colIndex}>
                                    {
                                        <div>{completedDate}</div>
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
            {
                <CButton containerStyle={{width: "136px", marginBottom: "16px"}} type="cancel" onClick={()=>{this.onCancel()}}>{Strings.txtBtnCancel}</CButton>
            }
            
        </div>

    }
}

export default inject('competitionLeaderboardStore')(observer(CompetitionPointHistory));