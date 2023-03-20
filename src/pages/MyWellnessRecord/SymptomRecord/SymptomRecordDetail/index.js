import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import SymptomRecordForm from '../components/SymptomRecordForm';
import { inject, observer } from "mobx-react";

class SymptomRecordDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, symptomId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, symptomId) => {
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
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/symptom/detail/${symptomId}`,
                title: Strings.txtSymptomDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, symptomId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, symptomId)}/>
            <div className="header">
                <div className="title">{Strings.txtSymptomDetail}</div>
            </div>
            <div className="form-content-container">
                <SymptomRecordForm  history={this.props.history} isEdit={true} symptomRecordID={symptomId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(SymptomRecordDetailPage));
