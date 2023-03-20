import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CTextArea } from '../../../../../components/atoms'
import { CMImagePicker } from '../../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';
import { convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';


class StepForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepID: null,
            date: null,
            step: null,
            errDate: null,
            status: null,
        };
    }


    componentDidMount() {
        const { stepID, isEdit } = this.props;
        if( isEdit && stepID ) {
            this.props.stepStore.findOneStep(stepID)
            .then(detailStep => {
                  this.setState({
                    stepID: detailStep.id,     
                    date: detailStep.date,
                    step: detailStep.step
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })  
        }
        this.props.stepStore.getTarget()
    } 

    onDelete = () => {
        const { stepID } = this.props;
        if (window.confirm('Are you sure you wish to delete this step record?'))  {
            this.onDeleteStep(stepID) 
        }
    }
    onDeleteStep = (id) => {
        this.props.stepStore.deleteStep(id)
        .then(deleted => {
            toast(Strings.txtStepDeleteSuccess);
            this.props.history.go(-1);
        })
    }

    getStatusFromValue = (step, minTarget) => {
        if(step >=minTarget) 
            return Strings.txtStatusArchieved;
        return Strings.txtStatusNonArchieved;
    }

    render() {
        const { isEdit } = this.props;
        let stepTarget =  this.props.stepStore.target ? this.props.stepStore.target.stepTarget : null;
        return <div className="cw-default-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldRecordID} 
                            value={this.state.stepID} 
                            placeholder={Strings.txtFieldStepID} 
                            disable />
                }
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldDate} 
                        value={convertDateToDisplay(this.state.date)} 
                        placeholder={Strings.txtFieldDate} 
                        disable />
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldStep} 
                        value={this.state.step} 
                        placeholder={Strings.txtFieldStep} 
                        disable />
               {
                   stepTarget &&
                   <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldStatus} 
                    value={this.getStatusFromValue(this.state.status, stepTarget)} 
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

export default inject('stepStore')(observer(StepForm));