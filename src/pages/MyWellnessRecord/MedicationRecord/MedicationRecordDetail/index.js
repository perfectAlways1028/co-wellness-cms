import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import MedicationRecordForm from '../components/MedicationRecordForm';
import { inject, observer } from "mobx-react";

class MedicationRecordDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, medicationRecordId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, medicationRecordId) => {
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
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/medicationRecord/detail/${medicationRecordId}`,
                title: Strings.txtMedicationRecordDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, medicationRecordId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, medicationRecordId)}/>
            <div className="header">
                <div className="title">{Strings.txtMedicationRecordDetail}</div>
            </div>
            <div className="form-content-container">
                <MedicationRecordForm  history={this.props.history} isEdit={true} medicationRecordID={medicationRecordId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(MedicationRecordDetailPage));
