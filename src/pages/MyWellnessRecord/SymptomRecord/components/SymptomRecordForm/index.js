import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CTextArea } from '../../../../../components/atoms'
import { CMImagePicker } from '../../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';
import { convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';


class SymptomRecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symptomRecordID: null,
            symptomID: null,
            date: null,
            description: null,
            symptoms: [],
            errSymptom: null,
            errDate: null
        };
    }


    componentDidMount() {
        const { symptomRecordID, isEdit } = this.props;
        if( isEdit && symptomRecordID ) {
            this.props.symptomRecordStore.findOneSymptomRecord(symptomRecordID)
            .then(detailSymptomRecord => {
                  this.setState({
                    symptomRecordID: detailSymptomRecord.symptomsRecordID,    
                    symptomID: detailSymptomRecord.symptomSymptomsID,
                    symptomName:  detailSymptomRecord.symptom ? detailSymptomRecord.symptom.name : "",  
                    date: detailSymptomRecord.date,
                    description: detailSymptomRecord.description
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }
 
    } 

 

    onSave = () => {
        const {  
            description,
            symptomID,
            date
            } = this.state;
        if( !this.props.isEdit ) {
    
        } else {
         
            let body = {
                description: description,
                symptomsId: symptomID + '',
                date: date,
            }
            this.props.symptomRecordStore.updateSymptomRecord(this.props.symptomRecordID, body)
            .then(updated => {
                toast(Strings.txtSymptomRecordUpdateSuccess);
            })
            .catch(err => {
                console.log("faild", err);
                toast(Strings.txtUnexpectedError);
            });
            
        }
    }

    onDelete = () => {
        const { symptomRecordID } = this.props;
        if (window.confirm('Are you sure you wish to delete this symptom?'))  {
            this.onDeleteSymptomRecord(symptomRecordID) 
        }
    }
    onDeleteSymptomRecord = (id) => {
        this.props.symptomRecordStore.deleteSymptomRecord(id)
        .then(deleted => {
            toast(Strings.txtSymptomRecordDeleteSuccess);
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
                            label={Strings.txtFieldRecordID} 
                            value={this.state.symptomRecordID} 
                            placeholder={Strings.txtFieldSymptomRecordID} 
                            disable />
                }
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldDate} 
                        value={convertDateToDisplay(this.state.date)} 
                        placeholder={Strings.txtFieldDate} 
                        disable />
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldSymptomName} 
                        value={this.state.symptomName} 
                        placeholder={Strings.txtFieldSymptomName} 
                        disable />
              
                 <CTextArea containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldNote} 
                    placeholder={Strings.txtFieldNote} 
                    value={this.state.description}
                    onChangeValue={(value) => {this.setState({description: value})}}/>

                 <div className="cw-row" style={{marginTop: '5px'}}>
                    {
                        
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.symptomRecordStore.isLoading}
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

export default inject('symptomRecordStore', 'symptomStore')(observer(SymptomRecordForm));