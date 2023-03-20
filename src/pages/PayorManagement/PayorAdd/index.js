import React, { Component } from 'react';
import { CBreadcrumbs } from '../../../components/atoms'
import PayorForm from '../components/PayorForm';
import { Strings } from '../../../constants';

import './style.scss'

const breadcrumbs = [
    {
        to: '/main/payor-management',
        title: Strings.txtPayor
    },
    {
        to: '/main/payor-management',
        title: Strings.txtPayorList
    },
    {
        to: '/main/payor-management/add',
        title: Strings.txtAddNewPayor
    },
]

class PayorAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="cw-payor-add-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewPayor}</div>
            </div>
            <div className="content-container">
                <PayorForm history={this.props.history} isEdit={false}/>
            </div>

        </div>
    }
}

export default PayorAddPage