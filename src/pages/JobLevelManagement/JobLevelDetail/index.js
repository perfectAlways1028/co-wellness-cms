import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../components/atoms'

import { Strings } from '../../../constants';

import JobLevelForm from '../components/JobLevelForm';

import './style.scss'

class JobLevelDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/job-management',
                title: Strings.txtJobLevel
            },
            {
                to: `/main/job-management/detail/${id}`,
                title: Strings.txtJobDetail
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
                <div className="title">{Strings.txtJobDetail}</div>
            </div>
            <div className="form-content-container">
                <JobLevelForm  history={this.props.history} isEdit={true} jobID={id}/>
            </div>
          
        </div>
    }
}

export default JobLevelDetailPage