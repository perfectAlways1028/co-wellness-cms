import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../components/atoms'
import { CMTable } from '../../components/molecules';

import { Strings } from '../../constants';
import { inject, observer } from "mobx-react";
const breadcrumbs = [
    {
        to: '/main/reward-type-management',
        title: Strings.txtMasterData
    },
    {
        to: '/main/reward-type-management',
        title: Strings.txtRewardType
    }
]


const fields = [
    {
        title: Strings.txtFieldRewardTypeID,
        field: 'rewardCategoryIDCode'
    },
    {
        title: Strings.txtFieldRewardsName,
        field: 'name',
        sort: true
    }
]


class RewardTypeManagementPage extends Component {

    constructor(props) {
      super(props);

      this.state = {
          currentPage : 1,
          sortParam: null
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
        this.props.history.push(`/main/reward-type-management/detail/${id}`);
    }

    onImportCSV = () => {

    }
    onAddNew = () => {
        this.props.history.push('/main/reward-type-management/add');
    }
    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        console.log("filter", filter);
        this.props.rewardTypeStore.findRewardTypes(filter)
        .then(result => {

        })
    }
    onClear = () => {
        this.setState({
            query: null,
            status: null,
            payorID: null,
        })
    }

    onChangePage = (page) => {
        this.setState({currentPage: page}, ()=>{
            this.onApplyFilter();
        })
        
    }

    onSort = (field, sortDirection) => {
        let sortParam = field.field + ':'+ sortDirection;
        this.setState({sortParam}, ()=>{
            this.onApplyFilter()
        })
    }

    render () {
        const { totalCount, rewardTypes } = this.props.rewardTypeStore;
        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtRewardType}</div>
                <div className="buttons">
                    <CButton 
                        onClick={()=>{this.onAddNew()}}
                        type="secondary"
                        containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtAddNewRewardType}</CButton>
                </div>
            </div>
            <div className="filter">
                <div className="cw-row">
                    <CTextInput type='search' 
                        placeholder={Strings.txtRewardSearchPlaceholder} 
                        containerStyle={{width: '248px'}} 
                        value={this.state.query} 
                        onChangeValue={(value)=>{this.setState({query: value})}}
                        label={Strings.txtSearch}/>
                    <CButton 
                        onClick={()=>{this.onApplyFilter()}}
                        isLoading={this.props.rewardTypeStore.isLoading}
                        containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'8px'}}>{Strings.txtApply}</CButton>
                    <CButton 
                        onClick={()=>{this.onClear()}}
                        type='cancel'
                        containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'8px'}}>{Strings.txtClear}</CButton>

                </div>
            </div>
            <div className="content-container">
                <CMTable
                        fields={fields}
                        data={rewardTypes}
                        onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                        renderCustomField={(row, col, field, item) => {
                            return null;
                        }}
                        onRowClick={(rowData, rowIndex) => {this.onRowClick(rowData, rowIndex)}}
                        containerStyle={{marginTop: '16px'}}
                />
                {
                    totalCount > this.state.limit &&
                    <CPagination
                        onChange={(page)=>{this.onChangePage(page)}}
                        current={this.state.currentPage}
                        pageSize={this.state.limit}
                        total={totalCount}
                    />
                }
            </div>
        </div>

    }
}

export default inject('rewardTypeStore')(observer(RewardTypeManagementPage));
