import React, { Component } from 'react';
import { CBreadcrumbs, CButton } from '../../../components/atoms'

import { Strings, Constants } from '../../../constants';

import BroadcastForm from '../components/BroadcastForm';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const detail = {
    id: 1
}

class BroadcastDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/broadcast-management',
                title: Strings.txtBroadcast
            },
            {
                to: `/main/broadcast-management/detail/${id}`,
                title: Strings.txtBroadcastDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { id } = this.props.match.params; 
        const permissionRead = checkPermissionAllowed(Constants.PAGE.BROADCAST, Constants.PAGE_PERMISSION.READ);
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtBroadcastDetail}</div>
                <div className="buttons">
                </div>
            </div>
            <div className="form-content-container">
                {
                    permissionRead &&
                    <BroadcastForm  history={this.props.history} isEdit={true}  broadcastID={id}/>
                }
                
            </div>
          
        </div>
    }
}

export default BroadcastDetailPage