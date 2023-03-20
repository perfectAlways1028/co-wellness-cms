import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CStatus } from '@components/atoms'
import { CMAccordianTable } from '@components/molecules';

import { Strings, Constants } from '@constants';
import { inject, observer } from "mobx-react";
import { toast } from 'react-toastify';
import { convertDateToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const sectionFields = [
    {
        title: '',
        field: 'name'
    },
    {
        title: '',
        field: 'empty'
    },
    {
        title: '',
        field: 'memberCount',
        type: 'custom'
    },
]
const fields = [
    {
        title: Strings.txtFieldTeamNames,
        field: 'name'
    },
    {
        title: '',
        field: 'departmentName'
    },
    {
        title: '',
        field: 'empty'
    },
]

class TeamEmployeeAccordianView extends Component {

    constructor(props) {
      super(props);
      this.state = {
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
    onApplyFilter = () => {
        let filter = {
            competitionID: this.props.competitionID,
        }
        this.props.competitionTeamStore.findCompetitionTeams(filter)
        .then(foundTeams => {
            this.props.competitionTeamStore.findCompetitionTeamEmployees(filter)
        })
       
    }

    onDeleteRow = (rowData) => {
        if (window.confirm('Are you sure you wish to delete this row?'))  {
            this.onDeleteCompetitionTeamEmployee(rowData.id) 
        }
    }
    onDeleteCompetitionTeamEmployee = (id) => {
        this.props.competitionTeamStore.deleteCompetitionTeamEmployee(id)
        .then(deleted => {
            toast(Strings.txtCompetitionTeamEmployeeDeleteSuccess);
            this.onApplyFilter();
            if(this.props.onReload) this.props.onReload()

        })
    }

    render () {
        const { teamEmployees } = this.props.competitionTeamStore;
        return  <div className="content-container"  style={{marginLeft: '0px', marginRight: '16px'}}>
                    <CMAccordianTable
                            sectionFields = {sectionFields}
                            fields={fields}
                            data={teamEmployees}
                            enableDeleteChild={this.props.isEdit}
                            onDeleteRow={(rowData) =>{this.onDeleteRow(rowData)}}
                            renderCustomField={(field, rowData, rowIndex, colIndex) => {
                                if(field.field == 'memberCount') {
                                    let memberCountStr = "";
                                    if(rowData.children) {
                                        memberCountStr = rowData.children.length + " "+ (rowData.children.length < 2 ? "member" : "members");
                                    }
                                    return <td key={'key'+ colIndex}>
                                        {
                                            <div style={{ fontStyle: 'italic'}}>{memberCountStr}</div>
                                        }
                                    </td>
                                }
                            }}
                            onRowClick={(rowData, rowIndex) => {this.onRowClick(rowData, rowIndex)}}
                            containerStyle={{marginTop: '16px'}}
                    />
                </div>
    

    }
}

export default inject('competitionTeamStore')(observer(TeamEmployeeAccordianView));