import React, { Component } from 'react';
import { CBreadcrumbs } from '../../../components/atoms'
import BannerForm from '../components/BannerForm';
import { Strings, Constants } from '../../../constants';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

import './style.scss'

const breadcrumbs = [
    {
        to: '/main/banner-management',
        title: Strings.txtPayor
    },
    {
        to: '/main/banner-management',
        title: Strings.txtBanner
    },
    {
        to: '/main/banner-management/add',
        title: Strings.txtAddNewBanner
    },
]

class BannerAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.BANNER, Constants.PAGE_PERMISSION.CREATE);
       
        return <div className="cw-payor-add-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtBanner}</div>
            </div>
            <div className="content-container">
            {
                permissionCreate &&
                <BannerForm history={this.props.history} isEdit={false}/>
            }
            </div>

        </div>
    }
}

export default BannerAddPage