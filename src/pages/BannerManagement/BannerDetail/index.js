import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../components/atoms'

import { Strings, Constants } from '../../../constants';

import BannerForm from '../components/BannerForm';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

import './style.scss'

class BannerDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/banner-management',
                title: Strings.txtPayor
            },
            {
                to: '/main/banner-management',
                title: Strings.txtBanner
            },
            {
                to: `/main/banner-management/detail/${id}`,
                title: Strings.txtBannerDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {
        const permissionRead = checkPermissionAllowed(Constants.PAGE.BANNER, Constants.PAGE_PERMISSION.READ);
        
        const { id } = this.props.match.params; 
        return <div className="cw-employee-detail-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtBannerDetail}</div>
            </div>
            <div className="content-container">
                {
                    permissionRead &&
                    <BannerForm  history={this.props.history} isEdit={true} bannerID={id}/>
                }
            </div>
          
        </div>
    }
}

export default BannerDetailPage