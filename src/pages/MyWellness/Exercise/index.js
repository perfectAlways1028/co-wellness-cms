import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../../components/atoms'
import { CMTable } from '../../../components/molecules';

import { Strings } from '../../../constants';
import { inject, observer } from "mobx-react";

const fields = [
    {
        title: Strings.txtFieldExerciseID,
        field: 'exerciseID'
    },
    {
        title: Strings.txtFieldExerciseName,
        field: 'name'
    },
    {
        title: Strings.txtFieldCalroiesPerMinute,
        field: 'caloriesPerMin'
    }
]


class Exercise extends Component {

    constructor(props) {
      super(props);

      this.state = {
        limit: 10,
        currentPage: 1,
        query: null,
      };
    }

    componentDidMount() {
        this.onLoad();
    }
    onLoad = () => {
        this.onApplyFilter();
    }
    
    onAddNew = () => {
        this.props.history.push('/main/my-wellness/exercise/add');
    }
    onRowClick = (rowData, index) => {
        let id = rowData.exerciseID;
        this.props.history.push(`/main/my-wellness/exercise/detail/${id}`);

    }

    onApplyFilter = () => {
        let filter = {
           
            limit: this.state.limit,
            offset: this.state.currentPage - 1
        }
        if(this.state.query) {
            filter.search = this.state.query;
        }

        this.props.exerciseStore.findExercises(filter)
    }
    onClear = () => {
        this.setState({
            query: null,
        })
    }
    onChangePage = (page) => {
        this.setState({currentPage: page}, ()=>{
            this.onApplyFilter();
        })
        
    }

    render () {
        const { totalCount, exercises } = this.props.exerciseStore;
        let data = exercises;
        return <div className="cw-sub-wellness-container">  
            <div className="sub-header">
                <div className="sub-title">{Strings.txtExerciseList}</div>
                <div className="buttons">
                    <CButton 
                        onClick={()=>{this.onAddNew()}}
                        type="secondary"
                        containerStyle={{width: '172px', height: '40px', marginRight: '32px'}}>{Strings.txtBtnAddNewExercise}</CButton>
                </div>
            </div>
            <div className="sub-filter">
                <div className="cw-row">
                    <CTextInput type='search' 
                        placeholder={Strings.txtExerciseSearchPlaceholder} 
                        value={this.state.query} 
                        onChangeValue={(value)=>{this.setState({query: value})}}
                        containerStyle={{width: '248px'}} 
                        label={Strings.txtSearch}/>
                    <CButton 
                        onClick={()=>{this.onApplyFilter()}}
                        isLoading={this.props.exerciseStore.isLoading}
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

export default inject('exerciseStore')(observer(Exercise));
