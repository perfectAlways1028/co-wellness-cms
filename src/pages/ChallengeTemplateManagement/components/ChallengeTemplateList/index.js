import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../../../components/atoms'
import { CMTable } from '../../../../components/molecules';

import { Strings, Constants } from '../../../../constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';

const fields = [
    {
        title: Strings.txtFieldChallengeTemplateID,
        field: 'challengeIDCode'
    },
    {
        title: Strings.txtFieldCategory,
        field: 'category',
        sort: true
    },
    {
        title: Strings.txtFieldChallengeTitle,
        field: 'title'
    }
]

const fieldWithUseAction = [
    {
        title: Strings.txtFieldChallengeTemplateID,
        field: 'challengeIDCode'
    },
    {
        title: Strings.txtFieldCategory,
        field: 'category',
        sort: true
    },
    {
        title: Strings.txtFieldChallengeTitle,
        field: 'title'
    },
    {
        title: "",
        type: 'custom',
        field: 'action'
    }
]

class ChallengeTemplateList extends Component {

    constructor(props) {
      super(props);

      this.state = {
        limit: 10,
        currentPage : 1,
        query: null,
        category: null,
        sortParam: null
      };
    }
    
    onRowClick = (rowData, index) => {

        let id = rowData.id;
        if(this.props.isUse) {
            this.props.history.push(`/main/challenge-template-use/detail/${id}`);
        } else {
            this.props.history.push(`/main/challenge-template-management/detail/${id}`);
        }
       

    }
    onUseTemplate = ( templateID ) => {
        //this.props.history.push(`/main/challenge-management/use-template/${templateID}`);
    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad = () => {
        this.onApplyFilter();
    }
    
    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            category: this.state.category,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        
        if(this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }

        this.props.challengeTemplateStore.findChallengeTemplates(filter)
    }
    onClear = () => {
        this.setState({
            query: null,
            category: null,
        })
    }

    getFields = (isUse) => {
        if(isUse) return fieldWithUseAction;
        else return fields;
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

        const { totalTemplateCount, challengeTemplates } = this.props.challengeTemplateStore;
        return (
            <div className="cw-column" style={{flex: 1}}>
                <div className="filter" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                    <div className="cw-row-wrap">
                        <CTextInput type="search" 
                                    placeholder={Strings.txtPackageSearchPlaceholder} 
                                    containerStyle={{minWidth: '248px', marginLeft: '16px'}} 
                                    label={Strings.txtSearch}/>
                        <CButton 
                            onClick={()=>{this.onApplyFilter()}}
                            isLoading={this.props.challengeTemplateStore.isLoading}
                            containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'18px'}}>{Strings.txtApply}</CButton>
                        <CButton 
                            onClick={()=>{this.onClear()}}
                            type='cancel'
                            containerStyle={{width: '136px', height: '40px', marginLeft: '16px', marginTop:'18px'}}>{Strings.txtClear}</CButton>

                    </div>
                </div>
                <div className="content-container">
                    <CMTable
                            fields={this.getFields(this.props.isUse)}
                            data={challengeTemplates}
                            onSort={(field, sortDirection)=>{this.onSort(field, sortDirection)}}
                            renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            
                                if(field.field == 'action') {
                                    return <td key={'key'+ colIndex}>
                                        {
                                            <CButton 
                                              onClick={()=>{this.onUseTemplate(rowData.id)}}
                                              type="secondary"
                                              containerStyle={{width: '116px', height: '40px'}}>{Strings.txtBtnUse}</CButton>
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
                        totalTemplateCount > this.state.limit &&
                        <CPagination
                            onChange={(page)=>{this.onChangePage(page)}}
                            current={this.state.currentPage}
                            pageSize={this.state.limit}
                            total={totalTemplateCount}
                        />
                    }

                    
                </div>
            </div>
        )

    }
}

export default inject('challengeTemplateStore')(observer(ChallengeTemplateList));
