import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../components/atoms'


import { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";


import { Strings } from '../../../constants';
import { inject, observer } from "mobx-react";
import EmployeeForm from '../components/EmployeeForm';
import EmployeeWellnessRecord from '../components/EmployeeWellnessRecord';

import './style.scss'

const employee = {
    id: 1,
    name: 'Ernest Murphy'
}

const tabs = [
    {
        id: 1,
        name: Strings.txtUserInfo,
    },
    {
        id: 2,
        name: Strings.txtMyWellness,
    },
]

const selectSection = [
    {
        id: 1,
        name: Strings.txtProfile
    },
    {
        id: 2,
        name: Strings.txtHealthQuiz
    },
]
class EmployeeDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (userName, id) => {
        return [
            {
                to: '/main/user-management',
                title: Strings.txtUserManagement
            },
            {
                to: `/main/user-management/detail/${id}`,
                title: userName
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {
        const { id } = this.props.match.params; 
        const detailEmployee = this.props.employeeStore.detailEmployee;
        const name = detailEmployee ? detailEmployee.user.name || "" : "";
        return <div className="cw-employee-detail-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(name, id)}/>
            <div className="header">
                <div className="title">{name}</div>
            </div>
            <div className="content-container">
            <CTabs defaultActiveKey="1" 
                onChange={(e)=>{}} 
                renderTabBar={() => <ScrollableInkTabBar />} 
                renderTabContent={() => <TabContent />}>
                
                <TabPane tab={Strings.txtUserInfo}  key="1">
                    <div className="cw-column" style={{flex: 1}}>
                        <CSelectInput  containerStyle={{width: '248px', marginTop: '30px'}} 
                                        data={selectSection} 
                                        defaultValue={1}
                                        selectedID={this.state.section}
                                        onItemSelected={(item)=>{this.setState({section: item.id})}} />
                        <EmployeeForm  history={this.props.history} isEdit={true} employeeID={id}/>
                    </div>
                   
                </TabPane>
                <TabPane tab={Strings.txtMyWellness} key="2">
                    <EmployeeWellnessRecord history={this.props.history} employeeID={id}/>
                </TabPane>
            </CTabs>
            </div>
          
        </div>
    }
}

export default inject('employeeStore')(observer(EmployeeDetailPage));
