import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CStatus } from '../../components/atoms'
import { CMTable } from '../../components/molecules';
import { getRole } from '@helpers/storageHelper';
import { Strings, Constants } from '../../constants';
import { convertDatetimeToDisplay } from '@helpers/dateHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

import { inject, observer } from "mobx-react";
const breadcrumbs = [
  {
    to: '/main/history-reward',
    title: Strings.txtRewardHistory
  }
]
const statuses = [
  {
    id: 'false',
    name: 'Redeemed'
  },
  {
    id: 'true',
    name: 'Used'
  },
]

const fields = [
  {
    title: "Rewards ID",
    field: 'rewardIDCode'
  },
  {
    title: "Rewards/Coupon",
    field: 'rewardName',
    sort: true
  },
  {
    title: "User Name",
    field: 'userName',
    sort: true,
  },
  {
    title: "Redemption Date",
    field: 'redeemDate',
    type: 'custom',
    sort: true
  },
  {
    title: "Used Date",
    field: 'usedAt',
    type: 'custom',
    sort: true
  },
  {
    title: "Price/Amount",
    field: 'rewardPoint',
    sort: true
  },
  {
    title: Strings.txtFieldStatus,
    field: 'isUsed',
    type: 'custom'
  }
]

class RewardHistoryManagementPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      limit: 10,
      sort: 'userName',
    };
  }
  componentDidMount() {
    this.onLoad();
  }
  onLoad = () => {
    this.onApplyFilter();
    this.props.employeeStore.findEmployees();
    this.props.rewardStore.findRewards()
  }

  onApplyFilter = () => {
    let paging = {}

    if (this.state.sort) {
      paging.sort = this.state.sort;
    }

    const {
      query,
      status,
      employee,
      reward,
      startDate,
      endDate,
      setEditedData
    } = this.props.rewardHistoryStore;

    setEditedData({
      query,
      status,
      employee,
      reward,
      startDate,
      endDate,
    })

    this.props.rewardHistoryStore.findRewardHistory(paging)
      .then(result => {

      })
  }
  onClear = () => {
    const {
      setFilterEmployee,
      setFilterReward,
      setFilterStartDate,
      setFilterEndDate,
      setFilterQuery,
      setFilterStatus,
      setEditedData
    } = this.props.rewardHistoryStore;

    setFilterEmployee('');
    setFilterReward('');
    setFilterStartDate('');
    setFilterEndDate('');
    setFilterQuery('');
    setFilterStatus('');
    setEditedData({
      query: '',
      status: '',
      employee: '',
      reward: '',
      startDate: '',
      endDate: ''
    })
  }
  onSort = (field, sortDirection) => {
    let sortParam = field.field + ':' + sortDirection;
    this.setState({ sortParam }, () => {
      this.onApplyFilter()
    })

  }

  render() {
    const role = getRole()
    const isSuperAdmin = role == 'superadmin';
    const {
      totalCount,
      rewardHistoryList,
      setFilterEmployee,
      setFilterReward,
      setFilterStartDate,
      setFilterEndDate,
      setFilterQuery,
      setFilterStatus,
      onChangePage,
      query,
      status,
      employee,
      reward,
      startDate,
      endDate,
      limit,
      offset
    } = this.props.rewardHistoryStore;
    const { rewards } = this.props.rewardStore;
    const { employees } = this.props.employeeStore;

    const permissionRead = checkPermissionAllowed(Constants.PAGE.POINT_HISTORY, Constants.PAGE_PERMISSION.READ);

    return <div className="cw-defaultpage-container">
      <CBreadcrumbs data={breadcrumbs} />
      <div className="header">
        <div className="title">{Strings.txtRewardHistory}</div>
        <div className="buttons">

        </div>
      </div>
      {
        permissionRead &&
        <div className="filter" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <div className="cw-row">
            <CSelectInput containerStyle={{ width: '248px', marginLeft: '16px' }}
              data={employees} label="Filter By Username"
              placeholder={Strings.txtAll}
              selectedItemID={employee}
              onItemSelected={(item) => { setFilterEmployee(item.id) }} />
            <CSelectInput containerStyle={{ width: '248px', marginLeft: '16px' }}
              data={rewards} label="Filter by Coupon Name"
              placeholder={Strings.txtAll}
              selectedItemID={reward}
              onItemSelected={(item) => { setFilterReward(item.id) }} />
            <CDatePicker containerStyle={{ width: '248px', marginLeft: '16px' }}
              label={Strings.txtFieldStartDate}
              selected={startDate}
              placeholderText={Strings.txtFieldStartDate}
              onChange={(value) => { setFilterStartDate(value) }} />
            <CDatePicker containerStyle={{ width: '248px', marginLeft: '16px' }}
              label={Strings.txtFieldEndDate}
              selected={endDate}
              placeholderText={Strings.txtFieldEndDate}
              onChange={(value) => { setFilterEndDate(value) }} />

          </div>
          <div className="cw-row">
            <CSelectInput containerStyle={{ width: '248px', marginLeft: '16px' }}
              data={statuses} label={Strings.txtFilterByStatus}
              placeholder={Strings.txtAll}
              selectedItemID={status}
              onItemSelected={(item) => { setFilterStatus(item.id) }} />
            <CTextInput type="search"
              placeholder={Strings.txtPackageSearchPlaceholder}
              containerStyle={{ minWidth: '248px', marginLeft: '16px' }}
              value={query}
              onChangeValue={(value) => { setFilterQuery(value) }}
              label={Strings.txtSearch} />
            <CButton
              onClick={() => { this.onApplyFilter(0) }}
              isLoading={this.props.rewardHistoryStore.isLoading}
              containerStyle={{ width: '136px', height: '40px', marginLeft: '16px' }}>{Strings.txtApply}</CButton>
            <CButton
              onClick={() => { this.onClear() }}
              type='cancel'
              containerStyle={{ width: '136px', height: '40px', marginLeft: '16px' }}>{Strings.txtClear}</CButton>

          </div>
        </div>
      }
      {
        permissionRead &&
        <div className="content-container">
          <CMTable
            fields={fields}
            data={rewardHistoryList}
            onSort={(field, sortDirection) => { this.onSort(field, sortDirection) }}
            renderCustomField={(field, rowData, rowIndex, colIndex) => {
              if (field.field == 'usedAt') {

                return <td key={'key' + colIndex}>
                  {
                    <div>{convertDatetimeToDisplay(rowData['usedAt'])}</div>
                  }
                </td>
              }
              else if (field.field == 'redeemDate') {

                return <td key={'key' + colIndex}>
                  {
                    <div>{convertDatetimeToDisplay(rowData['redeemDate'])}</div>
                  }
                </td>
              }
              else if (field.field == 'isUsed') {

                return <td key={'key' + colIndex}>
                  <div style={{ justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                    <CStatus value={!!rowData['isUsed'] ? "USED" : "REDEEMED"}
                      color={!!rowData['isUsed'] ? 'red' : 'green'} />
                  </div>
                </td>
              }
              else {
                return null;
              }

            }}
            // onRowClick={(rowData, rowIndex) => { this.onRowClick(rowData, rowIndex) }}
            containerStyle={{ marginTop: '16px' }}
          />
          {
            totalCount > limit &&
            <CPagination
              onChange={(page) => { onChangePage(page) }}
              current={offset}
              pageSize={limit}
              total={totalCount}
            />
          }

        </div>
      }
    </div>

  }
}

export default inject('rewardStore', 'employeeStore', 'rewardHistoryStore')(observer(RewardHistoryManagementPage));
