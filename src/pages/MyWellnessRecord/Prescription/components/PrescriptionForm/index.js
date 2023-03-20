import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CTextArea } from '../../../../../components/atoms'
import { CMImagePicker } from '../../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';

import { convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';


class PrescriptionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescriptionID: null,
            medicineID: null,
            endDate: null,
            medicines: [],
            errSymptom: null,
            errDate: null,
            medicationTimeArr: [],
        };
    }


    componentDidMount() {
        const { prescriptionID, isEdit } = this.props;
        if( isEdit && prescriptionID ) {
            this.props.prescriptionStore.findOnePrescription(prescriptionID)
            .then(detailPrescription => {
                  this.setState({
                    prescriptionID: detailPrescription.prescriptionID,    
                    medicineID:  detailPrescription.medicineMedicineID,  
                    medicineName: detailPrescription.medicine? detailPrescription.medicine.name : "",
                    dosage: detailPrescription.dosage,
                    servingSize: detailPrescription.servingSize,
                    unit: detailPrescription.unit,
                    notes: detailPrescription.notes,
                    status: detailPrescription.status,
                    doctorName: detailPrescription.doctorName,
                    dailyFrequency: detailPrescription.dailyFrequency,
                    medicationTime: detailPrescription.medicationTime,
                    medicationTimeArr: this.getMedicationTimes(detailPrescription.medicationTime),
                    createdAt: detailPrescription.createdAt,
                    endDate: detailPrescription.endDate
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }
 
    } 

    getMedicationTimes = (str) => {
        if(!str) return [];
        var medicationTimeStr = str.replace("[", "");
        medicationTimeStr = medicationTimeStr.replace("]", "");
        medicationTimeStr = medicationTimeStr.replace(/, /g, ",");
        medicationTimeStr = medicationTimeStr.replace(/"/g, "");
        let medicationTimes = [];
        medicationTimes = medicationTimeStr.split(",");
        console.log("medicationTimes", medicationTimes);
        return medicationTimes;
    }

    onSave = () => {
        const {  
            note
            } = this.state;
        if( !this.props.isEdit ) {
    
        } else {
            if( this.validateForm() ) {
                let body = {
                    note
                }
    
                this.props.prescriptionStore.updatePrescription(this.props.prescriptionID, body)
                .then(updated => {
                    toast(Strings.txtPrescriptionUpdateSuccess);
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
        return valid;
    }
    onDelete = () => {
        const { prescriptionID } = this.props;
        if (window.confirm('Are you sure you wish to delete this prescription?'))  {
            this.onDeletePrescription(prescriptionID) 
        }
    }
    onDeletePrescription = (id) => {
        this.props.prescriptionStore.deletePrescription(id)
        .then(deleted => {
            toast(Strings.txtPrescriptionDeleteSuccess);
            this.props.history.go(-1);
        })
    }
    
    getMedicationTimeTitle = (index) => {
        return Strings.txtFieldMedicationTime+ " "+(index+1)
    }
    renderMedicationTimes = () => {
       let medicationTimes = this.state.medicationTimeArr;
       console.log("medicationTimes render", medicationTimes);
       if(!medicationTimes) return [];
       let resultArr = [];
       for(let index = 0; index < medicationTimes.length; index+=2) {
            let row = <div className="cw-row" style={{marginTop: '23px'}}>
            <CTextInput containerStyle={{width: '320px'}} 
                    label={this.getMedicationTimeTitle(index)} 
                    value={medicationTimes[index]}
                    disable />
            {   
                (index +1) < medicationTimes.length &&
                <CTextInput containerStyle={{width: '320px', marginLeft: '30px'}} 
                label={this.getMedicationTimeTitle(index+1)} 
                value={medicationTimes[index+1]} 
                disable />
            }

        </div>
        resultArr.push(row);
       }
       return resultArr;
    }
    render() {
        const { isEdit } = this.props;

        return <div className="cw-default-form-container"> 
            <div className="form-container"> 
                <div className="cw-row">
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldPrescriptionID} 
                            value={this.state.prescriptionID} 
                            placeholder={Strings.txtFieldPrescriptionID} 
                            disable />

                    <CTextInput containerStyle={{width: '320px', marginLeft: '30px'}} 
                            label={Strings.txtFieldMedicine} 
                            value={this.state.medicineName} 
                            placeholder={Strings.txtFieldMedicine} 
                            disable />
                </div>

                <div className="cw-row">
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldPrescriptionID} 
                            value={this.state.prescriptionID} 
                            placeholder={Strings.txtFieldPrescriptionID} 
                            disable />

                    <CTextInput containerStyle={{width: '320px', marginLeft: '30px'}} 
                            label={Strings.txtFieldMedicine} 
                            value={this.state.prescriptionID} 
                            placeholder={Strings.txtFieldMedicine} 
                            disable />
                </div>

                <div className="cw-row">
                    <CTextInput containerStyle={{width: '150px'}} 
                            label={Strings.txtFieldDosage} 
                            value={this.state.dosage} 
                            placeholder={Strings.txtFieldDosage} 
                            disable />

                    <CTextInput containerStyle={{width: '150px', marginLeft: '20px'}} 
                            value={this.state.unit} 
                            placeholder={Strings.txtFieldUnit} 
                            disable />

                    <CTextInput containerStyle={{width: '320px', marginLeft: '30px'}} 
                        label={Strings.txtFieldAssignBy} 
                        value={this.state.doctorName} 
                        placeholder={Strings.txtFieldAssignBy} 
                        disable />
                </div>
                <div className="cw-row">
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldAssignedDate} 
                            value={convertDateToDisplay(this.state.createdAt)} 
                            placeholder={Strings.txtFieldAssignedDate} 
                            disable />

                    <CTextInput containerStyle={{width: '320px', marginLeft: '30px'}} 
                            label={Strings.txtFieldEndDate} 
                            value={convertDateToDisplay(this.state.endDate)} 
                            placeholder={Strings.txtFieldEndDate} 
                            disable />
                </div>
                <div className="cw-default-form-sub-small-section">{Strings.txtSectionFrequency}</div>
                <div className="cw-row" style={{marginTop: '23px'}}>
                    <CTextInput containerStyle={{width: '150px'}} 
                            label={Strings.txtFieldDailyFrequency} 
                            value={this.state.dailyFrequency} 
                            placeholder={Strings.txtFieldDailyFrequency} 
                            disable />

                    <CTextInput containerStyle={{width: '150px', marginLeft: '20px'}} 
                             label={Strings.txtFieldServings} 
                            value={this.state.servingSize} 
                            placeholder={Strings.txtFieldServings} 
                            disable />
                </div>

                <div className="cw-default-form-sub-small-section" style={{marginTop: '5px'}}>{Strings.txtSectionMedicationTime}</div>
                {this.renderMedicationTimes()}

                <CTextArea containerStyle={{width: '320px', marginTop: '23px'}} 
                    label={Strings.txtFieldNote} 
                    placeholder={Strings.txtFieldNote} 
                    value={this.state.note}
                    onChangeValue={(value) => {this.setState({note: value})}}/>

                 <div className="cw-row" style={{ marginTop: "23px"}}>
                    {
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.prescriptionStore.isLoading}
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

export default inject('prescriptionStore')(observer(PrescriptionForm));