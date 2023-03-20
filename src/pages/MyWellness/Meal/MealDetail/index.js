import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import MealForm from '../components/MealForm';

class MealDetailPage extends Component {
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
                to: `/main/my-wellness/meal-management/detail/${id}`,
                title: Strings.txtMealDetail
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
                <div className="title">{Strings.txtMealDetail}</div>
            </div>
            <div className="form-content-container">
                <MealForm  history={this.props.history} isEdit={true} mealID={id}/>
            </div>
          
        </div>
    }
}

export default MealDetailPage