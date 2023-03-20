import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CLabel, CStatus } from '../../../components/atoms'
import { CMTable } from '../../../components/molecules';

import { Strings } from '../../../constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay } from '@helpers/dateHelper';

const fields = [
    {
        title: Strings.txtFieldRecordID,
        field: 'id'
    },
    {
        title: Strings.txtFieldDate,
        field: 'date',
        type:  'custom'
    },
    {
        title: Strings.txtFieldStair,
        field: 'stair',
    },
    {
        title: Strings.txtFieldStairTarget,
        field: 'stairTarget',
        type:  'custom'
    },
    {
        title: Strings.txtFieldStatus,
        field: 'status',
        type:  'custom'
    },
]


class Stair extends Component {

    constructor(props) {
      super(props);

      this.state = {
        limit: 10,
        currentPage: 1,
        query: null,
        startDate: null,
        endDate: null,
      };
    }

    componentDidMount() {
        this.onLoad();
    }
    onLoad = () => {
        this.onApplyFilter();
    }
    
    onRowClick = (rowData, index) => {
        let employeeId = this.props.employeeID;
        let stairID = rowData.id;
        this.props.history.push(`/main/user-management/detail/${employeeId}/my-wellness-record/stair/detail/${stairID}`);
    }

    onApplyFilter = () => {
        let filter = {
            employeeID: this.props.employeeID,
            limit: this.state.limit,
            offset: this.state.currentPage - 1
        }
        if(this.state.query) {
            filter.search = this.state.query;
        }
        if(this.state.startDate) {
            filter.startDate = this.state.startDate;
        }
        if(this.state.endDate) {
            filter.endDate = this.state.endDate;
        }

        this.props.stairStore.findStairs(filter)
    }
    onClear = () => {
        this.setState({
            query: null,
            startDate: null,
            endDate: null
        })
    }
    onChangePage = (page) => {
        this.setState({currentPage: page}, ()=>{
            this.onApplyFilter();
        })
        
    }
    getStatusFromValue = (stair, minTarget) => {
        if(stair >=minTarget) 
            return Strings.txtStatusArchieved;
        return Strings.txtStatusNonArchieved;
    }
    getColorFromValue = (stair, minTarget) => {
        if(stair >= minTarget) 
            return 'green';
        return 'red';
    }

    render () {
        const { totalCount, stairs, target } = this.props.stairStore;
        let data = stairs;
        return <div className="cw-sub-wellness-container">  
            <div className="sub-header">
                <div className="sub-title">{Strings.txtStair}</div>
            </div>
            {
                /*target &&
                <div className="cw-row" style={{marginBottom: '24px'}}>
                    <CLabel containerStyle={{width: '248px'}} 
                                label={Strings.txtStairTarget} 
                                value={target.stairTarget || "-"}
                                />
                </div>*/
            }
            <div className="sub-filter">
                <div className="cw-row">
                    <CDatePicker containerStyle={{width: '248px'}} 
                                label={Strings.txtStartDate} 
                                selected={this.state.startDate} 
                                placeholderText={Strings.txtStartDate} 
                                onChange={(value) => {this.setState({startDate: value})}}/>
                    <CDatePicker containerStyle={{width: '248px' , marginLeft: '16px'}} 
                                label={Strings.txtEndDate} 
                                selected={this.state.endDate} 
                                placeholderText={Strings.txtEndDate} 
                                onChange={(value) => {this.setState({endDate: value})}}/>
                </div>
                <div className="cw-row">
                    <CTextInput type='search' 
                        placeholder={Strings.txtStairSearchPlaceholder} 
                        value={this.state.query} 
                        onChangeValue={(value)=>{this.setState({query: value})}}
                        containerStyle={{width: '248px'}} 
                        label={Strings.txtSearch}/>
                    <CButton 
                        onClick={()=>{this.onApplyFilter()}}
                        isLoading={this.props.stairStore.isLoading}
                        containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'8px'}}>{Strings.txtApply}</CButton>
                    <CButton 
                        onClick={()=>{this.onClear()}}
                        type='cancel'
                        containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'8px'}}>{Strings.txtClear}</CButton>

                </div>
            </div>
            <div className="sub-content-container">
                <CMTable
                        fields={fields}
                        data={data}
                        renderCustomField={(field, rowData, rowIndex, colIndex) => {
                                
                            if(field.field == 'date') {
                              
                                return <td key={'key'+ colIndex}>
                                    {
                                        <div>{convertDateToDisplay(rowData['date'])}</div>
                                    }
                                </td>
                            } else if(field.field == 'stairTarget') { 
                                  
                                return <td key={'key'+ colIndex}>
                                    {
                                        target &&
                                        <div>{target.stairTarget}</div>
                                    }
                                </td>   
                            } else if(field.field == 'status') { 
                                  
                                return <td key={'key'+ colIndex}>
                                    {
                                        target &&
                                        <div style={{ justifyContent: 'flex-start', alignItems: 'center', display:'flex' }}>
                                            <CStatus value={this.getStatusFromValue(rowData['stair'], target.stairTarget)} 
                                                 color={this.getColorFromValue(rowData['stair'], target.stairTarget)}/>
                                        </div>
                                       
                                    }
                                </td>   
                            }
                            else {
                                return null;
                            }
                        
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

export default inject('stairStore')(observer(Stair));
