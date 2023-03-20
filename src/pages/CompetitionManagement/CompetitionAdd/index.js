import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../components/atoms'


import { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";


import { Strings, Constants } from '../../../constants';
import { inject, observer } from "mobx-react";
import './style.scss'

import CompetitionForm from '../components/CompetitionForm';
import TeamList from '../components/TeamList';
import AssignTeam from '../components/AssignTeam';
import MiniChallenge from '../components/MiniChallenge';
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
class CompetitionAddPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            activeKey: "1"
        };
    }

    getBreadCrumbs = () => {
        return [
            {
                to: '/main/competition-management',
                title: Strings.txtCompetition
            },
            {
                to: `/main/competition-management/add`,
                title: Strings.txtAddNewCompetition
            },
        ]
    }

    onSelectTab = (index) => {

    }

    onNextTab = (key) => {
        this.setState({activeKey: key});
        this.props.competitionStore.updateAvailableStep(Number(key));
    }

    checkTabAvailable = (index) => {
        const { availableAddCompetitionStep } = this.props.competitionStore;
        return index > availableAddCompetitionStep;
    }
    render() {
        const { id } = this.props.match.params; 
        const { teamConfigration } = this.props.competitionStore;
        return <div className="cw-competition-detail-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs()}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewCompetition}</div>
            </div>
            <div className="content-container">
            <CTabs defaultActiveKey="1" 
                activeKey={this.state.activeKey}
                onChange={(key)=>{ this.setState({activeKey: key})}} 
                renderTabBar={() => <ScrollableInkTabBar />} 
                renderTabContent={() => <TabContent />}>
                
                <TabPane tab={"1. "+Strings.txtCompetitionDetail}  key="1" >
                    <CompetitionForm history={this.props.history} onNext={()=>{
                        this.onNextTab("2")}} isEdit={this.props.competitionStore.competitionID && true} competitionID={this.props.competitionStore.competitionID}/>
                </TabPane>
             
                <TabPane tab={"2. "+Strings.txtTeam} key="2" disabled={this.checkTabAvailable(2)}>
                    <TeamList history={this.props.history} onNext={()=>{
                        this.onNextTab(teamConfigration == Constants.teamConfigration.MANUALLY ? "3" : "4")}} isEdit={false} 
                        />
                </TabPane>
                {
                    teamConfigration == Constants.teamConfigration.MANUALLY &&
                    <TabPane tab={"3. " +Strings.txtAssignTeam} key="3" disabled={this.checkTabAvailable(3)} >
                        <AssignTeam history={this.props.history} onNext={()=>{
                            this.onNextTab("4")}} isEdit={false} 
                        />
                    </TabPane>
                }
                <TabPane tab={(teamConfigration == Constants.teamConfigration.MANUALLY ? "4. " : "3. ")+Strings.txtMiniChallenge} key="4" disabled={this.checkTabAvailable(4)}>
                    <MiniChallenge history={this.props.history}  />
                </TabPane>
            </CTabs>
            </div>
          
        </div>
    }
}

export default inject('competitionStore')(observer(CompetitionAddPage));
