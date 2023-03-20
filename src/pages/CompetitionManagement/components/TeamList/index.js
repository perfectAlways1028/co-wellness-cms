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

import TeamListView from './components/TeamListView'
import TeamEmployeeAccordianView from './components/TeamEmployeeAccordianView'
import TeamFormModal from './components/TeamFormModal'
class TeamList extends Component {
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
            <div className="form-container"> 
                 {  
                    isDetail ?
                    <TeamEmployeeAccordianView competitionID={competitionID}/>
                    :
                    <TeamListView competitionID={competitionID}/>
                 }
                 {
                     !isDetail &&
                     <CLinkButton containerStyle={{width: "80px"}} 
                     onClick={()=>{this.onAdd()}}>{Strings.txtAddTeam}</CLinkButton>
                 }
              
                
                 <TeamFormModal ref={component => {
                     this.teamFormModal = component;
                 }} competitionID={competitionID}/>
                 <div className="cw-row" style={{ marginTop: "23px", marginBottom: "16px"}}>                
                    <CButton containerStyle={{width: "136px"}} 
                                isLoading={this.props.competitionTeamStore.isLoading}
                                onClick={()=>{this.onNext()}}>{Strings.txtBtnNext}</CButton>
                 </div>  

            </div>

        </div>
    }
}

export default inject('competitionTeamStore', 'competitionStore')(observer(TeamList));