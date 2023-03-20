import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CTextArea } from '../../../../../components/atoms'
import { CMImagePicker } from '../../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';


class WeightRecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weightRecordID: null,
            date: null,
            weight: null,
            errDate: null
        };
    }


    componentDidMount() {
        const { weightRecordID, isEdit } = this.props;
        if( isEdit && weightRecordID ) {
            this.props.weightRecordStore.findOneWeightRecord(weightRecordID)
            .then(detailWeightRecord => {
                  this.setState({
                    weightRecordID: detailWeightRecord.weightRecordID,     
                    date: new Date(detailWeightRecord.date),
                    weight: detailWeightRecord.weight
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }
 
    } 

 

    onSave = () => {
        const {  
            date,
            weight
            } = this.state;
        if( !this.props.isEdit ) {
    
        } else {
            if( this.validateForm() ) {
                let body = {
                    date: date,
                    weight

                }
                console.log("body", body);
                this.props.weightRecordStore.updateWeightRecord(this.props.weightRecordID, body)
                .then(updated => {
                    toast(Strings.txtWeightRecordUpdateSuccess);
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

        let validDate = this.state.date && this.state.date != "";
        if(!validDate) this.setState({errDate: Strings.txtErrDate})
        else this.setState({errDate: null})
        valid &= validDate

        return valid;
    }
    onDelete = () => {
        const { weightRecordID } = this.props;
        if (window.confirm('Are you sure you wish to delete this weight record?'))  {
            this.onDeleteWeightRecord(weightRecordID) 
        }
    }
    onDeleteWeightRecord = (id) => {
        this.props.weightRecordStore.deleteWeightRecord(id)
        .then(deleted => {
            toast(Strings.txtWeightRecordDeleteSuccess);
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
                            value={this.state.weightRecordID} 
                            placeholder={Strings.txtFieldWeightRecordID} 
                            disable />
                }

                <CDatePicker containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldDate} 
                        selected={this.state.date} 
                        error={this.state.errDate}
                        placeholderText={Strings.txtFieldDate} 
                        onChange={(value) => {this.setState({date: value, errDate: null}); }}/>
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldWeight} 
                        value={this.state.weight} 
                        placeholder={Strings.txtFieldWeight} 
                        error={this.state.errWeight}
                        onChange={(value) => {this.setState({weight: value, errWeight: null}); }}/>
                         
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldBMI} 
                    value={this.state.bmi} 
                    disable
                        />
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldStatus} 
                    value={this.state.status} 
                    disable
                        />
              

                 <div className="cw-row" style={{ marginTop: "5px"}}>
                    {
                        
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.weightRecordStore.isLoading}
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

export default inject('weightRecordStore')(observer(WeightRecordForm));