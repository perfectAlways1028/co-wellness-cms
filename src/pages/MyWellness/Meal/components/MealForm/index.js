import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../../../components/atoms'
import { CMRadioGroup } from '../../../../../components/molecules'

import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";
import { numberValidate } from '@helpers/validator';
import { toast } from 'react-toastify';

class MealForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mealID: null,
            name: null,
            calories: null,
            servingSize: null,
            gram: null,
            carb: null,
            protein: null,
            fat: null,

        };
    }


    componentDidMount() {
        const { mealID, isEdit } = this.props;
        if( isEdit && mealID ) {
            this.props.mealStore.findOneMeal(mealID)
            .then(detailMeal => {
                  this.setState({
                    mealID: detailMeal.mealID,                 
                    name: detailMeal.name,
                    calories: detailMeal.calories,
                    servingSize: detailMeal.servingSize,
                    gram: detailMeal.gram,
                    carb: detailMeal.carb,
                    protein: detailMeal.protein,
                    fat: detailMeal.fat,
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
            calories,
            servingSize,
            gram,
            carb,
            protein,
            fat
            } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    name,
                    calories,
                    servingSize,
                    gram,
                    carb,
                    protein,
                    fat
                }

                this.props.mealStore.createMeal(body)
                .then(created => {
                    toast(Strings.txtMealCreateSuccess);
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
                    calories,
                    servingSize,
                    gram,
                    carb,
                    protein,
                    fat
                }
                this.props.mealStore.updateMeal(this.props.mealID, body)
                .then(updated => {
                    toast(Strings.txtMealUpdateSuccess);
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

        let validCalories = this.state.calories && this.state.calories != "" && numberValidate(this.state.calories);
        if(!validCalories) this.setState({errCalories: Strings.txtErrCalories})
        else this.setState({errCalories: null})
        valid &= validCalories;
        
        let validServingSize = this.state.servingSize && this.state.servingSize != "";
        if(!validServingSize) this.setState({errServingSize: Strings.txtErrServingSize})
        else this.setState({errServingSize: null})
        valid &= validServingSize;

        let validGram = this.state.gram && this.state.gram != "" && numberValidate(this.state.gram);
        if(!validGram) this.setState({errGram: Strings.txtErrGram})
        else this.setState({errGram: null})
        valid &= validGram;

        let validCarb = this.state.carb && this.state.carb != "" && numberValidate(this.state.carb);
        if(!validCarb) this.setState({errCarb: Strings.txtErrCarb})
        else this.setState({errCarb: null})
        valid &= validCarb;

        let validProtein = this.state.protein && this.state.protein != "" && numberValidate(this.state.protein);
        if(!validProtein) this.setState({errProtein: Strings.txtErrProtein})
        else this.setState({errProtein: null})
        valid &= validProtein;

        let validFat = this.state.fat && this.state.fat != "" && numberValidate(this.state.fat);
        if(!validFat) this.setState({errFat: Strings.txtErrFat})
        else this.setState({errFat: null})
        valid &= validFat;


        return valid;
    }
    onDelete = () => {
        const { mealID } = this.props;
        if (window.confirm('Are you sure you wish to delete this meal?'))  {
            this.onDeleteMeal(mealID) 
        }
    }
    onDeleteMeal = (id) => {
        this.props.mealStore.deleteMeal(id)
        .then(deleted => {
            toast(Strings.txtMealDeleteSuccess);
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
                            label={Strings.txtFieldMealID} 
                            value={this.state.mealID} 
                            placeholder={Strings.txtFieldMealID} 
                            disable />
                }

                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldMealName} 
                    value={this.state.name}
                    placeholder={Strings.txtFieldMealName} 
                    error={this.state.errName}
                    onChangeValue={(value) => {this.setState({name: value, errName: null})}}/>
                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldCalories} 
                    value={this.state.calories}
                    placeholder={Strings.txtFieldCalories} 
                    error={this.state.errCalories}
                    onChangeValue={(value) => {this.setState({calories: value, errCalories: null})}}/>
                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldServingSize} 
                    value={this.state.servingSize}
                    placeholder={Strings.txtFieldServingSize} 
                    error={this.state.errServingSize}
                    onChangeValue={(value) => {this.setState({servingSize: value, errServingSize: null})}}/>
                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldGram} 
                    value={this.state.gram}
                    placeholder={Strings.txtFieldGram} 
                    error={this.state.errGram}
                    onChangeValue={(value) => {this.setState({gram: value, errGram: null})}}/>
                
                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldCarb} 
                    value={this.state.carb}
                    placeholder={Strings.txtFieldCarb} 
                    error={this.state.errCarb}
                    onChangeValue={(value) => {this.setState({carb: value, errCarb: null})}}/>

                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldProtein} 
                    value={this.state.protein}
                    placeholder={Strings.txtFieldProtein} 
                    error={this.state.errProtein}
                    onChangeValue={(value) => {this.setState({protein: value, errProtein: null})}}/>
                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldFat} 
                    value={this.state.fat}
                    placeholder={Strings.txtFieldFat} 
                    error={this.state.errFat}
                    onChangeValue={(value) => {this.setState({fat: value, errFat: null})}}/>
                 <div className="cw-row" style={{ marginTop: "23px"}}>
                    {
                        
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.mealStore.isLoading}
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

export default inject('mealStore')(observer(MealForm));