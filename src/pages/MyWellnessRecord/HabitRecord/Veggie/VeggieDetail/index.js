import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../../components/atoms'

import { Strings } from '../../../../../constants';

import VeggieForm from '../VeggieForm';
import { inject, observer } from "mobx-react";

class VeggieDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, habitRecordId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, habitRecordId) => {
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
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/veggie/detail/${habitRecordId}`,
                title: Strings.txtVeggieDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, habitRecordId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, habitRecordId)}/>
            <div className="header">
                <div className="title">{Strings.txtVeggieDetail}</div>
            </div>
            <div className="form-content-container">
                <VeggieForm  history={this.props.history} isEdit={true} habitRecordID={habitRecordId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(VeggieDetailPage));
