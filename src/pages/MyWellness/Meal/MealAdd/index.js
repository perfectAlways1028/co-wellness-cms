import React, { Component } from 'react';
import { CBreadcrumbs } from '../../../../components/atoms'
import MealForm from '../components/MealForm';
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
        to: '/main/my-wellness/meal-management/add',
        title: Strings.txtAddNewMeal
    },
]

class MealAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewMeal}</div>
            </div>
            <div className="form-content-container">
                <MealForm history={this.props.history} isEdit={false}/>
            </div>

        </div>
    }
}

export default MealAddPage