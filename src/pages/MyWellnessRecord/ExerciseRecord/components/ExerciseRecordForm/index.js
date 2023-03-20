import React, { Component } from 'react';
import { CTextInput, CImageButton } from '../../../../../components/atoms'
import {CMTable } from '../../../../../components/molecules';
import { Strings, Constants, Images } from '../../../../../constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';

import { toast } from 'react-toastify';

const fields = [
    {
        title: Strings.txtFieldExerciseName,
        field: 'exerciseName'
    },
    {
        title: Strings.txtFieldDuration,
        field: 'elapsedTime',
    },
    {
        title: Strings.txtFieldCalories,
        field: 'caloriesPerMin',
    },
    {
        title: "",
        field: 'action',
        type:  'custom'
    },
]
const dummyData = [
    {
        exerciseRecordID: 478,
        exerciseName: "Aerobik, gerakan keras",
        elapsedTime: 7,
        caloriesPerMin: 10
    }
]
class ExerciseRecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseRecordID: null,
            date: null,
            totalCalories: null,
            errDate: null,
            exerciseRecords: []
        };
    }


    componentDidMount() {
        this.reLoad();
 
    } 

    reLoad = () => {
        const { exerciseRecordID, employeeID, isEdit } = this.props;
        if( isEdit && exerciseRecordID ) {
            this.props.exerciseRecordStore.findOneExerciseTargetRecord(exerciseRecordID, {employeeID} )
            .then(result => {
                let detailExerciseTargetRecord = result.target;
                let detailExerciseRecords = result.exerciseRecord;
                  this.setState({
                    targetID: detailExerciseTargetRecord.targetID,     
                    date: detailExerciseTargetRecord.date,
                    exerciseTotal: detailExerciseTargetRecord.exerciseTotal,
                    exerciseTarget: detailExerciseTargetRecord.exerciseTarget,
                    exerciseTargetAchieved: detailExerciseTargetRecord.exerciseTargetAchieved,
                    exerciseRecords: detailExerciseRecords.map(record => {
                        return {
                            exerciseRecordID: record.exerciseRecordID,
                            exerciseName: record.exercise ? record.exercise.name : record.exerciseName,
                            elapsedTime: record.elapsedTime,
                            caloriesPerMin: record.caloriesPerMin
                        }
                    })
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
        }
    }
    onRemoveItem = ( recordID ) => {
        console.log("recordID", recordID);
        if (window.confirm('Are you sure you wish to delete this exercise record?'))  {
            this.onDeleteExerciseRecord(recordID) 
        }
    }

    onDeleteExerciseRecord = (id) => {
        this.props.exerciseRecordStore.deleteExerciseRecord(id)
        .then(deleted => {
            toast(Strings.txtExerciseRecordDeleteSuccess);
            this.reLoad();
        })
    }
    render() {
        const { isEdit } = this.props;

        return <div className="cw-default-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldRecordID} 
                            value={this.state.targetID} 
                            placeholder={Strings.txtFieldExerciseRecordID} 
                            disable />
                }

                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldDate} 
                        value={convertDateToDisplay(this.state.date)} 
                        placeholder={Strings.txtFieldDate} 
                        disable />
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldTotalCalories} 
                        value={this.state.exerciseTotal} 
                        placeholder={Strings.txtFieldExerciseRecordID} 
                        disable />
                        
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldStatus} 
                    value={this.state.exerciseTargetAchieved? Strings.txtStatusArchieved: Strings.txtStatusNonArchieved} 
                    disable
                        />


                <div className="cw-default-form-sub-section" style={{fontSize: '20px', marginBottom: '16px'}}>{Strings.txtExerciseList}</div>
            

                <div className="cw-default-form-table-content">
                <CMTable
                        fields={fields}
                        data={this.state.exerciseRecords}
                        renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            if(field.field == 'action') {
                                return <td key={'key'+ colIndex} style={{justifyContent:'center', alignItems: 'flex-end', display: 'flex'}}>
                                {
                                   
                                    <CImageButton src={Images.trash}
                                    onClick={()=>{
                                        this.onRemoveItem(rowData.exerciseRecordID);
                                    }} 
                                    containerStyle={{
                                                    width: '48px', 
                                                    height: '48px', 
                                                    marginRight: '8px',
                                                    marginTop: '6px'
                                                 }}/>
                               
                                }
                            </td>
                            }
                            return null
                        }}
                        onRowClick={(rowData, rowIndex) => {}}
                        containerStyle={{marginTop: '16px'}}
                />
              
                </div>
                
            </div>

        </div>
    }
}

export default inject('exerciseRecordStore')(observer(ExerciseRecordForm));