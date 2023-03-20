import React, { Component } from 'react';
import { CBreadcrumbs, CButton } from '../../../components/atoms'

import { Strings } from '../../../constants';

import ChallengeTemplateForm from '../components/ChallengeTemplateForm';

class ChallengeDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/challenge-template-management',
                title: Strings.txtMasterData
            },
            {
                to: '/main/challenge-template-management',
                title: Strings.txtChallengeTemplate
            },

            {
                to: `/main/challenge-template-management/detail/${id}`,
                title: Strings.txtChallengeTemplateDetail
            },
        ]
    }

    render() {
        const { id } = this.props.match.params; 
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtChallengeDetail}</div>
                <div className="buttons">
                </div>
            </div>
            <div className="form-content-container">
                <ChallengeTemplateForm  history={this.props.history} isEdit={true} challengeID={id}/>
            </div>
          
        </div>
    }
}

export default ChallengeDetailPage