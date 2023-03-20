import React, { Component } from 'react';
import { CBreadcrumbs } from '../../../components/atoms'
import DepartmentForm from '../components/DepartmentForm';
import { Strings } from '../../../constants';

import './style.scss'

const breadcrumbs = [
    {
        to: '/main/department-management',
        title: Strings.txtDepartment
    },
    {
        to: '/main/department-management/add',
        title: Strings.txtAddNewDepartment
    },
]

class DepartmentAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewDepartment}</div>
            </div>
            <div className="form-content-container">
                <DepartmentForm history={this.props.history} isEdit={false}/>
            </div>

        </div>
    }
}

export default DepartmentAddPage