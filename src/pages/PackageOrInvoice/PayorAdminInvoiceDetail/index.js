import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../components/atoms'

import { Strings } from '../../../constants';

import PackageInvoiceForm from '../../PackageInvoiceManagement/components/PackageInvoiceForm';




class PayorAdminInvoiceDetailPage extends Component {
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
                to: `/main/package-invoice-tab/invoice/detail/${id}`,
                title: Strings.txtPackageInvoiceDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { id } = this.props.match.params; 
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtPackageInvoiceDetail}</div>
            </div>
            <div className="form-content-container">
                <PackageInvoiceForm  history={this.props.history} isEdit={true} packageInvoiceID={id}/>
            </div>
          
        </div>
    }
}

export default PayorAdminInvoiceDetailPage