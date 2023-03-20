import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import DietRecordForm from '../components/DietRecordForm';
import { inject, observer } from "mobx-react";

class DietRecordDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, dietRecordId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, dietRecordId) => {
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
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/diet/detail/${dietRecordId}`,
                title: Strings.txtDietRecordDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, dietRecordId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, dietRecordId)}/>
            <div className="header">
                <div className="title">{Strings.txtDietRecordDetail}</div>
            </div>
            <div className="form-content-container">
                <DietRecordForm  history={this.props.history} isEdit={true} employeeID={employeeId} dietRecordID={dietRecordId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(DietRecordDetailPage));
