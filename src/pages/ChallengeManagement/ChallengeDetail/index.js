import React, { Component } from 'react';
import { CBreadcrumbs, CButton } from '../../../components/atoms'

import { Strings, Constants } from '../../../constants';

import ChallengeForm from '../components/ChallengeForm';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

class ChallengeDetailPage extends Component {
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
                to: `/main/challenge-management/detail/${id}`,
                title: Strings.txtChallengeDetail
            },
        ]
    }

    render() {
        const permissionRead = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.READ);
        
        const { id } = this.props.match.params; 
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtChallengeDetail}</div>
            </div>
            <div className="form-content-container">
                { 
                    permissionRead &&
                    <ChallengeForm  history={this.props.history} isEdit={true} challengeID={id}/>
                }
                
            </div>
          
        </div>
    }
}

export default ChallengeDetailPage