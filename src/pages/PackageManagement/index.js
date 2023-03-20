import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../components/atoms'
import { CMTable } from '../../components/molecules';
import PackageList from './components/PackageList';

import { Strings } from '../../constants';

import { inject, observer } from "mobx-react";

const breadcrumbs = [
    {
        to: '/main/package-management',
        title: Strings.txtMasterData
    },
    {
        to: '/main/package-management',
        title: Strings.txtPackage
    }
]

class PackageManagementPage extends Component {

    constructor(props) {
      super(props);

      this.state = {
          limit: 10,
          currentPage : 1,
          query: null,
          status: null,
      };
    }
    onAddNew = () => {
        this.props.history.push('/main/package-management/add');
    }
 
    render () {
        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtPackage}</div>
                <div className="buttons">
                    <CButton 
                        onClick={()=>{this.onAddNew()}}
                        type="secondary"
                        containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtAddNewPackage}</CButton>
                </div>
            </div>

            <PackageList history={this.props.history}/>
            
        </div>

    }
}

export default inject('packageStore')(observer(PackageManagementPage));
