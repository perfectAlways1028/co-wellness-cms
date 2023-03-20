import React, { Component } from 'react';
import { CBreadcrumbs } from '../../../components/atoms'
import JobLevelForm from '../components/JobLevelForm';
import { Strings } from '../../../constants';

import './style.scss'

const breadcrumbs = [
    {
        to: '/main/job-management',
        title: Strings.txtJobLevel
    },
    {
        to: '/main/job-management/add',
        title: Strings.txtAddNewJobLevel
    },
]

class JobLevelAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewJobLevel}</div>
            </div>
            <div className="form-content-container">
                <JobLevelForm history={this.props.history} isEdit={false}/>
            </div>

        </div>
    }
}

export default JobLevelAddPage