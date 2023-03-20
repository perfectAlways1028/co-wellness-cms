import React, { Component } from 'react';
import { CBreadcrumbs } from '../../../../components/atoms'
import HealthRiskForm from '../components/HealthRiskForm';
import { Strings } from '../../../../constants';

const breadcrumbs = [
    {
        to: '/main/my-wellness',
        title: Strings.txtMasterData
    },
    {
        to: '/main/my-wellness',
        title: Strings.txtMyWellness
    },
    {
        to: '/main/my-wellness/exercise-management/add',
        title: Strings.txtAddNewHealthRisk
    },
]

class HealthRiskAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewHealthRisk}</div>
            </div>
            <div className="form-content-container">
                <HealthRiskForm history={this.props.history} isEdit={false}/>
            </div>

        </div>
    }
}

export default HealthRiskAddPage