import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../components/atoms'
import BroadcastForm from '../components/BroadcastForm';
import { Strings, Constants } from '../../../constants';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const breadcrumbs = [
    {
        to: '/main/broadcast-management',
        title: Strings.txtBroadcast
    },

    {
        to: '/main/broadcast-management/add',
        title: Strings.txtAddNewBroadcast
    }
]


class BroadcastAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.BROADCAST, Constants.PAGE_PERMISSION.CREATE);
        
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewBroadcast}</div>
            </div>
            <div className="form-content-container">
                {
                    permissionCreate &&
                    <BroadcastForm history={this.props.history} isEdit={false}/>
                }
            </div>

        </div>
    }
}

export default BroadcastAddPage