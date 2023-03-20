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
        title: Strings.txtFieldTeamName,
        field: 'name',
        type: 'custom'
    },
    {
        title: Strings.txtFieldDiamonds,
        field: 'totalCompetitionPoint',
        type: 'custom'
    }
]

class TeamLeaderBoard extends Component {

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
        if(!this.props.competitionID) return;
        let filter = {
            competitionID: this.props.competitionID,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        this.props.competitionLeaderboardStore.findCompetitionTeams(filter)
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
        if(this.props.onTeamSelect) {
            this.props.onTeamSelect(id)
        }
    }
    onApplyFilter = () => {
        if(!this.props.competitionID) return;
        let filter = {
            competitionID: this.props.competitionID,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        this.props.competitionLeaderboardStore.findCompetitionTeams(filter);
    }

    render () {
        const { teamTotalCount, teams } = this.props.competitionLeaderboardStore;
        const { detailCompetition } = this.props.competitionStore;
        const numberOfWinners = detailCompetition ? detailCompetition.numberOfWinners : null;
        const totalCount = teamTotalCount;
        return <div style={{flex: 1, display:'flex', flexDirection:'column', marginTop: '16px'}}>
            <div className="content-container" style={{marginLeft:'0px', marginTop: '0px'}}>
                    <CMTable
                            fields={fields}
                            data={teams}
                            selection={true}
                            onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                            renderCustomField={(field, rowData, rowIndex, colIndex) => {
                                let ranking = rowIndex + 1 + this.state.limit * (this.state.currentPage -1);
                                if(field.field == 'num') {
                                  
                                    return <td key={'key'+ colIndex}>
                                        {ranking}
                                    </td>
                                } else if(field.field == 'name') {
                                    if(numberOfWinners && ranking <= numberOfWinners) {
                                        return <td key={'key'+ colIndex}>
                                        {<img src={Images.medal} style={{width:'18px', height: '18px', marginRight: '4px', }}/>}
                                        <span>{rowData[field.field]}</span>
                                        </td>
                                    } else {
                                        return <td key={'key'+ colIndex}>
                                        {rowData[field.field]}
                                        </td>
                                    }
                                  
                            
                                } else if(field.field == 'totalCompetitionPoint') {
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

export default inject('competitionLeaderboardStore', 'competitionStore')(observer(TeamLeaderBoard));