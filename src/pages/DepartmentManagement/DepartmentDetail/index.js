import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../components/atoms'

import { Strings } from '../../../constants';

import DepartmentForm from '../components/DepartmentForm';

import './style.scss'

class DepartmentDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/department-management',
                title: Strings.txtDepartment
            },
            {
                to: `/main/department-management/detail/${id}`,
                title: Strings.txtDepartmentDetail
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
                <div className="title">{Strings.txtDepartmentDetail}</div>
            </div>
            <div className="form-content-container">
                <DepartmentForm  history={this.props.history} isEdit={true} departmentID={id}/>
            </div>
          
        </div>
    }
}

export default DepartmentDetailPage