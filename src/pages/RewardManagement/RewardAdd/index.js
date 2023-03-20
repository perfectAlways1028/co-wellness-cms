import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../components/atoms'
import RewardForm from '../components/RewardForm';
import { Strings, Constants } from '../../../constants';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const breadcrumbs = [
    {
        to: '/main/reward-management',
        title: Strings.txtRewards
    },

    {
        to: '/main/reward-management/add',
        title: Strings.txtAddNewRewards
    }
]


class RewardAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.REWARDS, Constants.PAGE_PERMISSION.CREATE);
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewRewards}</div>
            </div>
            <div className="form-content-container">
                {
                    permissionCreate &&
                    <RewardForm history={this.props.history} isEdit={false}/>
                }    
            </div>

        </div>
    }
}

export default RewardAddPage