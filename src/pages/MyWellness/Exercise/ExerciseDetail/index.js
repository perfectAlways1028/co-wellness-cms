import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import ExerciseForm from '../components/ExerciseForm';

class ExerciseDetailPage extends Component {
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
                to: `/main/my-wellness/exercise-management/detail/${id}`,
                title: Strings.txtExerciseDetail
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
                <div className="title">{Strings.txtExerciseDetail}</div>
            </div>
            <div className="form-content-container">
                <ExerciseForm  history={this.props.history} isEdit={true} exerciseID={id}/>
            </div>
          
        </div>
    }
}

export default ExerciseDetailPage