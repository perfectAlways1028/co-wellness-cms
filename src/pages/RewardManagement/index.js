import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CStatus } from '../../components/atoms'
import { CMTable } from '../../components/molecules';

import { Strings, Constants } from '../../constants';
import { getRole } from '@helpers/storageHelper';
import { convertDateToDisplay } from '@helpers/dateHelper';
import { inject, observer } from "mobx-react";
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const breadcrumbs = [
    {
        to: '/main/reward-management',
        title: Strings.txtRewards
    }
]
const statues = [
    {
        id: 'available',
        name: Strings.txtAvailable
    },
    {
        id: 'unavailable',
        name: Strings.txtUnavailable
    },
]
const categories = [
    {
        id: 1,
        name: "Shopping"
    },
    {
        id: 2,
        name: "Bill"
    },
    {
        id: 3,
        name: "Travel"
    },
    {
        id: 4,
        name: "Other"
    }
]

const superAdminFields = [
    {
        title: Strings.txtFieldRewardsID,
        field: 'rewardIDCode'
    },
    {
        title: Strings.txtFieldRewardsName,
        field: 'name',
        sort: true
    },
    {
        title: Strings.txtFieldCategory,
        field: 'rewardCategoryName',
        sort: true
    },
    {
        title: Strings.txtFieldCreator,
        field: 'payorName',
        type: 'custom',
        sort: true
    },
    {
        title: Strings.txtFieldValidity,
        field: 'validity',
        type: 'custom'
    },
    {
        title: Strings.txtFieldStatus,
        field: 'status',
        type: 'custom'
    }
]
const payorAdminFields = [
    {
        title: Strings.txtFieldRewardsID,
        field: 'rewardIDCode'
    },
    {
        title: Strings.txtFieldRewardsName,
        field: 'name',
        sort: true
    },
    {
        title: Strings.txtFieldCategory,
        field: 'rewardCategoryName',
        sort: true
    },
    {
        title: Strings.txtFieldCreator,
        field: 'payorName',
        type: 'custom',
        sort: true
    },
    {
        title: Strings.txtFieldValidity,
        field: 'validity',
        type: 'custom',
    },
    {
        title: 'Redeemed',
        field: 'redeemedPercentage',
        type: 'custom',
    },
    {
        title: 'Used',
        field: 'usedPercentage',
        type: 'custom',
    },
    {
        title: Strings.txtFieldStatus,
        field: 'status',
        type: 'custom'
    }
]


class RewardManagementPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            limit: 10,
            sortParam: null
        };
    }
    componentDidMount() {
        this.onLoad();
    }
    onLoad = () => {
        this.onApplyFilter();
        this.props.payorStore.findAllPayors();
        this.props.rewardTypeStore.findAllRewardTypes();
    }

    onRowClick = (rowData, index) => {
        let id = rowData.id;
        this.props.history.push(`/main/reward-management/detail/${id}`);

    }

    onImportCSV = () => {

    }
    onAddNew = () => {
        this.props.history.push('/main/reward-management/add');
    }

    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            payorID: this.state.payorID,
            category: this.state.category,
            status: this.state.status,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if (this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        this.props.rewardStore.findRewards(filter)
            .then(result => {

            })
    }
    onClear = () => {
        this.setState({
            query: null,
            status: null,
            payorID: null,
            category: null
        })
    }
    onSort = (field, sortDirection) => {
        let sortParam = field.field + ':' + sortDirection;
        this.setState({ sortParam }, () => {
            this.onApplyFilter()
        })

    }

    onChangePage = (page) => {
        this.setState({ currentPage: page }, () => {
            this.onApplyFilter();
        })

    }

    render() {
        const { totalCount, rewards } = this.props.rewardStore;
        const { allRewardTypes } = this.props.rewardTypeStore;
        const { allPayors } = this.props.payorStore;
        const role = getRole()
        const isSuperAdmin = role == 'superadmin';
        const permissionRead = checkPermissionAllowed(Constants.PAGE.REWARDS, Constants.PAGE_PERMISSION.READ);
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.REWARDS, Constants.PAGE_PERMISSION.CREATE);

        return <div className="cw-defaultpage-container">
            <CBreadcrumbs data={breadcrumbs} />
            <div className="header">
                <div className="title">{Strings.txtRewards}</div>
                <div className="buttons">
                    {

                        permissionCreate &&
                        <CButton
                            onClick={() => { this.onAddNew() }}
                            type="secondary"
                            containerStyle={{ width: '172px', height: '40px', marginLeft: '16px' }}>{Strings.txtAddNewRewards}</CButton>
                    }
                </div>
            </div>
            {
                permissionRead &&

                <div className="filter">
                    <div className="cw-row">
                        <CSelectInput containerStyle={{ width: '248px' }}
                            data={allRewardTypes} label={Strings.txtFilterByCategory}
                            placeholder={Strings.txtAll}
                            selectedItemID={this.state.category}
                            onItemSelected={(item) => { this.setState({ category: item.id }) }} />
                        {
                            isSuperAdmin &&
                            <CSelectInput containerStyle={{ width: '248px', marginLeft: '16px' }}
                                data={allPayors} label={Strings.txtFilterByCreator}
                                placeholder={Strings.txtAll}
                                selectedItemID={this.state.payorID}
                                onItemSelected={(item) => { this.setState({ payorID: item.id }) }} />
                        }
                        <CSelectInput containerStyle={{ width: '248px', marginLeft: '16px' }}
                            data={statues} label={Strings.txtFilterByStatus}
                            placeholder={Strings.txtAll}
                            selectedItemID={this.state.status}
                            onItemSelected={(item) => { this.setState({ status: item.id }) }} />
                    </div>
                    <div className="cw-row">
                        <CTextInput type='search'
                            placeholder={Strings.txtRewardSearchPlaceholder}
                            containerStyle={{ width: '248px' }}
                            value={this.state.query}
                            onChangeValue={(value) => { this.setState({ query: value }) }}
                            label={Strings.txtSearch} />
                        <CButton
                            onClick={() => { this.onApplyFilter() }}
                            isLoading={this.props.rewardStore.isLoading}
                            containerStyle={{ width: '136px', height: '40px', marginLeft: '16px', marginTop: '8px' }}>{Strings.txtApply}</CButton>
                        <CButton
                            onClick={() => { this.onClear() }}
                            type='cancel'
                            containerStyle={{ width: '136px', height: '40px', marginLeft: '16px', marginTop: '8px' }}>{Strings.txtClear}</CButton>

                    </div>
                </div>
            }
            {
                permissionRead &&

                <div className="content-container">
                    <CMTable
                        fields={isSuperAdmin ? superAdminFields : payorAdminFields}
                        data={rewards}
                        onSort={(field, sortDirection) => { this.onSort(field, sortDirection) }}
                        renderCustomField={(field, rowData, rowIndex, colIndex) => {

                            if (field.field == 'status') {

                                return <td key={'key' + colIndex}>
                                    <div style={{ justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                                        <CStatus value={rowData['status'] == 'available' ? Strings.txtStatusAvailable : Strings.txtStatusUnavailable}
                                            color={rowData['status'] == 'available' ? 'green' : 'red'} />
                                    </div>
                                </td>
                            } else if (field.field == 'validity') {

                                let periodStr = (convertDateToDisplay(rowData['startDate']) || "") + ' ~ ' + (convertDateToDisplay(rowData['endDate']) || "");
                                return <td key={'key' + colIndex}>
                                    {
                                        <div>{periodStr}</div>
                                    }
                                </td>
                            } else if (field.field == 'payorName') {
                                return <td key={'key' + colIndex}>
                                    {
                                        <div>{rowData['payorName'] || Strings.txtSilaomHospitals}</div>
                                    }
                                </td>
                            } else if (field.field == 'redeemedPercentage') {
                                return <td key={'key' + colIndex}>
                                    {
                                        <div>{`${rowData['redeemedPercentage']}%`}</div>
                                    }
                                </td>
                            } else if (field.field == 'usedPercentage') {
                                return <td key={'key' + colIndex}>
                                    {
                                        <div>{`${rowData['usedPercentage']}%`}</div>
                                    }
                                </td>
                            }
                            else {
                                return null;
                            }

                        }}
                        onRowClick={(rowData, rowIndex) => { this.onRowClick(rowData, rowIndex) }}
                        containerStyle={{ marginTop: '16px' }}
                    />
                    {
                        totalCount > this.state.limit &&
                        <CPagination
                            onChange={(page) => { this.onChangePage(page) }}
                            current={this.state.currentPage}
                            pageSize={this.state.limit}
                            total={totalCount}
                        />
                    }

                </div>
            }
        </div>

    }
}

export default inject('payorStore', 'rewardStore', 'rewardTypeStore')(observer(RewardManagementPage));
