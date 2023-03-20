import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../components/atoms'
import RewardTypeForm from '../components/RewardTypeForm';
import { Strings } from '../../../constants';

const breadcrumbs = [
    {
        to: '/main/reward-type-management',
        title: Strings.txtRewardType
    },

    {
        to: '/main/reward-type-management/add',
        title: Strings.txtAddNewRewardType
    }
]


class RewardTypeAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewRewardType}</div>
            </div>
            <div className="form-content-container">
                <RewardTypeForm history={this.props.history} isEdit={false}/>
            </div>

        </div>
    }
}

export default RewardTypeAddPage