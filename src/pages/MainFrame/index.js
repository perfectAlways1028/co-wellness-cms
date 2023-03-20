import React, { Component } from 'react';
import './style/MainFrame.scss'
import { inject, observer } from "mobx-react";
import Header from './components/Header'
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { CMSideMenu } from '../../components/molecules';
import { Strings } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRole } from '@helpers/storageHelper';

import {
  EmployeeManagementPage,
  EmployeeDetailPage,
  EmployeeAddPage,
  PayorManagementPage,
  PayorAddPage,
  PayorDetailPage,
  BannerManagementPage,
  BannerAddPage,
  BannerDetailPage,
  MyWellnessPage,
  SymptomAddPage,
  SymptomDetailPage,
  SymptomRecordDetailPage,
  WeightRecordDetailPage,
  DietRecordDetailPage,
  ExerciseRecordDetailPage,
  WaterDetailPage,
  VeggieDetailPage,
  FruitDetailPage,
  StepDetailPage,
  StairDetailPage,
  SleepDetailPage,
  BloodGlucoseRecordDetailPage,
  MedicineAddPage,
  MedicineDetailPage,
  PrescriptionDetailPage,
  MedicationRecordDetailPage,
  MealAddPage,
  MealDetailPage,
  ExerciseAddPage,
  ExerciseDetailPage,
  HealthRiskAddPage,
  HealthRiskDetailPage,
  PackageManagementPage,
  PackageAddPage,
  PackageDetailPage,
  CreateOrderPage,
  AdminAccessManagement,
  ChallengeManagementPage,
  ChallengeAddPage,
  ChallengeDetailPage,
  ChallengeTemplateManagementPage,
  ChallengeTemplateAddPage,
  ChallengeTemplateDetailPage,
  ChallengeTemplateDetailUsePage,
  ChallengeTemplateListUsePage,
  CompetitionManagementPage,
  CompetitionAddPage,
  CompetitionDetailPage,
  DashboardPage,
  RewardManagementPage,
  RewardDetailPage,
  RewardAddPage,
  RewardTypeAddPage,
  RewardTypeDetailPage,
  RewardTypeManagementPage,
  PointHistoryDetailPage,
  PointHistoryManagementPage,
  PackageInvoiceManagementPage,
  PackageInvoiceDetailPage,
  PackageInvoiceAddPage,
  //PayorAdminInvoiceDetailPage,
  //PackageInvoiceTabPage,
  //PayorAdminPackageDetailPage,
  BroadcastManagementPage,
  BroadcastAddPage,
  BroadcastDetailPage,
  JobLevelAddPage,
  JobLevelManagementPage,
  JobLevelDetailPage,
  DepartmentAddPage,
  DepartmentManagementPage,
  DepartmentDetailPage,
  ErrorPage,
  SettingPage,
  RewardHistoryPage
} from '../../pages'

import menuData from './menu-data';
import CompetitionAdd from '../CompetitionManagement/CompetitionAdd';

class MainFramePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedMenuName: Strings.txtUserManagement,
      selecteMenuID: 2,
    };
  }
  componentDidMount() {

    const role = getRole();
    if (role === Strings.payorAdminRole) {
      this.props.appStore.findMePayorAdmin()
      this.props.appStore.findOwnAdminAccess()
      this.props.appStore.findOwnFeatures()
    }

  }

  onMenuItemClick = (item, id) => {
    const role = getRole();
    if (!item) return;
    this.setState({ selectedMenuName: item.name, selecteMenuID: id })

    if (role === Strings.superAdminRole) {
      switch (item.name) {
        case Strings.txtDashboard:
          this.props.history.push("/main/dashboard");
          break;
        case Strings.txtUserManagement:
          this.props.history.push("/main/user-management");
          break;
        case Strings.txtPayorList:
          this.props.history.push("/main/payor-management");
          break;
        case Strings.txtBanner:
          this.props.history.push("/main/banner-management");
          break;
        case Strings.txtPackage:
          this.props.history.push("/main/package-management");
          break;
        case Strings.txtChallenge:
          this.props.history.push("/main/challenge-management");
          break;
        case Strings.txtChallengeTemplate:
          this.props.history.push("/main/challenge-template-management");
          break;
        case Strings.txtRewards:
          this.props.history.push("/main/reward-management");
          break;
        case Strings.txtRewardType:
          this.props.history.push("/main/reward-type-management");
          break;
        case Strings.txtMyWellness:
          this.props.history.push("/main/my-wellness");
          break;
        case Strings.txtPointHistory:
          this.props.history.push("/main/point-history-management");
          break;
        case Strings.txtPackageAndInvoice:
          this.props.history.push("/main/package-invoice-management");
          break;
        case Strings.txtBroadcast:
          this.props.history.push("/main/broadcast-management");
          break;
        default:
          this.props.history.push("/main/dashboard");
      }
    } else {
      switch (item.name) {
        case Strings.txtDashboard:
          this.props.history.push("/main/dashboard");
          break;
        case Strings.txtUserManagement:
          this.props.history.push("/main/user-management");
          break;
        case Strings.txtRewards:
          this.props.history.push("/main/reward-management");
          break;
        case Strings.txtBanner:
          this.props.history.push("/main/banner-management");
          break;
        case Strings.txtChallenge:
          this.props.history.push("/main/challenge-management");
          break;
        case Strings.txtCompetition:
          this.props.history.push("/main/competition-management");
          break;
        case Strings.txtJobLevel:
          this.props.history.push("/main/job-management");
          break;
        case Strings.txtDepartment:
          this.props.history.push("/main/department-management");
          break;
        case Strings.txtPackageAndInvoice:
          this.props.history.push("/main/package-invoice-management");
          break;
        case Strings.txtBroadcast:
          this.props.history.push("/main/broadcast-management");
          break;
        case Strings.txtThemeSetting:
          this.props.history.push("/main/setting");
          break;
        case Strings.txtRewardHistory:
          this.props.history.push("/main/reward-history");
          break;
        case Strings.txtPointHistory:
          this.props.history.push("/main/point-history-management");
          break;
        default:
          this.props.history.push("/main/error");
      }
    }
  }

  renderSuperAdminRouting = (match) => {
    return <Switch>
      <Route exact path={`${match.url}/user-management`} name="user-management" component={EmployeeManagementPage} />
      <Route exact path={`${match.url}/user-management/add`} name="user-management-add" component={EmployeeAddPage} />
      <Route exact path={`${match.url}/user-management/detail/:id`} name="user-management-detail" component={EmployeeDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/symptom/detail/:symptomId`} name="user-management-detail-symptoms" component={SymptomRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/prescription/detail/:prescriptionId`} name="user-management-detail-prescription" component={PrescriptionDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/medicationRecord/detail/:medicationRecordId`} name="user-management-detail-medication-record" component={MedicationRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/weight/detail/:weightRecordId`} name="user-management-detail-weight-record" component={WeightRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/diet/detail/:dietRecordId`} name="user-management-detail-diet-record" component={DietRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/step/detail/:stepId`} name="user-management-detail-step" component={StepDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/stair/detail/:stairId`} name="user-management-detail-stair" component={StairDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/sleep/detail/:sleepId`} name="user-management-detail-sleep" component={SleepDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/exercise/detail/:exerciseRecordId`} name="user-management-detail-exercise" component={ExerciseRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/bloodGlucose/detail/:bloodGlucoseRecordId`} name="user-management-detail-blood-glucose" component={BloodGlucoseRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/water/detail/:habitRecordId`} name="user-management-detail-water" component={WaterDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/veggie/detail/:habitRecordId`} name="user-management-detail-veggie" component={VeggieDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/fruit/detail/:habitRecordId`} name="user-management-detail-fruit" component={FruitDetailPage} />

      <Route exact path={`${match.url}/payor-management`} name="payor-management" component={PayorManagementPage} />
      <Route exact path={`${match.url}/payor-management/add`} name="payor-management-add" component={PayorAddPage} />
      <Route exact path={`${match.url}/payor-management/detail/:id`} name="payor-management-detail" component={PayorDetailPage} />

      <Route exact path={`${match.url}/job-management`} name="job-management" component={JobLevelManagementPage} />
      <Route exact path={`${match.url}/job-management/add`} name="job-management-add" component={JobLevelAddPage} />
      <Route exact path={`${match.url}/job-management/detail/:id`} name="job-management-detail" component={JobLevelDetailPage} />

      <Route exact path={`${match.url}/banner-management`} name="banner-management" component={BannerManagementPage} />
      <Route exact path={`${match.url}/banner-management/add`} name="banner-management-add" component={BannerAddPage} />
      <Route exact path={`${match.url}/banner-management/detail/:id`} name="banner-management-detail" component={BannerDetailPage} />

      <Route exact path={`${match.url}/my-wellness`} name="my-wellness" component={MyWellnessPage} />
      <Route exact path={`${match.url}/my-wellness/symptom/add`} name="my-wellness-symptom-add" component={SymptomAddPage} />
      <Route exact path={`${match.url}/my-wellness/symptom/detail/:id`} name="my-wellness-symptom-detail" component={SymptomDetailPage} />
      <Route exact path={`${match.url}/my-wellness/medicine/add`} name="my-wellness-medicine-add" component={MedicineAddPage} />
      <Route exact path={`${match.url}/my-wellness/medicine/detail/:id`} name="my-wellness-medicine-detail" component={MedicineDetailPage} />
      <Route exact path={`${match.url}/my-wellness/meal/add`} name="my-wellness-meal-add" component={MealAddPage} />
      <Route exact path={`${match.url}/my-wellness/meal/detail/:id`} name="my-wellness-meal-detail" component={MealDetailPage} />
      <Route exact path={`${match.url}/my-wellness/exercise/add`} name="my-wellness-exercise-add" component={ExerciseAddPage} />
      <Route exact path={`${match.url}/my-wellness/exercise/detail/:id`} name="my-wellness-exercise-detail" component={ExerciseDetailPage} />
      <Route exact path={`${match.url}/my-wellness/healthRisk/add`} name="my-wellness-healthRisk-add" component={HealthRiskAddPage} />
      <Route exact path={`${match.url}/my-wellness/healthRisk/detail/:id`} name="my-wellness-healthRisk-detail" component={HealthRiskDetailPage} />
      <Route exact path={`${match.url}/package-management`} name="package-management" component={PackageManagementPage} />
      <Route exact path={`${match.url}/package-management/add`} name="package-management-add" component={PackageAddPage} />
      <Route exact path={`${match.url}/package-management/detail/:id`} name="package-management-detail" component={PackageDetailPage} />
      <Route exact path={`${match.url}/package-management/detail/:id/set-admin-access`} name="package-admin-access" component={AdminAccessManagement} />

      <Route exact path={`${match.url}/challenge-management`} name="challenge-management" component={ChallengeManagementPage} />
      <Route exact path={`${match.url}/challenge-management/add`} name="challenge-management-add" component={ChallengeAddPage} />
      <Route exact path={`${match.url}/challenge-management/detail/:id`} name="challenge-management-detail" component={ChallengeDetailPage} />
      <Route exact path={`${match.url}/challenge-management/add/template/:id`} name="challenge-management-add" component={ChallengeAddPage} />

      <Route exact path={`${match.url}/challenge-template-use`} name="challenge-template-use" component={ChallengeTemplateListUsePage} />
      <Route exact path={`${match.url}/challenge-template-use/detail/:id`} name="challenge-template-use-detail" component={ChallengeTemplateDetailUsePage} />

      <Route exact path={`${match.url}/challenge-template-management`} name="challenge-template-management" component={ChallengeTemplateManagementPage} />
      <Route exact path={`${match.url}/challenge-template-management/add`} name="challenge-template-management-add" component={ChallengeTemplateAddPage} />
      <Route exact path={`${match.url}/challenge-template-management/detail/:id`} name="challenge-template-management-detail" component={ChallengeTemplateDetailPage} />

      <Route exact path={`${match.url}/dashboard`} name="dashboard" component={DashboardPage} />

      <Route exact path={`${match.url}/reward-management`} name="reward-management" component={RewardManagementPage} />
      <Route exact path={`${match.url}/reward-management/add`} name="reward-management-add" component={RewardAddPage} />
      <Route exact path={`${match.url}/reward-management/detail/:id`} name="reward-management-detail" component={RewardDetailPage} />

      <Route exact path={`${match.url}/reward-type-management`} name="reward-type-management" component={RewardTypeManagementPage} />
      <Route exact path={`${match.url}/reward-type-management/add`} name="reward-type-management-add" component={RewardTypeAddPage} />
      <Route exact path={`${match.url}/reward-type-management/detail/:id`} name="reward-type-management-detail" component={RewardTypeDetailPage} />

      <Route exact path={`${match.url}/point-history-management`} name="point-history-management" component={PointHistoryManagementPage} />
      <Route exact path={`${match.url}/point-history-management/detail/:id`} name="point-history-management-detail" component={PointHistoryDetailPage} />

      <Route exact path={`${match.url}/package-invoice-management`} name="package-invoice-management" component={PackageInvoiceManagementPage} />
      <Route exact path={`${match.url}/package-invoice-management/add`} name="package-invoice-management-add" component={PackageInvoiceAddPage} />
      <Route exact path={`${match.url}/package-invoice-management/detail/:id`} name="package-invoice-management-detail" component={PackageInvoiceDetailPage} />

      <Route exact path={`${match.url}/setting`} name="theme-setting-management" component={SettingPage} />
      <Route exact path={`${match.url}/broadcast-management`} name="broadcast-management" component={BroadcastManagementPage} />
      <Route exact path={`${match.url}/broadcast-management/add`} name="reward-type-management-add" component={BroadcastAddPage} />
      <Route exact path={`${match.url}/broadcast-management/detail/:id`} name="reward-type-management-detail" component={BroadcastDetailPage} />
      <Route component={ErrorPage} />
    </Switch>
  }

  renderPayorAdminRouting = (match) => {
    return <Switch>
      <Route exact path={`${match.url}/user-management`} name="user-management" component={EmployeeManagementPage} />
      <Route exact path={`${match.url}/user-management/add`} name="user-management-add" component={EmployeeAddPage} />
      <Route exact path={`${match.url}/user-management/detail/:id`} name="user-management-detail" component={EmployeeDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/symptom/detail/:symptomId`} name="user-management-detail" component={SymptomRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/prescription/detail/:prescriptionId`} name="user-management-detail" component={PrescriptionDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/weight/detail/:weightRecordId`} name="user-management-detail-weight-record" component={WeightRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/diet/detail/:dietRecordId`} name="user-management-detail-diet-record" component={DietRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/step/detail/:stepId`} name="user-management-detail-step" component={StepDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/exercise/detail/:exerciseRecordId`} name="user-management-detail-exercise" component={ExerciseRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/bloodGlucose/detail/:bloodGlucoseRecordId`} name="user-management-detail-blood-glucose" component={BloodGlucoseRecordDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/water/detail/:habitRecordId`} name="user-management-detail-water" component={WaterDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/veggie/detail/:habitRecordId`} name="user-management-detail-veggie" component={VeggieDetailPage} />
      <Route exact path={`${match.url}/user-management/detail/:employeeId/my-wellness-record/fruit/detail/:habitRecordId`} name="user-management-detail-fruit" component={FruitDetailPage} />

      <Route exact path={`${match.url}/payor-management`} name="payor-management" component={PayorManagementPage} />
      <Route exact path={`${match.url}/payor-management/add`} name="payor-management-add" component={PayorAddPage} />
      <Route exact path={`${match.url}/payor-management/detail/:id`} name="payor-management-detail" component={PayorDetailPage} />

      <Route exact path={`${match.url}/job-management`} name="job-management" component={JobLevelManagementPage} />
      <Route exact path={`${match.url}/job-management/add`} name="job-management-add" component={JobLevelAddPage} />
      <Route exact path={`${match.url}/job-management/detail/:id`} name="job-management-detail" component={JobLevelDetailPage} />

      <Route exact path={`${match.url}/banner-management`} name="banner-management" component={BannerManagementPage} />
      <Route exact path={`${match.url}/banner-management/add`} name="banner-management-add" component={BannerAddPage} />
      <Route exact path={`${match.url}/banner-management/detail/:id`} name="banner-management-detail" component={BannerDetailPage} />

      <Route exact path={`${match.url}/department-management`} name="department-management" component={DepartmentManagementPage} />
      <Route exact path={`${match.url}/department-management/add`} name="department-management-add" component={DepartmentAddPage} />
      <Route exact path={`${match.url}/department-management/detail/:id`} name="department-management-detail" component={DepartmentDetailPage} />

      <Route exact path={`${match.url}/competition-management`} name="competition-management" component={CompetitionManagementPage} />
      <Route exact path={`${match.url}/competition-management/add`} name="competition-management-add" component={CompetitionAddPage} />
      <Route exact path={`${match.url}/competition-management/detail/:id`} name="competition-management-detail" component={CompetitionDetailPage} />

      <Route exact path={`${match.url}/challenge-management`} name="challenge-management" component={ChallengeManagementPage} />
      <Route exact path={`${match.url}/challenge-management/add`} name="challenge-management-add" component={ChallengeAddPage} />
      <Route exact path={`${match.url}/challenge-management/detail/:id`} name="challenge-management-detail" component={ChallengeDetailPage} />
      <Route exact path={`${match.url}/challenge-management/add/template/:id`} name="challenge-management-add" component={ChallengeAddPage} />

      <Route exact path={`${match.url}/challenge-template-use`} name="challenge-template-use" component={ChallengeTemplateListUsePage} />
      <Route exact path={`${match.url}/challenge-template-use/detail/:id`} name="challenge-template-use-detail" component={ChallengeTemplateDetailUsePage} />

      <Route exact path={`${match.url}/dashboard`} name="dashboard" component={DashboardPage} />

      <Route exact path={`${match.url}/reward-management`} name="reward-management" component={RewardManagementPage} />
      <Route exact path={`${match.url}/reward-management/add`} name="reward-management-add" component={RewardAddPage} />
      <Route exact path={`${match.url}/reward-management/detail/:id`} name="reward-management-detail" component={RewardDetailPage} />

      <Route exact path={`${match.url}/reward-type-management`} name="reward-type-management" component={RewardTypeManagementPage} />
      <Route exact path={`${match.url}/reward-type-management/add`} name="reward-type-management-add" component={RewardTypeAddPage} />
      <Route exact path={`${match.url}/reward-type-management/detail/:id`} name="reward-type-management-detail" component={RewardTypeDetailPage} />

      <Route exact path={`${match.url}/reward-history`} name="reward-history" component={RewardHistoryPage} />

      <Route exact path={`${match.url}/point-history-management`} name="point-history-management" component={PointHistoryManagementPage} />
      <Route exact path={`${match.url}/point-history-management/detail/:id`} name="point-history-management-detail" component={PointHistoryDetailPage} />

      <Route exact path={`${match.url}/package-invoice-management`} name="package-invoice-management" component={PackageInvoiceManagementPage} />
      <Route exact path={`${match.url}/package-invoice-management/detail/:id`} name="package-invoice-management-detail" component={PackageInvoiceDetailPage} />

      <Route exact path={`${match.url}/setting`} name="theme-setting-management" component={SettingPage} />
      {
        /*
          <Route exact path={`${match.url}/package-invoice-tab`} name="package-invoice-tab" component={PackageInvoiceTabPage} />
          <Route exact path={`${match.url}/package-invoice-tab/package/detail/:id`} name="package-invoice-tab-package-detail" component={PayorAdminPackageDetailPage} />
          <Route exact path={`${match.url}/package-invoice-tab/invoice/detail/:id`} name="package-invoice-tab-invoice-detail" component={PayorAdminInvoiceDetailPage} />
          <Route exact path={`${match.url}/package-invoice-tab/package/detail/:id/see-admin-access`} name="package-invoice-tab-package-detail-see-admin-access" component={AdminAccessManagement} />
          <Route exact path={`${match.url}/package-invoice-tab/create-order`} name="package-invoice-create-order" component={CreateOrderPage} />
         */
      }

      <Route exact path={`${match.url}/broadcast-management`} name="broadcast-management" component={BroadcastManagementPage} />
      <Route exact path={`${match.url}/broadcast-management/add`} name="reward-type-management-add" component={BroadcastAddPage} />
      <Route exact path={`${match.url}/broadcast-management/detail/:id`} name="reward-type-management-detail" component={BroadcastDetailPage} />
      <Route component={ErrorPage} />
    </Switch>
  }
  render() {
    const { match } = this.props;
    const role = getRole();
    const isSuperAdmin = role == 'superadmin'
    const menuList = isSuperAdmin ? menuData.superAdminMenu : menuData.payorAdminMenu
    const menuTitle = isSuperAdmin ? menuData.superAdminTitle : menuData.payorAdminTitle
    return <div className="cw-main">
      <div className="header">
        <Header history={this.props.history} />
      </div>
      <div className="middle">
        <div className="cw-nav-bar">
          <CMSideMenu title={menuTitle} data={menuList} onItemClick={(item, id) => { this.onMenuItemClick(item, id) }} />
        </div>
        <div className="content">
          {
            isSuperAdmin ?
              this.renderSuperAdminRouting(match)
              :
              this.renderPayorAdminRouting(match)
          }

        </div>
      </div>
      <ToastContainer />
    </div>
  }
}

export default inject('authStore', 'appStore')(observer(MainFramePage));