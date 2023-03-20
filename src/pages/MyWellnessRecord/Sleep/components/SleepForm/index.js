import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CTextArea } from '../../../../../components/atoms'
import { CMImagePicker } from '../../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';
import { convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';


class SleepForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sleepID: null,
            date: null,
            sleep: null,
            errDate: null,
            status: null,
        };
    }


    componentDidMount() {
        const { sleepID, isEdit } = this.props;
        if( isEdit && sleepID ) {
            this.props.sleepStore.findOneSleep(sleepID)
            .then(detailSleep => {
                  this.setState({
                    sleepID: detailSleep.id,     
                    date: detailSleep.date,
                    sleep: detailSleep.sleep
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })  
        }
        this.props.sleepStore.getTarget()
    } 

    onDelete = () => {
        const { sleepID } = this.props;
        if (window.confirm('Are you sure you wish to delete this sleep record?'))  {
            this.onDeleteSleep(sleepID) 
        }
    }
    onDeleteSleep = (id) => {
        this.props.sleepStore.deleteSleep(id)
        .then(deleted => {
            toast(Strings.txtSleepDeleteSuccess);
            this.props.history.go(-1);
        })
    }

    getStatusFromValue = (sleep, minTarget) => {
        if(sleep >=minTarget) 
            return Strings.txtStatusArchieved;
        return Strings.txtStatusNonArchieved;
    }

    render() {
        const { isEdit } = this.props;
        let sleepTarget =  this.props.sleepStore.target ? this.props.sleepStore.target.sleepTarget : null;
        return <div className="cw-default-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldRecordID} 
                            value={this.state.sleepID} 
                            placeholder={Strings.txtFieldSleepID} 
                            disable />
                }
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldDate} 
                        value={convertDateToDisplay(this.state.date)} 
                        placeholder={Strings.txtFieldDate} 
                        disable />
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldSleepDuration} 
                        value={this.state.sleep} 
                        placeholder={Strings.txtFieldSleep} 
                        disable />
               {
                   sleepTarget &&
                   <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldStatus} 
                    value={this.getStatusFromValue(this.state.status, sleepTarget)} 
                    disable
                        />
               }
            

                 <div className="cw-row" style={{ marginTop: "5px"}}>
                    <CButton containerStyle={{width: "136px"}} type="cancel" onClick={()=>{this.onDelete()}}>{Strings.txtBtnDelete}</CButton>
                 </div>  
            </div>
        </div>
    }
}

export default inject('sleepStore')(observer(SleepForm));