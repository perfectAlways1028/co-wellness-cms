import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import StairForm from '../components/StairForm';
import { inject, observer } from "mobx-react";

class StairDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }
    componentDidMount() {
        const { employeeId, stairId } = this.props.match.params; 
        this.props.employeeStore.findOneEmployee(employeeId)
    }

    getBreadCrumbs = (userName, employeeId, stairId) => {
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
                to: `/main/user-management/detail/${employeeId}/my-wellness-record/stair/detail/${stairId}`,
                title: Strings.txtStairDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { employeeId, stairId } = this.props.match.params; 
        if(!this.props.employeeStore.detailEmployee) return <div/>;
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const userName = detailEmployee ? detailEmployee.user.name || "" : "";
     
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(userName, employeeId, stairId)}/>
            <div className="header">
                <div className="title">{Strings.txtStairDetail}</div>
            </div>
            <div className="form-content-container">
                <StairForm  history={this.props.history} isEdit={true} stairID={stairId}/>
            </div>
          
        </div>
    }
}


export default inject('employeeStore')(observer(StairDetailPage));
