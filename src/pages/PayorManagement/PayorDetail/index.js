import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../components/atoms'

import { Strings } from '../../../constants';

import PayorForm from '../components/PayorForm';

import './style.scss'



class PayorDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/payor-management',
                title: Strings.txtPayor
            },
            {
                to: '/main/payor-management',
                title: Strings.txtPayorList
            },
            {
                to: `/main/payor-management/detail/${id}`,
                title: Strings.txtPayorDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { id } = this.props.match.params; 
        return <div className="cw-employee-detail-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtPayorDetail}</div>
            </div>
            <div className="content-container">
                <PayorForm  history={this.props.history} isEdit={true} payorID={id}/>
            </div>
          
        </div>
    }
}

export default PayorDetailPage