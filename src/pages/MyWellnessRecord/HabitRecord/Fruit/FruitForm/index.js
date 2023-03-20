import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CTextArea } from '../../../../../components/atoms'
import { CMImagePicker } from '../../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';
import { convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';


class FruitForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habitRecordID: null,
            date: null,
            dailyTarget: null,
            dailyTargetValue: null,
            errDate: null,
            status: null,
        };
    }


    componentDidMount() {
        const { habitRecordID, isEdit } = this.props;
        if( isEdit && habitRecordID ) {
            this.props.habitRecordStore.findOneHabitRecord(habitRecordID)
            .then(detailHabitRecord => {
                  this.setState({
                    habitRecordID: detailHabitRecord.id,     
                    date: detailHabitRecord.date,
                    dailyTarget: detailHabitRecord.dailyTarget,
                    dailyTargetValue: detailHabitRecord.dailyTarget,
                    isTargetAchieved: detailHabitRecord.isTargetAchieved
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })  
        }
    } 

    onDelete = () => {
        const { habitRecordID } = this.props;
        if (window.confirm('Are you sure you wish to delete this habitRecord record?'))  {
            this.onDeleteHabitRecord(habitRecordID) 
        }
    }
    onDeleteHabitRecord = (id) => {
        this.props.habitRecordStore.deleteHabitRecord(id)
        .then(deleted => {
            toast(Strings.txtFruitDeleteSuccess);
            this.props.history.go(-1);
        })
    }

    getStatusFromValue = (archieved) => {
        if(archieved) 
            return Strings.txtStatusArchieved;
        return Strings.txtStatusNonArchieved;
    }

    render() {
        const { isEdit } = this.props;
        return <div className="cw-default-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldRecordID} 
                            value={this.state.habitRecordID} 
                            placeholder={Strings.txtFieldFruitID} 
                            disable />
                }
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldDate} 
                        value={convertDateToDisplay(this.state.date)} 
                        placeholder={Strings.txtFieldDate} 
                        disable />
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldFruit} 
                        value={this.state.dailyTargetValue} 
                        placeholder={Strings.txtFieldFruit} 
                        disable />
             
                   <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldStatus} 
                    value={this.getStatusFromValue(this.state.isTargetAchieved)} 
                    disable
                        />

                 <div className="cw-row" style={{ marginTop: "5px"}}>
                    <CButton containerStyle={{width: "136px"}} type="cancel" onClick={()=>{this.onDelete()}}>{Strings.txtBtnDelete}</CButton>
                 </div>  
            </div>
        </div>
    }
}

export default inject('habitRecordStore')(observer(FruitForm));