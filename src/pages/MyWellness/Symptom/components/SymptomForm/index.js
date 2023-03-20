import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../../../components/atoms'
import { CMImagePicker } from '../../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';


class SymptomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symptomID: null,
            name: null,
           
            errTitle: null,
            errPayor: null,
            errImageUrl: null
        };
    }


    componentDidMount() {
        const { symptomID, isEdit } = this.props;
        if( isEdit && symptomID ) {
            this.props.symptomStore.findOneSymptom(symptomID)
            .then(detailSymptom => {
                  this.setState({
                    symptomID: detailSymptom.symptomsID,                 
                    name: detailSymptom.name,

                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }
        
 
    } 

 

    onSave = () => {
        const {  
            name
            } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    name
                }

                this.props.symptomStore.createSymptom(body)
                .then(created => {
                    toast(Strings.txtSymptomCreateSuccess);
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
                    name
                }
                this.props.symptomStore.updateSymptom(this.props.symptomID, body)
                .then(updated => {
                    toast(Strings.txtSymptomUpdateSuccess);
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


        return valid;
    }
    onDelete = () => {
        const { symptomID } = this.props;
        if (window.confirm('Are you sure you wish to delete this symptom?'))  {
            this.onDeleteSymptom(symptomID) 
        }
    }
    onDeleteSymptom = (id) => {
        this.props.symptomStore.deleteSymptom(id)
        .then(deleted => {
            toast(Strings.txtSymptomDeleteSuccess);
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
                            label={Strings.txtFieldSymptomID} 
                            value={this.state.symptomID} 
                            placeholder={Strings.txtFieldSymptomID} 
                            disable />
                }

                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldSymptomName} 
                    value={this.state.name}
                    placeholder={Strings.txtFieldSymptomName} 
                    error={this.state.errName}
                    onChangeValue={(value) => {this.setState({name: value, errName: null})}}/>

              
               
                 <div className="cw-row" style={{ marginTop: "23px"}}>
                    {
                        
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.symptomStore.isLoading}
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

export default inject('symptomStore')(observer(SymptomForm));