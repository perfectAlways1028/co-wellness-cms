import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../components/atoms'

import { Strings, Constants } from '../../constants';
import { inject, observer } from "mobx-react";
import { getRole } from '@helpers/storageHelper';

import ChallengeTemplateList from './components/ChallengeTemplateList';
const breadcrumbs = [
    {
        to: '/main/challenge-template-management',
        title: Strings.txtMasterData
    },
    {
        to: '/main/challenge-template-management',
        title: Strings.txtChallengeTemplate
    }
]
class ChallengeTemplateManagementPage extends Component {

    constructor(props) {
      super(props);
      const role = getRole();
      this.state = {
          isSuperAdmin: role == 'superadmin'
      };
    }
  
    onRowClick = (rowData, index) => {
        let id = rowData.id;
        this.props.history.push(`/main/challenge-template-management/detail/${id}`);
    }

    onAddNew = () => {
        this.props.history.push('/main/challenge-template-management/add');
    }

    render () {
        let { isSuperAdmin } = this.state;
        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtChallengeTemplate}</div>
                <div className="buttons">
                    {
                        <CButton 
                            onClick={()=>{this.onAddNew()}}
                            type="secondary"
                            containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtAddNewTemplate}</CButton>
                    }
                </div>
            </div>
            <ChallengeTemplateList history={this.props.history} />
        </div>

    }
}
export default ChallengeTemplateManagementPage;