import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CStatus, CLinkButton } from '@components/atoms'
import { CMTable } from '@components/molecules';

import { Strings, Constants } from '@constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

import TeamLeaderBoard from './components/TeamLeaderBoard';
import EmployeeLeaderBoard from './components/EmployeeLeaderBoard';

class TeamEmployeeLeaderBoard extends Component {

    constructor(props) {
      super(props);
      this.state = {
          teamID: null
      };
    }

    onTeamSelect = (id) => {
        this.setState({teamID: id}, ()=> {
            if(this.employeeLeaderBoard) {
                this.employeeLeaderBoard.onLoad();
            }
        })
    }
    onChangePage = (page, params) => {
        if(this.props.onChangePage) {
            this.props.onChangePage(page, params)
        }
    }
    render () {
        const { competitionID } = this.props;
        const permissionRead = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.READ);
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.CREATE);

        return <div className="form-container">  
             <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}> 
                <div style={{flex: 1, flexDirection: 'column'}}> 
                    <TeamLeaderBoard competitionID={competitionID} onTeamSelect={this.onTeamSelect}/>
                </div>
                <div style={{width: '30px'}}/>
                <div style={{flex: 1, flexDirection: 'column'}}> 
                    <EmployeeLeaderBoard ref={component=>{ this.employeeLeaderBoard = component}} teamID={this.state.teamID} onChangePage={this.onChangePage}/>
                </div>
            </div>
        </div>

    }
}

export default inject('competitionStore')(observer(TeamEmployeeLeaderBoard));