import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CTextArea } from '../../../../../components/atoms'
import { CMImagePicker } from '../../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';
import { convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';

class MedicationRecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicationRecordID: null,
            name: null,
            forDay: null,
        };
    }


    componentDidMount() {
        const { medicationRecordID, isEdit } = this.props;
        if( isEdit && medicationRecordID ) {
            this.props.medicationRecordStore.findOneMedicationRecord(medicationRecordID)
            .then(detailMedicationRecord => {
                  this.setState({
                    medicationRecordID: detailMedicationRecord.medicationRecordID,  
                    name: detailMedicationRecord.name,   
                    forDay: detailMedicationRecord.forDay,  
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
        } 
    } 
    
    render() {
        const { isEdit } = this.props;

        return <div className="cw-default-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldRecordID} 
                            value={this.state.medicationRecordID} 
                            placeholder={Strings.txtFieldMedicationRecordID} 
                            disable />
                }
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldDateAndTime} 
                    value={convertDatetimeToDisplay(this.state.forDay)} 
                    placeholder={Strings.txtFieldDateAndTime} 
                    disable />
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldMedicineName} 
                    value={this.state.name} 
                    placeholder={Strings.txtFieldMedicineName} 
                    disable />
    
            </div>

        </div>
    }
}

export default inject('medicationRecordStore')(observer(MedicationRecordForm));