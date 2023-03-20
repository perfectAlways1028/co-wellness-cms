import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDropdownButton, CStatus } from '@components/atoms'
import { CMMultiselectTable } from '@components/molecules';

import { Strings, Constants } from '@constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';
import './style.scss'
const fields = [
    {
        title: Strings.txtFieldName,
        field: 'name',
        sort: true
    }, 
    {
        title: Strings.txtFieldDepartment,
        field: 'departmentName',
        sort: true
    }
]

class EmployeeSearchList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        limit: 10,
        currentPage : 1,
        selectedItemIDs: []
      };
    }

    componentDidMount() {
        this.onLoad();
    }
    onLoad = () => {
        this.onApplyFilter();
    }
    onChangePage = (page) => {
        console.log("onChangePage", page);
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

    onSelectItem = (selectedItems) => {
   
        let selectedItemIDs = selectedItems.map(item => item.id);
        console.log("selectedItemIds", selectedItemIDs);
        this.setState({selectedItemIDs: selectedItemIDs})
    }
    onTeamSelect = (item) => {
        const  { selectedItemIDs } = this.state 
        if(!selectedItemIDs || selectedItemIDs.length == 0) return;
        if(!item) return;
        let input = {
            employeeIDs : selectedItemIDs,
            teamID: item.id
        }
        console.log("input", input);
        this.props.competitionTeamStore.bulkCreateCompetitionTeamEmployee(input)
        .then(result => {
            this.setState({selectedItemIDs: []}, ()=> { this.onApplyFilter();})
           
        })
    }
    onApplyFilter = () => {
        let query = this.state.query;
        if(query === "")
        query = null;
        let filter = {
            competitionID: this.props.competitionID,
            limit: this.state.limit,
            query: query,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        this.props.competitionTeamStore.findEmployeesNotInCompetition(filter)
        this.props.competitionTeamStore.findCompetitionTeams({competitionID: this.props.competitionID})
        .then(foundTeams => {
            this.props.competitionTeamStore.findCompetitionTeamEmployees({competitionID: this.props.competitionID})
        })
    }

    render () {
        const { totalCount, employees, teams } = this.props.competitionTeamStore;
        return <div style={{flex: 1, display:'flex', flexDirection:'column', marginTop: '16px'}}>
            <div className="search-bar-container">
                <CTextInput type="search" 
                    placeholder={Strings.txtSearch} 
                    containerStyle={{minWidth: '248px', marginLeft: '16px', marginTop: '8px'}} 
                    value={this.state.query} 
                    onChangeValue={(value)=>{this.setState({query: value}, ()=> {this.onApplyFilter()})}}
                    />
                 <CDropdownButton containerStyle={{width: "160px", marginTop: '10px', marginRight: '16px'}} 
                                data={teams}
                                isLoading={this.props.competitionTeamStore.isLoading}
                                disabled={!this.state.selectedItemIDs || this.state.selectedItemIDs.length == 0}
                                onItemClick={(item) => {this.onTeamSelect(item)}}>{Strings.txtAddToTeam}</CDropdownButton>
            </div>
            <div className="content-container" style={{marginLeft:'0px', marginTop: '0px'}}>
                    <CMMultiselectTable
                            fields={fields}
                            data={employees}
                            selectedItemIDs={this.state.selectedItemIDs}
                            onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                            renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            }}
                            onItemSelected={(selectedItems) => {this.onSelectItem(selectedItems)}}
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

export default inject('competitionTeamStore')(observer(EmployeeSearchList));