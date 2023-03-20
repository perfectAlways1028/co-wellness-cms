import React, { Component } from 'react';
import { CBreadcrumbs, CButton } from '../../../components/atoms'

import { Strings } from '../../../constants';

import PackageForm from '../../PackageManagement/components/PackageForm';

class PayorAdminPackageDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/package-invoice-tab',
                title: Strings.txtPackageAndInvoice
            },
            {
                to: `/main/package-invoice-tab/package/detail/${id}`,
                title: Strings.txtPackageDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    onSeePackageAccessibility = () => {
        const { id } = this.props.match.params; 
        this.props.history.push(`/main/package-invoice-tab/package/detail/${id}/see-admin-access`)
    }

    render() {

        const { id } = this.props.match.params; 
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtPackageDetail}</div>
                <div className="buttons">
                    <CButton 
                        onClick={()=>{this.onSeePackageAccessibility()}}
                        type="secondary"
                        containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtBtnSeeAdminAccess}</CButton>
                </div>
            </div>
            <div className="form-content-container">
                <PackageForm history={this.props.history} isEdit={true} isViewOnly={true} packageID={id}/>
            </div>
          
        </div>
    }
}

export default PayorAdminPackageDetailPage