import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import PrescriptionForm from '../components/PrescriptionForm';
import { inject, observer } from "mobx-react";

class PrescriptionDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, prescriptionId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, prescriptionId) => {
        return [
            {
                to: '/main/user-management',
                title: Strings.txtUserManagement
            },
            {
                to: `/main/user-management/detail/${employeeId}`,
                title: userName
            },
            {
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/prescription/detail/${prescriptionId}`,
                title: Strings.txtPrescriptionDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, prescriptionId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, prescriptionId)}/>
            <div className="header">
                <div className="title">{Strings.txtPrescriptionDetail}</div>
            </div>
            <div className="form-content-container">
                <PrescriptionForm  history={this.props.history} isEdit={true} prescriptionID={prescriptionId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(PrescriptionDetailPage));
