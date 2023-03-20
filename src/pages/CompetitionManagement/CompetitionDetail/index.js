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
import LeaderBoard from '../components/LeaderBoard';
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
class CompetitionDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            activeKey: "1"
        };
    }


    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/competition-management',
                title: Strings.txtCompetition
            },

            {
                to: `/main/competition-management/detail/${id}`,
                title: Strings.txtCompetitionDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    onNextTab = (key) => {
        this.setState({activeKey: key});
    }

    render() {
        const { id } = this.props.match.params; 
        const { teamConfigration } = this.props.competitionStore;
        return <div className="cw-competition-detail-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtCompetitionDetail}</div>
            </div>
            <div className="content-container">
            <CTabs defaultActiveKey="1" 
                activeKey={this.state.activeKey}
                onChange={(key)=>{ this.setState({activeKey: key})}} 
                renderTabBar={() => <ScrollableInkTabBar />} 
                renderTabContent={() => <TabContent />}>
                
                <TabPane tab={"1. "+Strings.txtCompetitionDetail}  key="1" >
                    <CompetitionForm history={this.props.history} onNext={()=>{
                        this.onNextTab("2")}} isEdit={true} competitionID={id}/>
                </TabPane>
             
                <TabPane tab={"2. "+Strings.txtTeam} key="2">
                    <TeamList history={this.props.history} onNext={()=>{
                        this.onNextTab("3")}} isEdit={true} 
                        />
                </TabPane>
                <TabPane tab={ "3. "+Strings.txtMiniChallenge} key="3" >
                    <MiniChallenge history={this.props.history} isEdit={true} onNext={()=>{
                        this.onNextTab("4")
                    }}/>
                </TabPane>
                <TabPane tab={ "4. "+Strings.txtLeaderboard} key="4" >
                    <LeaderBoard history={this.props.history}/>
                </TabPane>
            </CTabs>
            </div>
          
        </div>
    }
}

export default inject('competitionStore')(observer(CompetitionDetailPage));
