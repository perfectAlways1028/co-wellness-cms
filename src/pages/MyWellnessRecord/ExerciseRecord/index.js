import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CLabel, CStatus } from '../../../components/atoms'
import { CMTable } from '../../../components/molecules';

import { Strings } from '../../../constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay } from '@helpers/dateHelper';

const fields = [
    {
        title: Strings.txtFieldRecordID,
        field: 'targetID'
    },
    {
        title: Strings.txtFieldDate,
        field: 'date',
        type:  'custom'
    },
    {
        title: Strings.txtFieldTotalCalories,
        field: 'exerciseTotal',
    },
    {
        title: Strings.txtFieldTargetCalories,
        field: 'exerciseTarget',
    },
    {
        title: Strings.txtFieldStatus,
        field: 'status',
        type:  'custom'
    },
]


class ExerciseRecord extends Component {

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
        let targetID = rowData.targetID;
        this.props.history.push(`/main/user-management/detail/${employeeId}/my-wellness-record/exercise/detail/${targetID}`);
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

        this.props.exerciseRecordStore.findExerciseTargetRecords(filter)
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
    getStatus = (archieved) => {
        if(archieved) 
            return Strings.txtStatusArchieved;
        return Strings.txtStatusNonArchieved;
    }
    getColorFromStatus= (archieved) => {
        if(archieved) 
            return 'green';
        return 'red';
    }

    render () {
        const { totalCount, exerciseRecords, target } = this.props.exerciseRecordStore;
        let data = exerciseRecords;
        return <div className="cw-sub-wellness-container">  
            <div className="sub-header">
                <div className="sub-title">{Strings.txtExerciseRecord}</div>
            </div>
            {
                target &&
                <div className="cw-row" style={{marginBottom: '24px'}}>
                    <CLabel containerStyle={{width: '248px'}} 
                                label={Strings.txtDailyCaloriesTarget} 
                                value={target.exerciseTarget}
                                />
                </div>
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
                        placeholder={Strings.txtExerciseRecordSearchPlaceholder} 
                        value={this.state.query} 
                        onChangeValue={(value)=>{this.setState({query: value})}}
                        containerStyle={{width: '248px'}} 
                        label={Strings.txtSearch}/>
                    <CButton 
                        onClick={()=>{this.onApplyFilter()}}
                        isLoading={this.props.exerciseRecordStore.isLoading}
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
                            }  else if(field.field == 'status') { 
                                  
                                return <td key={'key'+ colIndex}>
                                    {
                                        <div style={{ justifyContent: 'flex-start', alignItems: 'center', display:'flex' }}>
                                            <CStatus value={this.getStatus(rowData['exerciseTargetAchieved'])} 
                                                 color={this.getColorFromStatus(rowData['exerciseTargetAchieved'])}/>
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

export default inject('exerciseRecordStore')(observer(ExerciseRecord));
