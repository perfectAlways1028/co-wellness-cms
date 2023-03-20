import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import StepForm from '../components/StepForm';
import { inject, observer } from "mobx-react";

class StepDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, stepId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, stepId) => {
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
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/step/detail/${stepId}`,
                title: Strings.txtStepDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, stepId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, stepId)}/>
            <div className="header">
                <div className="title">{Strings.txtStepDetail}</div>
            </div>
            <div className="form-content-container">
                <StepForm  history={this.props.history} isEdit={true} stepID={stepId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(StepDetailPage));
