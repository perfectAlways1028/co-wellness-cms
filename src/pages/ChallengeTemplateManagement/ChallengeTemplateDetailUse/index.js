import React, { Component } from 'react';
import { CBreadcrumbs, CButton } from '../../../components/atoms'

import { Strings } from '../../../constants';

import ChallengeTemplateForm from '../components/ChallengeTemplateForm';
import { toast } from 'react-toastify';
import { inject, observer } from "mobx-react";

class ChallengeTemplateDetailUsePage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/challenge-management',
                title: Strings.txtChallenge
            },
            {
                to: '/main/challenge-template-use',
                title: Strings.txtChallengeTemplate
            },

            {
                to: `/main/challenge-template-use/detail/${id}`,
                title: Strings.txtChallengeTemplateDetail
            },
        ]
    }
    /*onUseTemplate = (id) => {
        if (window.confirm('Are you sure you wish to create challenge using this template?'))  {
            this.props.challengeStore.createFromTemplate(id)
            .then(result => {
                toast(Strings.txtChallengeCreateSuccess);
                this.props.history.go(-2);
            })
            .catch(ex => {
                toast(Strings.txtUnexpectedError);
            })
        }
    }*/
    render() {
        const { id } = this.props.match.params; 
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtChallengeTemplateDetail}</div>
                <div className="buttons">
                    {/*<CButton 
                        isLoading={this.props.challengeStore.isLoading}
                        onClick={()=>{this.onUseTemplate(id)}}
                        type="secondary"
                        containerStyle={{width: '172px', height: '40px'}}>{Strings.txtBtnUse}</CButton>
                    */}
                </div>
            </div>
            <div className="form-content-container">
                <ChallengeTemplateForm  history={this.props.history} isEdit={true} challengeID={id} isUse={true}/>
            </div>
          
        </div>
    }
}

export default inject('challengeStore')(observer(ChallengeTemplateDetailUsePage));
