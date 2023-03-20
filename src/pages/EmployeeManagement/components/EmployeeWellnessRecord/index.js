import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';
import { inject, observer } from "mobx-react";

import SymptomRecord from '../../../MyWellnessRecord/SymptomRecord'
import Prescription from '../../../MyWellnessRecord/Prescription'
import WeightRecord from '../../../MyWellnessRecord/WeightRecord'
import DietRecord from '../../../MyWellnessRecord/DietRecord'
import Step from '../../../MyWellnessRecord/Step'
import Stair from '../../../MyWellnessRecord/Stair'
import Sleep from '../../../MyWellnessRecord/Sleep'
import ExerciseRecord from '../../../MyWellnessRecord/ExerciseRecord'
import BloodGlucoseRecord from '../../../MyWellnessRecord/BloodGlucoseRecord'
import MedicationRecord from '../../../MyWellnessRecord/MedicationRecord'
import Water from '../../../MyWellnessRecord/HabitRecord/Water'
import Fruit from '../../../MyWellnessRecord/HabitRecord/Fruit'
import Veggie from '../../../MyWellnessRecord/HabitRecord/Veggie'
import { checkFeatureAllowed } from '@helpers/permissionHelper';
const selectSection = [
    {
        id: 1,
        name: Strings.txtFeatureHealthRisk,
        feature: 'healthRisk',
    },
    {
        id: 2,
        name: Strings.txtFeatureConsultation,
        feature: 'consultation',
    },
    {
        id: 3,
        name: Strings.txtFeatureSymptoms,
        feature: 'symptom'
    },
    {
        id: 4,
        name: Strings.txtFeaturePrescriptions,
        feature: 'medication'
    },
    {
        id: 14,
        name: Strings.txtFeatureMedications,
        feature: 'medication'
    },
    {
        id: 5,
        name: Strings.txtFeatureWeight,
        feature: 'weight'
    },
    {
        id: 6,
        name: Strings.txtFeatureFood,
        feature: 'food'
    },
    {
        id: 7,
        name: Strings.txtFeatureSleep,
        feature: 'sleep'
    },
    {
        id: 8,
        name: Strings.txtFeatureStep,
        feature: 'step'
    },
    {
        id: 9,
        name: Strings.txtFeatureWater,
        feature: 'water'
    },
    {
        id: 10,
        name: Strings.txtFeatureVeggies,
        feature: 'veggie'
    },
    {
        id: 15,
        name: Strings.txtFeatureFruit,
        feature: 'fruit'
    },
    {
        id: 11,
        name: Strings.txtFeatureExercise,
        feature: 'exercise'
    },
    {
        id: 12,
        name: Strings.txtFeatureBloodGlucose,
        feature: 'bloodGlucose'
    },
    {
        id: 13,
        name: Strings.txtFeatureStair,
        feature: 'stair'
    }

]
class EmployeeWellnessRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            section: null,
            features : []
        };
    }
    componentDidMount = () => {
        let checkedFeatures = [] 
        selectSection.forEach(item=>{
            if(checkFeatureAllowed(item.feature)) 
            checkedFeatures.push(item);
        })
        this.setState({features: checkedFeatures, section: checkedFeatures.length > 0 ? checkedFeatures.id : null})
    }
    renderRecordComponent = () => {
        const { employeeID } = this.props;
        switch(this.state.section) {
            case 3: 
                return <SymptomRecord employeeID={employeeID} history={this.props.history}/>
            case 4: 
                return <Prescription employeeID={employeeID} history={this.props.history}/>
            case 14: 
                return <MedicationRecord employeeID={employeeID} history={this.props.history}/>
            case 5: 
                return <WeightRecord employeeID={employeeID} history={this.props.history}/>
            case 6: 
                return <DietRecord employeeID={employeeID} history={this.props.history}/>
            case 7: 
                return <Sleep employeeID={employeeID} history={this.props.history}/>
            case 8:
                return <Step employeeID={employeeID} history={this.props.history}/>
            case 9:
                return <Water employeeID={employeeID} history={this.props.history}/>
            case 10:
                return <Veggie employeeID={employeeID} history={this.props.history}/>
            case 15:
                return <Fruit employeeID={employeeID} history={this.props.history}/>
            case 11:
                return <ExerciseRecord employeeID={employeeID} history={this.props.history}/>
            case 12:
                return <BloodGlucoseRecord employeeID={employeeID} history={this.props.history}/>
            case 13: 
                return <Stair employeeID={employeeID} history={this.props.history}/>
        }
    }
    render() {
      

        return <div className="cw-column" style={{flex: 1}}>
            <CSelectInput  containerStyle={{width: '248px', marginTop: '30px'}} 
                            data={this.state.features} 
                            defaultValue={this.state.features.length > 0 ? this.state.features[0].id : null}
                            selectedItemID={this.state.section}
                            onItemSelected={(item)=>{this.setState({section: item.id})}} />
            {this.renderRecordComponent()}
        </div>
    }
}

export default EmployeeWellnessRecord;
