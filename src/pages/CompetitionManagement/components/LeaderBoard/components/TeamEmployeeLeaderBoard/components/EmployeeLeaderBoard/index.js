import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDropdownButton, CStatus } from '@components/atoms'
import { CMTable } from '@components/molecules';

import { Strings, Constants, Images } from '@constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';


const fields = [
    {
        title: Strings.txtFieldNum,
        field: 'num',
        type: 'custom'
    },
    {
        title: Strings.txtFieldMember,
        field: 'name'
    },
    {
        title: Strings.txtFieldDiamonds,
        field: 'competitionPoint',
        type: 'custom'
    }
]

class EmployeeLeaderBoard extends Component {

    constructor(props) {
      super(props);
      this.state = {
        limit: 10,
        currentPage : 1
      };
    }

    componentDidMount() {
        this.onLoad();
    }
    onLoad = () => {
        this.setState({limit: 10, currentPage: 1}, ()=> {
            this.onApplyFilter();
        })
    }
    onChangePage = (page) => {
        if(!this.props.teamID) return;
        let filter = {
            teamID: this.props.teamID,
            limit: this.state.limit,
            offset: this.state.limit * (page - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        this.props.competitionLeaderboardStore.findCompetitionTeamMembers(filter)
        .then(result => {
            this.setState({currentPage: page})
        })
    }
    onSort = (field, sortDirection) => {
        let sortParam = field.field + ':'+ sortDirection;
        this.setState({sortParam}, ()=>{
            this.onApplyFilter()
        })
    }
    onRowClick = (rowData, index) => {
        let id = rowData.id;
        if(this.props.onChangePage)
        this.props.onChangePage('pointHistory', {name: rowData.name, employeeID: rowData.employeeID})
    }
    onApplyFilter = () => {
        if(!this.props.teamID) return;
        let filter = {
            teamID: this.props.teamID,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        this.props.competitionLeaderboardStore.findCompetitionTeamMembers(filter);
    }

    render () {
        const { memberTotalCount, members } = this.props.competitionLeaderboardStore;
        const totalCount = memberTotalCount;
        return <div style={{flex: 1, display:'flex', flexDirection:'column', marginTop: '16px'}}>
            <div className="content-container" style={{marginLeft:'0px', marginTop: '0px'}}>
                    <CMTable
                            fields={fields}
                            data={members}
                            onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                            renderCustomField={(field, rowData, rowIndex, colIndex) => {
                                if(field.field == 'num') {
                                    return <td key={'key'+ colIndex}>
                                        {rowIndex + 1 + this.state.limit * (this.state.currentPage -1)}
                                    </td>
                                } else if(field.field == 'competitionPoint') {
                                    return <td key={'key'+ colIndex}>
                                      {<img src={Images.diamond} style={{width:'12px', height: '12px', marginRight: '4px'}}/>}
                                        {rowData[field.field]}
                                    </td>
                                }
                            }}
                            onRowClick={(rowData, rowIndex) => {this.onRowClick(rowData, rowIndex)}}
                            containerStyle={{marginTop: '0px'}}
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

export default inject('competitionLeaderboardStore')(observer(EmployeeLeaderBoard));