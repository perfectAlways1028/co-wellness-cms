import React, { Component } from 'react';
import { CBreadcrumbs, CButton } from '../../../components/atoms'

import { Strings, Constants } from '../../../constants';

import RewardForm from '../components/RewardForm';

import { checkPermissionAllowed } from '@helpers/permissionHelper';

class RewardDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/reward-management',
                title: Strings.txtRewards
            },
            {
                to: `/main/reward-management/detail/${id}`,
                title: Strings.txtRewardDetail
            },
        ]
    }
    render() {

        const { id } = this.props.match.params; 
        const permissionRead = checkPermissionAllowed(Constants.PAGE.REWARDS, Constants.PAGE_PERMISSION.READ);
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtRewardDetail}</div>
                <div className="buttons">
                </div>
            </div>
            <div className="form-content-container">
                {
                    permissionRead &&
                    <RewardForm  history={this.props.history} isEdit={true} rewardID={id}/>
                }
               
            </div>
          
        </div>
    }
}

export default RewardDetailPage