import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../../components/atoms'
import { CMTable } from '../../../components/molecules';

import { Strings } from '../../../constants';

const fields = [
    {
        title: Strings.txtFieldHealthRiskID,
        field: 'healthRiskIDCode'
    },
    {
        title: Strings.txtFieldHealthRiskName,
        field: 'name'
    },
]

const data = [
    {
        id: 1,
        healthRiskIDCode: 'HR000001',
        name: 'Mental Health',
    },
    {
        id: 2,
        healthRiskIDCode: 'HR000002',
        name: 'Physical Activity',
    },
    {
        id: 3,
        healthRiskIDCode: 'HR000003',
        name: 'Nutritional Status',
    },
    
  
]

class HealthRiskList extends Component {

    constructor(props) {
      super(props);

      this.state = {
          currentPage : 1
      };
    }
    
    onRowClick = (rowData, index) => {
        let id = rowData.id;
        this.props.history.push(`/main/my-wellness/health-risk/detail/${id}`);

    }

    onApplyFilter = () => {

    }
    onClear = () => {

    }

    onChangePage = (page) => {
        console.log("onChangePage", page);
        this.setState({currentPage: page})
    }
    render () {
        return <div className="cw-sub-wellness-container">  
            <div className="sub-header">
                <div className="sub-title">{Strings.txtHealthRisk}</div>
                <div className="buttons">
                </div>
            </div>
            <div className="sub-filter">
                <div className="cw-row">
                    <CTextInput type='search' placeholder={Strings.txtHealthRiskSearchPlaceholder} containerStyle={{width: '248px'}} label={Strings.txtSearch}/>
                    <CButton 
                        onClick={()=>{this.onApplyFilter()}}
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
                <CPagination
                    onChange={(page)=>{this.onChangePage(page)}}
                    current={this.state.currentPage}
                    total={25}
                />
                
            </div>
        </div>

    }
}

export default HealthRiskList