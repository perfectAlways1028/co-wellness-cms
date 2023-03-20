import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CLinkButton, CSelectInput, CTextInput, CPagination, CDatePicker, CTextArea } from '@components/atoms'
import { CMImagePicker } from '@components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '@constants';
import { inject, observer } from "mobx-react";
import './style.scss'
import { toast } from 'react-toastify';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

import TeamEmployeeLeaderBoard from './components/TeamEmployeeLeaderBoard'
import CompetitionPointHistory from './components/CompetitionPointHistory'


class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'leaderboard',        // leaderboard, pointHistory
            params: {}
        };
    }

    onChangePage = (page, params) => {
        this.setState({page: page, params: params})
    }
    renderPage = (competitionID, page, params) => {
        if(page == 'leaderboard') 
            return <TeamEmployeeLeaderBoard params={params} competitionID={competitionID} onChangePage={this.onChangePage}/>
        else if(page == 'pointHistory')
        return <CompetitionPointHistory params={params} competitionID={competitionID} onChangePage={this.onChangePage}/>
    }
    componentDidMount() {
    
    } 

    render() {
        const { isEdit } = this.props;
        const { detailCompetition, competitionID } = this.props.competitionStore;
        
        if(!competitionID) return null;
        const permissionRead = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.READ);
        return <div className="cw-competition-form-container"> 
            {this.renderPage(competitionID, this.state.page, this.state.params)}
        </div>
    }
}

export default inject('competitionStore')(observer(LeaderBoard));