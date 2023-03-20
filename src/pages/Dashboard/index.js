import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CDatePicker } from '../../components/atoms'
import { CMTable } from '../../components/molecules';
import CardBoard from './components/CardBoard';
import { Row, Col, Container } from 'react-bootstrap';
import CardBoardList from './components/CardBoardList'
import CardBoardExpandableList from './components/CardBoardExtendableList'
import HealthCharts from './components/HealthCharts'
import { Strings, Constants } from '../../constants';
import { checkPermissionAllowed } from '@helpers/permissionHelper';
import { getRole } from '@helpers/storageHelper';

import { constructMCUInfo } from './helper'
import { inject, observer } from "mobx-react";
import './style/style.scss'

const breadcrumbs = [
  {
    to: '/main/dashboard',
    title: Strings.txtDashboard
  }
]

class DashboardPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      mcuInfo: null,
      isLeftOpen: false,
      isRightOpen: false,
      isHeadDailyOpen: false,
      isHeadWeeklyOpen: false,
      isHeadMonthlyOpen: false,

      startDate: null,
      endDate: null
    };
  }

  componentDidMount() {
    this.onLoad();


  }
  onLoad = () => {
    this.onApplyFilter();
    this.props.dashboardStore.findMCUInfo()
      .then(data => {
        let mcuInfo = constructMCUInfo(data);
        this.setState({ mcuInfo: mcuInfo });
      })
  }
  onApplyFilter = () => {
    let filter = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    }

    this.props.dashboardStore.findDashboardInfo(filter)
      .then(result => {

      })
  }
  onClear = () => {
    this.setState({
      startDate: null,
      endDate: null,
    })
  }

  render() {
    const permissionRead = checkPermissionAllowed(Constants.PAGE.DASHBOARD, Constants.PAGE_PERMISSION.READ);
    const role = getRole()
    const isSuperAdmin = role == 'superadmin';
    const {
      userInfo,
      coinInfo,
      ongoingChallenges,
      competitionInfo,
      challengeInfo,
      notSyncedData,
      syncedData,
      averageSleeps,
      averageStairs,
      averageSteps,
      isLoading,
      dailyUser,
      weeklyUser,
      monthlyUser,
      dailyUserData,
      weeklyUserData,
      monthlyUserData,
    } = this.props.dashboardStore
    const { mcuInfo } = this.state;
    return <div className="cw-dashboard-container">
      <CBreadcrumbs data={breadcrumbs} />
      <Container fluid>
        <Row>
          <Col lg={3} md={12} style={{
            paddingLeft: "30px",
            display: "flex",
            alignItems: "center",
            height: !!isSuperAdmin && "83px"
          }}>
            <div className="title-dashboard">{Strings.txtDashboard}</div>
          </Col>
          {!isSuperAdmin &&
            <Col lg={9} md={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {/* <Col lg={5} md={5} sm={5} style={{ display: "flex", alignItems: "center" }}> */}
              <CDatePicker
                label={Strings.txtFieldStartDate}
                selected={this.state.startDate}
                placeholderText={Strings.txtFieldStartDate}
                containerStyle={{ paddingLeft: "20px" }}
                onChange={(value) => { this.setState({ startDate: value }) }} />
              {/* </Col>
            <Col lg={5} md={5} sm={5} style={{ display: "flex", alignItems: "center" }}> */}
              <CDatePicker
                label={Strings.txtFieldEndDate}
                selected={this.state.endDate}
                placeholderText={Strings.txtFieldEndDate}
                containerStyle={{ paddingLeft: "30px", paddingRight: "30px" }}
                onChange={(value) => { this.setState({ endDate: value }) }} />
              {/* </Col>
            <Col lg={2} md={2} sm={2} style={{ display: "flex", alignItems: "center" }}> */}
              <CButton
                containerStyle={{ width: "150px" }}
                onClick={() => { this.onApplyFilter() }}
                isLoading={isLoading}
              >{Strings.txtApply}</CButton>
              {/* </Col> */}
            </Col>
          }
        </Row>
      </Container>
      {
        permissionRead &&
        <Container fluid>
          <Row>
            <Col lg={4} style={{ paddingLeft: "30px", marginBottom: "15px" }}>

              {!isSuperAdmin &&
                <CardBoardExpandableList
                  leftTitle="Daily Activity User"
                  rightTitle={dailyUser.total}
                  isHeaderExtended
                  isHeadOpen={this.state.isHeadDailyOpen}
                  leftInfoTitle={dailyUser.active}
                  expandHeadList={() => {
                    this.setState({ isHeadDailyOpen: !!this.state.isHeadDailyOpen ? false : true })
                  }}
                  leftInfoDescription="ACTIVE"
                  rightInfoTitle={dailyUser.inactive}
                  rightInfoDescription="INACTIVE"
                  data={dailyUserData}
                />
              }
              {isSuperAdmin &&
                <CardBoard
                  leftTitle={Strings.txtUser}
                  rightTitle={userInfo.total}
                  leftInfoTitle={userInfo.active}
                  leftInfoDescription={Strings.txtStatusActive}
                  rightInfoTitle={userInfo.inActive}
                  rightInfoDescription={Strings.txtStatusInActive}
                />
              }
            </Col>
            <Col lg={4} style={{ paddingLeft: "30px", marginBottom: "15px" }}>
              {!isSuperAdmin &&
                <CardBoardExpandableList
                  leftTitle="Weekly Activity User"
                  rightTitle={weeklyUser.total}
                  isHeaderExtended
                  isHeadOpen={this.state.isHeadWeeklyOpen}
                  leftInfoTitle={weeklyUser.active}
                  expandHeadList={() => {
                    this.setState({ isHeadWeeklyOpen: !!this.state.isHeadWeeklyOpen ? false : true })
                  }}
                  leftInfoDescription="ACTIVE"
                  rightInfoTitle={weeklyUser.inactive}
                  rightInfoDescription="INACTIVE"
                  data={weeklyUserData}
                  zIndex={2}
                />
              }
              {isSuperAdmin &&
                <CardBoard
                  leftTitle={Strings.txtCoins}
                  rightTitle={coinInfo.total}
                  leftInfoTitle={coinInfo.issued}
                  leftInfoDescription={Strings.txtStatusIssued}
                  rightInfoTitle={coinInfo.redeemed}
                  rightInfoDescription={Strings.txtStatusRedeemed}
                />
              }
            </Col>
            <Col lg={4} style={{ paddingLeft: "30px", marginBottom: "15px" }}>
              {!isSuperAdmin &&
                <CardBoardExpandableList
                  leftTitle="Monthly Activity User"
                  rightTitle={monthlyUser.total}
                  isHeaderExtended
                  isHeadOpen={this.state.isHeadMonthlyOpen}
                  leftInfoTitle={monthlyUser.active}
                  expandHeadList={() => {
                    this.setState({ isHeadMonthlyOpen: !!this.state.isHeadMonthlyOpen ? false : true })
                  }}
                  leftInfoDescription="ACTIVE"
                  rightInfoTitle={monthlyUser.inactive}
                  rightInfoDescription="INACTIVE"
                  data={monthlyUserData}
                />
              }

              {isSuperAdmin &&
                <CardBoardList
                  leftTitle={Strings.txtOngoingChallenge}
                  rightTitle={ongoingChallenges.length}
                  data={ongoingChallenges}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col lg={4} style={{ paddingLeft: "30px", marginBottom: "15px" }} >
              {/* Payor Admin */}
              {!isSuperAdmin &&
                <CardBoard
                  leftTitle="Average Steps"
                  leftInfoTopDescription="THIS WEEK"
                  leftInfoTitle={averageSteps.lastWeek === null ? 0 : averageSteps.lastWeek}
                  leftInfoDescription="STEPS"
                  rightInfoTopDescription="YESTERDAY"
                  rightInfoTitle={averageSteps.yesterday === null ? 0 : averageSteps.yesterday}
                  rightInfoDescription="STEPS"
                  topDescriptionStyle={{ margin: "unset" }}
                  btmDescriptionStyle={{ margin: "unset" }}
                  infoStyle={{ margin: "5px 0 5px 0" }}
                />
              }
              {isSuperAdmin &&
                <CardBoard
                  leftTitle={Strings.txtNormalChallenges}
                  rightTitle={challengeInfo.total}
                  leftInfoTitle={challengeInfo.joining}
                  leftInfoDescription={Strings.txtJoining}
                  rightInfoTitle={challengeInfo.nonJoining}
                  rightInfoDescription={Strings.txtNonJoining}
                />
              }
            </Col>
            <Col lg={4} style={{ paddingLeft: "30px", marginBottom: "15px" }} >
              {!isSuperAdmin &&
                <CardBoard
                  leftTitle="Average Stairs"
                  leftInfoTopDescription="THIS WEEK"
                  leftInfoTitle={averageStairs.lastWeek === null ? 0 : averageStairs.lastWeek}
                  leftInfoDescription="FLOORS"
                  rightInfoTopDescription="YESTERDAY"
                  rightInfoTitle={averageStairs.yesterday === null ? 0 : averageStairs.yesterday}
                  rightInfoDescription="FLOORS"
                  topDescriptionStyle={{ margin: "unset" }}
                  btmDescriptionStyle={{ margin: "unset" }}
                  infoStyle={{ margin: "5px 0 5px 0" }}
                />
              }
              {isSuperAdmin &&
                <CardBoard
                  leftTitle={Strings.txtCompetition}
                  rightTitle={competitionInfo.total}
                  leftInfoTitle={competitionInfo.withDiamond}
                  leftInfoDescription={Strings.txtWithDiamond}
                  rightInfoTitle={competitionInfo.withoutDiamond}
                  rightInfoDescription={Strings.txtWithoutDiamond}
                />
              }
            </Col>
            <Col lg={4} style={{ paddingLeft: "30px", marginBottom: "15px" }} >
              {!isSuperAdmin &&
                <CardBoard
                  leftTitle="Average Sleeps"
                  leftInfoTopDescription="THIS WEEK"
                  leftInfoTitle={averageSleeps.lastWeek === null ? 0 : averageSleeps.lastWeek}
                  leftInfoDescription="HOURS"
                  rightInfoTopDescription="YESTERDAY"
                  rightInfoTitle={averageSleeps.yesterday === null ? 0 : averageSleeps.yesterday}
                  rightInfoDescription="HOURS"
                  topDescriptionStyle={{ margin: "unset" }}
                  btmDescriptionStyle={{ margin: "unset" }}
                  infoStyle={{ margin: "5px 0 5px 0" }}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col lg={4} style={{ paddingLeft: "30px", marginBottom: "15px" }}>
              {!isSuperAdmin &&
                <CardBoard
                  leftTitle={Strings.txtCoins}
                  rightTitle={coinInfo.total}
                  leftInfoTitle={coinInfo.issued}
                  leftInfoDescription={Strings.txtStatusIssued}
                  rightInfoTitle={coinInfo.redeemed}
                  rightInfoDescription={Strings.txtStatusRedeemed}
                />
              }
            </Col>
            <Col lg={4} style={{ paddingLeft: "30px", marginBottom: "15px" }} >
              {!isSuperAdmin &&
                <CardBoardExpandableList
                  leftTitle="Today's Sync"
                  leftInfoTitle={syncedData.length}
                  leftInfoDescription="SYNC"
                  rightInfoTitle={notSyncedData.length}
                  rightInfoDescription="NOT SYNC"
                  isContentExtended
                  isLeftOpen={this.state.isLeftOpen}
                  isRightOpen={this.state.isRightOpen}
                  expandLeftList={() => {
                    if (!this.state.isRightOpen)
                      this.setState({ isLeftOpen: !!this.state.isLeftOpen ? false : true })
                    else
                      this.setState({
                        isLeftOpen: !!this.state.isLeftOpen ? false : true,
                        isRightOpen: false
                      })
                  }}
                  expandRightList={() => {
                    if (!this.state.isLeftOpen)
                      this.setState({ isRightOpen: !!this.state.isRightOpen ? false : true })
                    else
                      this.setState({
                        isRightOpen: !!this.state.isRightOpen ? false : true,
                        isLeftOpen: false
                      })

                  }}
                  data={!!this.state.isRightOpen ? notSyncedData : syncedData}
                />
              }
            </Col>
            <Col lg={4} style={{ paddingLeft: "30px", marginBottom: "15px" }} >
              {!isSuperAdmin &&
                <CardBoardList
                  leftTitle={Strings.txtOngoingChallenge}
                  rightTitle={ongoingChallenges.length}
                  data={ongoingChallenges}
                />
              }
            </Col>
          </Row>
        </Container>

        // {
        //     mcuInfo &&
        //     <HealthCharts containerStyle={{ marginTop: '30px', flex: 1 }} mcuInfo={mcuInfo} />
        // }
      }
    </div >
  }
}

export default inject('dashboardStore')(observer(DashboardPage));
