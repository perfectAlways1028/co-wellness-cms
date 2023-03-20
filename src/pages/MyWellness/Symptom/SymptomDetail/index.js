import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import SymptomForm from '../components/SymptomForm';

class SymptomDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/my-wellness',
                title: Strings.txtMasterData
            },
            {
                to: '/main/my-wellness',
                title: Strings.txtMyWellness
            },
            {
                to: `/main/my-wellness/symptom-management/detail/${id}`,
                title: Strings.txtSymptomDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { id } = this.props.match.params; 
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtSymptomDetail}</div>
            </div>
            <div className="form-content-container">
                <SymptomForm  history={this.props.history} isEdit={true} symptomID={id}/>
            </div>
          
        </div>
    }
}

export default SymptomDetailPage