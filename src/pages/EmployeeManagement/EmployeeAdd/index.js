import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../components/atoms'
import EmployeeForm from '../components/EmployeeForm';
import { Strings } from '../../../constants';

import './style.scss'

const breadcrumbs = [
    {
        to: '/main/user-management',
        title: Strings.txtUserManagement
    },
    {
        to: '/main/user-management/add',
        title: Strings.txtCreateNewUser
    },
]

class EmployeeAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="cw-employee-add-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtCreateNewUser}</div>
            </div>
            <div className="content-container">
                <EmployeeForm history={this.props.history} isEdit={false}/>
            </div>

        </div>
    }
}

export default EmployeeAddPage