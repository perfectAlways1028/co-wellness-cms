import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../../components/atoms'

import { Strings, Constants } from '../../../constants';
import { inject, observer } from "mobx-react";
import { getRole } from '@helpers/storageHelper';

import ChallengeTemplateList from '../components/ChallengeTemplateList';
const breadcrumbs = [
    {
        to: '/main/challenge-management',
        title: Strings.txtChallenge
    },
    {
        to: '/main/challenge-template-use',
        title: Strings.txtChallengeTemplate
    }
]
class ChallengeTemplateListUsePage extends Component {

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

    render () {
        let { isSuperAdmin } = this.state;
        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtChallengeTemplate}</div>
           
            </div>
            <ChallengeTemplateList history={this.props.history} isUse={true}/>
        </div>

    }
}
export default ChallengeTemplateListUsePage;