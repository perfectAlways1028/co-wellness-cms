import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../components/atoms'
import { CMTable } from '../../components/molecules';

import { Strings, Constants } from '../../constants';
import { inject, observer } from "mobx-react";
import './style/style.scss'
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';
import { convertDateToDisplay } from '@helpers/dateHelper';

const breadcrumbs = [
    {
        to: '/main/banner-management',
        title: Strings.txtPayor
    },
    {
        to: '/main/banner-management',
        title: Strings.txtBanner
    }
]

const statuses = [
    {
        id: true,
        name: Strings.txtActive
    },
    {
        id: false,
        name: Strings.txtNonActive
    },
]


const superAdminFields = [
    {
        title: Strings.txtFieldBannerID,
        field: 'bannerIDCode'
    },
    {
        title: Strings.txtFieldBannerTitle,
        field: 'title',
        sort: true
    },
    {
        title: Strings.txtFieldPayorName,
        field: 'payorName',
        sort: true
    },
    {
        title: Strings.txtFieldPostedDate,
        field: 'postedDate',
        type: 'custom'
    }
];

const payorAdminFields = [
    {
        title: Strings.txtFieldBannerID,
        field: 'bannerIDCode'
    },
    {
        title: Strings.txtFieldBannerTitle,
        field: 'title',
        sort: true
    },
    {
        title: Strings.txtFieldPostedDate,
        field: 'postedDate',
        type: 'custom'
    }];

class BannerManagementPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
            currentPage: 1,
            query: null,
            status: null,
            payorID: null,
            sortParam: null
        };
    }
    componentDidMount() {
        this.onLoad();

    }
    onLoad = () => {
        this.onApplyFilter();
        this.props.payorStore.findAllPayors();
    }

    onRowClick = (rowData, index) => {
        let id = rowData.id;
        this.props.history.push(`/main/banner-management/detail/${id}`);

    }

    onImportCSV = () => {

    }
    onAddNewBanner = () => {
        this.props.history.push('/main/banner-management/add');
    }

    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            payorID: this.state.payorID,
            active: this.state.status,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }

        if (this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        console.log("filter", filter);
        this.props.bannerStore.findBanners(filter)
    }
    onClear = () => {
        this.setState({
            query: null,
            status: null,
            payorID: null,
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
        const { totalCount, banners } = this.props.bannerStore;
        const { allPayors } = this.props.payorStore;
        const role = getRole()
        const isSuperAdmin = role == 'superadmin';
        const permissionRead = checkPermissionAllowed(Constants.PAGE.BANNER, Constants.PAGE_PERMISSION.READ);
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.BANNER, Constants.PAGE_PERMISSION.CREATE);
        return <div className="cw-employeemanagement-container">
            <CBreadcrumbs data={breadcrumbs} />
            <div className="header">
                <div className="title">{Strings.txtBanner}</div>
                <div className="buttons">
                    {
                        permissionCreate &&
                        <CButton
                            onClick={() => { this.onAddNewBanner() }}
                            type="secondary"
                            containerStyle={{ width: '172px', height: '40px', marginLeft: '16px' }}>{Strings.txtBtnAddNewBanner}</CButton>
                    }

                </div>
            </div>
            {
                permissionRead &&
                <div className="filter">
                    <div className="cw-row">
                        {
                            isSuperAdmin &&
                            <CSelectInput containerStyle={{ width: '248px' }}
                                data={allPayors}
                                label={Strings.txtFilterByPayor}
                                placeholder={Strings.txtAll}
                                selectedItemID={this.state.payorID}
                                onItemSelected={(item) => { this.setState({ payorID: item.id }) }} />
                        }
                        <CSelectInput containerStyle={{ width: '248px', marginLeft: isSuperAdmin ? '30px' : '0px' }}
                            data={statuses}
                            label={Strings.txtFilterByStatus}
                            placeholder={Strings.txtAll}
                            selectedItemID={this.state.status}
                            onItemSelected={(item) => { this.setState({ status: item.id }) }} />
                    </div>
                    <div className="cw-row">
                        <CTextInput type='search'
                            placeholder={Strings.txtBannerPlaceholder}
                            containerStyle={{ width: '248px' }}
                            value={this.state.query}
                            onChangeValue={(value) => { this.setState({ query: value }) }}
                            label={Strings.txtSearch} />
                        <CButton
                            onClick={() => { this.onApplyFilter() }}
                            isLoading={this.props.bannerStore.isLoading}
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
                        data={banners}
                        onSort={(field, sortDirection) => { this.onSort(field, sortDirection) }}
                        renderCustomField={(field, rowData, rowIndex, colIndex) => {

                            if (field.field == 'postedDate') {

                                return <td key={'key' + colIndex}>
                                    {
                                        <div>{convertDateToDisplay(rowData['createdAt'])}</div>
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

export default inject('payorStore', 'bannerStore')(observer(BannerManagementPage));
