import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../components/atoms'
import PackageForm from '../components/PackageForm';
import { Strings } from '../../../constants';

const breadcrumbs = [
    {
        to: '/main/package-management',
        title: Strings.txtMasterData
    },
    {
        to: '/main/package-management',
        title: Strings.txtPackage
    },
    {
        to: '/main/package-management/add',
        title: Strings.txtAddNewPackage
    }
]


class PackageAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewPackage}</div>
            </div>
            <div className="form-content-container">
                <PackageForm history={this.props.history} isEdit={false}/>
            </div>

        </div>
    }
}

export default PackageAddPage