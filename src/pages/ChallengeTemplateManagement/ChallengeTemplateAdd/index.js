import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../components/atoms'
import ChallengeTemplateForm from '../components/ChallengeTemplateForm';
import { Strings } from '../../../constants';

const breadcrumbs = [
    {
        to: '/main/challenge-template-management',
        title: Strings.txtMasterData
    },
    {
        to: '/main/challenge-template-management',
        title: Strings.txtChallenge
    },
    {
        to: '/main/challenge-template-management/add',
        title: Strings.txtAddNewChallenge
    }
]


class ChallengeTemplateAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewTemplate}</div>
            </div>
            <div className="form-content-container">
                <ChallengeTemplateForm history={this.props.history} isEdit={false}/>
            </div>

        </div>
    }
}

export default ChallengeTemplateAddPage 