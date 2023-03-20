import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../components/atoms'
import ChallengeForm from '../components/ChallengeForm';
import { Strings, Constants } from '../../../constants';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const breadcrumbs = [
    {
        to: '/main/challenge-management',
        title: Strings.txtChallenge
    },
    {
        to: '/main/challenge-management/add',
        title: Strings.txtAddNewChallenge
    }
]


class ChallengeAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.CREATE);
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewChallenge}</div>
            </div>
            <div className="form-content-container">
                {
                    permissionCreate &&
                    <ChallengeForm history={this.props.history} isEdit={false}/>
                }
                
            </div>

        </div>
    }
}

export default ChallengeAddPage 