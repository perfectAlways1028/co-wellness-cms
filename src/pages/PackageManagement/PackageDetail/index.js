import React, { Component } from 'react';
import { CBreadcrumbs, CButton } from '../../../components/atoms'

import { Strings } from '../../../constants';

import PackageForm from '../components/PackageForm';

class PackageDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/package-management',
                title: Strings.txtMasterData
            },
            {
                to: '/main/package-management',
                title: Strings.txtPayorList
            },
            {
                to: `/main/package-management/detail/${id}`,
                title: Strings.txtPackageDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    onSetPackageAccessibility = () => {
        const { id } = this.props.match.params; 
        this.props.history.push(`/main/package-management/detail/${id}/set-admin-access`)
    }

    render() {

        const { id } = this.props.match.params; 
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtPackageDetail}</div>
                <div className="buttons">
                    <CButton 
                        onClick={()=>{this.onSetPackageAccessibility()}}
                        type="secondary"
                        containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtBtnSetAdminAccess}</CButton>
                </div>
            </div>
            <div className="form-content-container">
                <PackageForm  history={this.props.history} isEdit={true} packageID={id}/>
            </div>
          
        </div>
    }
}

export default PackageDetailPage