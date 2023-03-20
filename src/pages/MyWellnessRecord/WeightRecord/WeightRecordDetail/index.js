import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import WeightRecordForm from '../components/WeightRecordForm';
import { inject, observer } from "mobx-react";

class WeightRecordDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, weightRecordId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, weightRecordId) => {
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
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/weight/detail/${weightRecordId}`,
                title: Strings.txtWeightRecordDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, weightRecordId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, weightRecordId)}/>
            <div className="header">
                <div className="title">{Strings.txtWeightRecordDetail}</div>
            </div>
            <div className="form-content-container">
                <WeightRecordForm  history={this.props.history} isEdit={true} weightRecordID={weightRecordId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(WeightRecordDetailPage));
