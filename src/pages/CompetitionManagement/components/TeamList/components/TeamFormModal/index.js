import React, { Component } from 'react';
import { CModal, CButton, CTextInput, CImageButton } from '@components/atoms'

import { Strings, Images } from '@constants';

import './style.scss'

import { toast } from 'react-toastify';
import { inject, observer } from "mobx-react";

class TeamFormModal extends Component {
    constructor(props) {
        super(props);
        this.state= {
            modalOpened: false,
            name: null,
            errName: null,
           
        }
    }

    onClose = () => {
        this.setState({modalOpened : false})
    }
    onOpen = () => {
        this.setState({modalOpened: true})
    }
    
    validateForm = () => {
        let valid = true;
        let validName = this.state.name && this.state.name != "";
        if(!validName) this.setState({errName: Strings.txtErrNameRequired})
        else this.setState({errName: null})
    
        return valid;
    }
    onSave = () => {
        const { name} = this.state;
   
        const { competitionID } = this.props;
        if(competitionID && this.validateForm()) {
            let body = {
                competitionID: competitionID,
                name: name
            }
            this.props.competitionTeamStore.createCompetitionTeam(body)
            .then(success =>{
                this.setState({
                    modalOpened: false,
                    name: null,
                    errName: null,
                })
                this.props.competitionTeamStore.findCompetitionTeams({competitionID: competitionID})
                toast(Strings.txtTeamCreateSuccess)
            })
            .catch(err => {
                toast(Strings.txtUnexpectedError, {type: 'error'})
                
            })
        }
    }
    render() {
        const { modalOpened } = this.state;
        return <div className='cw-column'>
            <CModal
                isOpen={modalOpened}
                onRequestClose={()=>{this.onClose()}}
                contentLabel={Strings.txtChangePassword}
                contentStyle={{width: '770px', height: '378px'}}
            >   
                <div className="cw-modal-team-form-container">
                    <CImageButton containerStyle={{    
                        position: 'absolute',
                        width: '48px',
                        height: '48px',
                        top: '24px',
                        right: '24px'}}
                        src={Images.close}
                        onClick={()=>{this.onClose()}}/>

                    <div className={'title'}>
                        {Strings.txtAddTeamTitle}
                    </div>
                    <CTextInput
                        label={Strings.txtFieldTeamName}
                        value={this.state.name}
                        onChangeValue={(value) => {this.setState({name: value})}}
                        placeholder={Strings.txtFieldTeamName}
                        error={this.state.errName}
                        containerStyle={{marginTop: '27px', width: '335px'}}
                    />
             
                    <CButton containerStyle={{width:'160px', marginTop: '40px'}}
                             isLoading={this.props.competitionTeamStore.isLoading} 
                             onClick={()=>{this.onSave()}} >{Strings.txtBtnSave}</CButton>

                </div>
            </CModal>
      </div>
    }
}

export default inject('competitionTeamStore')(observer(TeamFormModal));
