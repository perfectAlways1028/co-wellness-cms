import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CStatus, CLinkButton } from '@components/atoms'
import { CMTable } from '@components/molecules';

import { Strings, Constants } from '@constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const breadcrumbs = [
    {
        to: '/main/challenge-management',
        title: Strings.txtChallenge
    }
]

const statues = [
    {
        id: Constants.challengeStatus.pending,
        name: Strings.txtStatusPending
    },
    {
        id: Constants.challengeStatus.started,
        name: Strings.txtStatusStarted
    },
    {
        id: Constants.challengeStatus.expired,
        name: Strings.txtStatusExpired
    },
]

const fields = [
    {
        title: Strings.txtFieldChallengeID,
        field: 'challengeIDCode'
    },
    {
        title: Strings.txtFieldPayorName,
        field: 'payorName',
        sort: true
    },
    {
        title: Strings.txtFieldCategory,
        field: 'category'
    },
    {
        title: Strings.txtFieldChallengeTitle,
        field: 'title'
    },
    {
        title: Strings.txtFieldPeriod,
        field: 'period',
        type: 'custom',
        sort: true
    },
    {
        title: Strings.txtFieldStatus,
        field: 'status',
        type: 'custom',
        sort: true
    }
]

class MiniChallengeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            query: null,
            limit: 10,
            category: null,
            status: null,
            sortParam: null,
            competitionID: this.props.competitionID
        };
    }

    componentDidMount() {
        this.onLoad();
    }
    onLoad = () => {
        this.onApplyFilter();
    }

    onRowClick = (rowData, index) => {
        let id = rowData.id;
        if (this.props.onChangePage) {
            this.props.onChangePage('form', { id: id, isEdit: true })
        }

    }
    onAdd = () => {
        if (this.props.onChangePage) {
            this.props.onChangePage('form', { isEdit: false })
        }
    }

    onApplyFilter = () => {
        let filter = {
            competitionID: this.state.competitionID,
            challengeType: 'competition',
            query: this.state.query,
            category: this.state.category,
            status: this.state.status,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if (this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        console.log("filter", filter);
        this.props.competitionChallengeStore.findCompetitionChallenges(filter)
            .then(result => {

            })
    }
    onClear = () => {
        this.setState({
            query: null,
            status: null,
            category: null,
        })
    }

    onChangePage = (page) => {
        this.setState({ currentPage: page }, () => {
            this.onApplyFilter();
        })

    }

    onSort = (field, sortDirection) => {
        let sortParam = field.field + ':' + sortDirection;
        if (field.field == 'period') {
            sortParam = `startDate:${sortDirection},endDate:${sortDirection}`
        }
        if (field.field == 'status') {
            sortParam = `endDate:${sortDirection}`
        }
        this.setState({ sortParam }, () => {
            this.onApplyFilter()
        })
    }
    getStringFromStatus = (status) => {
        switch (status) {
            case Constants.challengeStatus.started:
                return Strings.txtStatusStarted;
            case Constants.challengeStatus.pending:
                return Strings.txtStatusPending;
            case Constants.challengeStatus.expired:
                return Strings.txtStatusExpired;
        }
        return Strings.txtStatusExpired;
    }
    getColorFromStatus = (status) => {
        switch (status) {
            case Constants.challengeStatus.started:
                return 'green';
            case Constants.challengeStatus.pending:
                return 'yellow';
            case Constants.challengeStatus.expired:
                return 'red';
        }
        return Strings.txtStatusExpired;
    }
    getStatusFromDate = (startDate, endDate) => {

        let now = new Date();
        let nowTimestamp = now.getTime();
        let startDateTimeStamp = startDate ? (new Date(startDate)).getTime() : null;
        let endDateTimeStamp = endDate ? (new Date(endDate)).getTime() : null;

        if (startDateTimeStamp && nowTimestamp <= startDateTimeStamp)
            return Constants.challengeStatus.pending
        else if (endDateTimeStamp && nowTimestamp >= endDateTimeStamp)
            return Constants.challengeStatus.expired
        else if (!startDateTimeStamp)
            return Constants.challengeStatus.pending
        else
            return Constants.challengeStatus.started
    }
    render() {
        const { totalCount, challenges } = this.props.competitionChallengeStore;
        const permissionRead = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.READ);
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.CREATE);

        return <div className="form-container">
            <div className="header" style={{ marginLeft: '0px', paddingLeft: '0px', width: '100%' }}>
                <div className="title" style={{ width: 'inherit' }}>{Strings.txtMiniChallengeList}</div>
                {
                    permissionCreate &&
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                    <CButton 
                        onClick={() => { this.onAdd() }}>{Strings.txtAddMiniChallenge}</CButton></div>
                }
            </div>
            {
                permissionRead &&
                <div className="content-container" style={{ marginLeft: '0px', marginRight: '16px' }}>
                    <CMTable
                        fields={fields}
                        data={challenges}
                        onSort={(field, sortDirection) => { this.onSort(field, sortDirection) }}
                        renderCustomField={(field, rowData, rowIndex, colIndex) => {

                            if (field.field == 'status') {
                                let status = this.getStatusFromDate(rowData['startDate'], rowData['endDate']);
                                return <td key={'key' + colIndex}>
                                    <div style={{ justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                                        <CStatus value={this.getStringFromStatus(status)}
                                            color={this.getColorFromStatus(status)} />
                                    </div>
                                </td>
                            } else if (field.field == 'period') {


                                let periodStr = (convertDateToDisplay(rowData['startDate']) || "") + ' ~ ' + (convertDateToDisplay(rowData['endDate']) || "");
                                return <td key={'key' + colIndex}>
                                    {
                                        <div>{periodStr}</div>
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

export default inject('competitionChallengeStore')(observer(MiniChallengeList));