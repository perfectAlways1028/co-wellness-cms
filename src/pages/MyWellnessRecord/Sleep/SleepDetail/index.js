import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import SleepForm from '../components/SleepForm';
import { inject, observer } from "mobx-react";

class SleepDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, sleepId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, sleepId) => {
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
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/sleep/detail/${sleepId}`,
                title: Strings.txtSleepDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, sleepId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, sleepId)}/>
            <div className="header">
                <div className="title">{Strings.txtSleepDetail}</div>
            </div>
            <div className="form-content-container">
                <SleepForm  history={this.props.history} isEdit={true} sleepID={sleepId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(SleepDetailPage));
