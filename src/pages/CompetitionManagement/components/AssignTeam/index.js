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
import EmployeeSearchList from './components/EmployeeSearchList';
import TeamEmployeeAccordianView from '../TeamList/components/TeamEmployeeAccordianView';

class AssignTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
       
        };
    }


    componentDidMount() {
    
    } 

    onAdd = () => {
        this.teamFormModal.onOpen();
    }

    onNext = () => {
        if(this.props.onNext) {
            this.props.onNext();
        }
    }
    onReleadSearchList = () => {
        if(this.employeeSearchList) {
            this.employeeSearchList.onLoad();
        }
    }

    render() {
        const { isEdit } = this.props;
        const { teamConfigration, detailCompetition, competitionID } = this.props.competitionStore;
        var isDetail = isEdit;
        if(isEdit || teamConfigration == Constants.teamConfigration.AUTOMATICALLY) {
            isDetail = true;
        }
        if(!competitionID) return null;
        const permissionRead = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.READ);
        return <div className="cw-competition-form-container">
            <div style={{fontSize: 14, marginTop: '12px',
                          marginLeft: '16px', marginBottom: '16px',
                           color: '#353957'}}>{Strings.txtAssignTeamDescription}</div>
            <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}> 
                <div style={{flex: 1, flexDirection: 'column'}}> 
                    <EmployeeSearchList ref={component => {this.employeeSearchList = component}} competitionID={competitionID} />
                </div>
                <div style={{width: '30px'}}/>
                <div style={{flex: 1, flexDirection: 'column'}}> 
                    <TeamEmployeeAccordianView competitionID={competitionID} isEdit={true} onReload={()=>{this.onReleadSearchList()}}/>
                </div>
            </div>
            <div className="cw-row" style={{ marginTop: "23px", marginBottom: "16px"}}>                
                <CButton containerStyle={{width: "136px"}} 
                                isLoading={this.props.competitionTeamStore.isLoading}
                                onClick={()=>{this.onNext()}}>{Strings.txtBtnNext}</CButton>
            </div>  
        </div>
    }
}

export default inject('competitionTeamStore', 'competitionStore')(observer(AssignTeam));