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

import MiniChallengeList from './components/MiniChallengeList'

import MiniChallengeForm from './components/MiniChallengeForm'


class MiniChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'list',        // list, form
            params: {}
        };
    }

    onChangePage = (page, params) => {
        this.setState({page: page, params: params})
    }
    renderPage = (competitionID, page, params) => {
        if(page == 'list') 
            return <MiniChallengeList params={params} competitionID={competitionID} onChangePage={this.onChangePage}/>
        else if(page == 'form')
            return <MiniChallengeForm params={params} competitionID={competitionID} onChangePage={this.onChangePage}/>
    }
    componentDidMount() {
    
    } 
    onNext = () => {
        const { isEdit } = this.props;
        if(isEdit) {
            if(this.props.onNext) {
                this.props.onNext();
            }
        } else {
            this.onFinalize()
        }
        
    }
    onFinalize = () => {
        this.props.competitionStore.finalizeCompetitionCreation()
        .then(successed => {
            this.props.history.replace('/main/competition-management')
        })
    
    }

    render() {
        const { isEdit } = this.props;
        const { detailCompetition, competitionID } = this.props.competitionStore;
        
        if(!competitionID) return null;
        const permissionRead = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.READ);
        return <div className="cw-competition-form-container"> 
            {this.renderPage(competitionID, this.state.page, this.state.params)}
            <div className="cw-row" style={{ marginTop: "23px", marginBottom: "16px"}}>                
                <CButton containerStyle={{width: isEdit ? "136px" : "160px"}} 
                                isLoading={this.props.competitionChallengeStore.isLoading}
                                onClick={()=>{this.onNext()}}>{isEdit ? Strings.txtBtnNext : Strings.txtSetupNotifications}</CButton>
            </div>  
        </div>
    }
}

export default inject('competitionChallengeStore', 'competitionStore')(observer(MiniChallenge));