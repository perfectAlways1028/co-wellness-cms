import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../components/atoms'
import { CMTable } from '../../components/molecules';
import { Strings, Constants } from '../../constants';
import BroadcastList from './components/BroadcastList';

import { checkPermissionAllowed } from '@helpers/permissionHelper';

const breadcrumbs = [
    {
        to: '/main/broadcast-management',
        title: Strings.txtBroadcast
    }
]
class BoradcastManagementPage extends Component {

    constructor(props) {
      super(props);

      this.state = {
      };
    }
    
    onAddNew = () => {
        this.props.history.push('/main/broadcast-management/add');
    }

    render () {
        const permissionRead = checkPermissionAllowed(Constants.PAGE.BROADCAST, Constants.PAGE_PERMISSION.READ);
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.BROADCAST, Constants.PAGE_PERMISSION.CREATE);
       
        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtBroadcast}</div>
                <div className="buttons">
                    {
                        permissionCreate &&
                        <CButton 
                            onClick={()=>{this.onAddNew()}}
                            type="secondary"
                            containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtBtnAddNewBroadcast}</CButton>
                    }
                  
                </div>
            </div>
            {
                permissionRead &&
                <BroadcastList history={this.props.history}/>
            }
          
        </div>

    }
}

export default BoradcastManagementPage