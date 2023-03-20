import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../../../components/atoms'
import { CMRadioGroup } from '../../../../../components/molecules'

import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";
import { numberValidate } from '@helpers/validator';
import { toast } from 'react-toastify';

class ExerciseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseID: null,
            name: null,
            caloriesPerMin: null,
            errTitle: null,
            errPayor: null,
            errImageUrl: null
        };
    }


    componentDidMount() {
        const { exerciseID, isEdit } = this.props;
        if( isEdit && exerciseID ) {
            this.props.exerciseStore.findOneExercise(exerciseID)
            .then(detailExercise => {
                  this.setState({
                    exerciseID: detailExercise.exerciseID,                 
                    name: detailExercise.name,
                    caloriesPerMin: detailExercise.caloriesPerMin,

                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }
        
 
    } 

 

    onSave = () => {
        const {  
            name,
            caloriesPerMin
            } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    name,
                    caloriesPerMin
                }

                this.props.exerciseStore.createExercise(body)
                .then(created => {
                    toast(Strings.txtExerciseCreateSuccess);
                    this.props.history.go(-1);
                })
                .catch(err => {
                    console.log("faild", err);
                    toast(Strings.txtUnexpectedError);
                });
            }
        } else {
            if( this.validateForm() ) {
                let body = {
                    name,
                    caloriesPerMin
                }
                this.props.exerciseStore.updateExercise(this.props.exerciseID, body)
                .then(updated => {
                    toast(Strings.txtExerciseUpdateSuccess);
                })
                .catch(err => {
                    console.log("faild", err);
                    toast(Strings.txtUnexpectedError);
                });
            }
        }
    }
    validateForm = () => {
        let valid = true;
        let {isSuperAdmin} = this.state;

        let validName = this.state.name && this.state.name != "";
        if(!validName) this.setState({errName: Strings.txtErrNameRequired})
        else this.setState({errName: null})
        valid &= validName;

        let validCaloriesBurn= this.state.caloriesPerMin && this.state.caloriesPerMin != "";
        if(!validCaloriesBurn) this.setState({errCaloriesBurn: Strings.txtErrCaloriesBurn})
        else this.setState({errCaloriesBurn: null})
        valid &= validCaloriesBurn;


        return valid;
    }
    onDelete = () => {
        const { exerciseID } = this.props;
        if (window.confirm('Are you sure you wish to delete this exercise?'))  {
            this.onDeleteExercise(exerciseID) 
        }
    }
    onDeleteExercise = (id) => {
        this.props.exerciseStore.deleteExercise(id)
        .then(deleted => {
            toast(Strings.txtExerciseDeleteSuccess);
            this.props.history.go(-1);
        })
    }
    render() {
        const { isEdit } = this.props;

        return <div className="cw-default-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldExerciseID} 
                            value={this.state.exerciseID} 
                            placeholder={Strings.txtFieldExerciseID} 
                            disable />
                }

                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldExerciseName} 
                    value={this.state.name}
                    placeholder={Strings.txtFieldExerciseName} 
                    error={this.state.errName}
                    onChangeValue={(value) => {this.setState({name: value, errName: null})}}/>

                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldCalroiesPerMinute} 
                    value={this.state.caloriesPerMin}
                    placeholder={Strings.txtFieldCalroiesPerMinute} 
                    error={this.state.errCaloriesBurn}
                    onChangeValue={(value) => {this.setState({caloriesPerMin: value, errCaloriesBurn: null})}}/>
               
                 <div className="cw-row" style={{ marginTop: "23px"}}>
                    {
                        
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.exerciseStore.isLoading}
                                 onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>
                    }
                    {
                        <CButton containerStyle={{width: "136px", marginLeft: "30px"}} type="cancel" onClick={()=>{this.onDelete()}}>{Strings.txtBtnDelete}</CButton>
                    }
                    
                 </div>  


                
            </div>

        </div>
    }
}

export default inject('exerciseStore')(observer(ExerciseForm));