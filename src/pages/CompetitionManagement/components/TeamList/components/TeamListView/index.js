import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CStatus } from '@components/atoms'
import { CMTable } from '@components/molecules';

import { Strings, Constants } from '@constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const fields = [
    {
        title: Strings.txtFieldTeamNames,
        field: 'name'
    }
]

class TeamListView extends Component {

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
    }

    render () {
        const { teams } = this.props.competitionTeamStore;
        return  <div className="content-container"  style={{marginLeft: '0px', marginRight: '16px'}}>
                    <CMTable
                            fields={fields}
                            data={teams}
                            onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                            renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            }}
                            onRowClick={(rowData, rowIndex) => {this.onRowClick(rowData, rowIndex)}}
                            containerStyle={{marginTop: '16px'}}
                    />
                </div>
    

    }
}

export default inject('competitionTeamStore')(observer(TeamListView));