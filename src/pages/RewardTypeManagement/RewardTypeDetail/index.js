import React, { Component } from 'react';
import { CBreadcrumbs, CButton } from '../../../components/atoms'

import { Strings } from '../../../constants';

import RewardTypeForm from '../components/RewardTypeForm';

const packageDeatil = {
    id: 1
}

class RewardTypeDetailPage extends Component {
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

    onSelectTab = (index) => {

    }

    render() {

        const { id } = this.props.match.params; 
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtRewardTypeDetail}</div>
                <div className="buttons">
                </div>
            </div>
            <div className="form-content-container">
                <RewardTypeForm  history={this.props.history} isEdit={true} rewardTypeID={id}/>
            </div>
          
        </div>
    }
}

export default RewardTypeDetailPage