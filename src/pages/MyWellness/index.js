import React, { Component } from 'react';
import { CBreadcrumbs, CTabs } from '../../components/atoms'


import { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

import HealthRisk from './HealthRisk';
import Symptom from './Symptom';
import Medicine from './Medicine';
import Meal from './Meal';
import Exercise from './Exercise';
import { Strings } from '../../constants';

import './style/style.scss'

const breadcrumbs = [
    {
        to: '/main/my-wellness',
        title: Strings.txtMasterData
    },
    {
        to: '/main/my-wellness',
        title: Strings.txtMyWellness
    }
]



class MyWellness extends Component {

    constructor(props) {
      super(props);

      this.state = {
          currentPage : 1
      };
    }

    onApplyFilter = () => {

    }
    onClear = () => {

    }

    onChangePage = (page) => {
        console.log("onChangePage", page);
        this.setState({currentPage: page})
    }
    render () {
        return <div className="cw-my-wellness-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtMyWellness}</div>
            </div>
            <div className="content-container">
            <CTabs defaultActiveKey="1" 
                onChange={(e)=>{}} 
                renderTabBar={() => <ScrollableInkTabBar />} 
                renderTabContent={() => <TabContent />}>
                
                <TabPane tab={Strings.txtHealthRisk}  key="1">
           
                    <HealthRisk history={this.props.history}/>
                   
                </TabPane>
                <TabPane tab={Strings.txtConditionList} key="2">
                  
                </TabPane>
                <TabPane tab={Strings.txtSymptomList} key="3">
                    <Symptom history={this.props.history}/>
                </TabPane>
                <TabPane tab={Strings.txtMedicineList} key="4">
                    <Medicine history={this.props.history}/>
                </TabPane>
                <TabPane tab={Strings.txtFoodList} key="5">
                    <Meal history={this.props.history}/>
                </TabPane>
                <TabPane tab={Strings.txtExerciseList} key="6">
                    <Exercise history={this.props.history}/>
                </TabPane>
            </CTabs>
            </div>
        </div>

    }
}

export default MyWellness