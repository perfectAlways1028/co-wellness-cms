import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../../../components/atoms'
import { CMRadioGroup } from '../../../../../components/molecules'

import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';

const isAntiDiabeticSelect = [
    {
        id: false,
        name: Strings.txtOther
    },
    {
        id: true,
        name: Strings.txtIsAntiDiabetic
    }
]
class MedicineForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicineID: null,
            name: null,
            isAntiDiabetic: false,
            errTitle: null,
            errPayor: null,
            errImageUrl: null
        };
    }


    componentDidMount() {
        const { medicineID, isEdit } = this.props;
        if( isEdit && medicineID ) {
            this.props.medicineStore.findOneMedicine(medicineID)
            .then(detailMedicine => {
                  this.setState({
                    medicineID: detailMedicine.medicineID,                 
                    name: detailMedicine.name,
                    isAntiDiabetic: detailMedicine.isAntiDiabetic
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
            isAntiDiabetic
            } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    name,
                    isAntiDiabetic
                }

                this.props.medicineStore.createMedicine(body)
                .then(created => {
                    toast(Strings.txtMedicineCreateSuccess);
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
                    isAntiDiabetic
                }
                this.props.medicineStore.updateMedicine(this.props.medicineID, body)
                .then(updated => {
                    toast(Strings.txtMedicineUpdateSuccess);
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
        const { medicineID } = this.props;
        if (window.confirm('Are you sure you wish to delete this medicine?'))  {
            this.onDeleteMedicine(medicineID) 
        }
    }
    onDeleteMedicine = (id) => {
        this.props.medicineStore.deleteMedicine(id)
        .then(deleted => {
            toast(Strings.txtMedicineDeleteSuccess);
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
                            label={Strings.txtFieldMedicineID} 
                            value={this.state.medicineID} 
                            placeholder={Strings.txtFieldMedicineID} 
                            disable />
                }

                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldMedicineName} 
                    value={this.state.name}
                    placeholder={Strings.txtFieldMedicineName} 
                    error={this.state.errName}
                    onChangeValue={(value) => {this.setState({name: value, errName: null})}}/>

                <CMRadioGroup 
                    direction={'row'} 
                    lineCount={1}
                    numPerLine={2}
                    data={isAntiDiabeticSelect}
                    selectedItemID={this.state.isAntiDiabetic}
                    onItemSelect={(item)=>{ this.setState({isAntiDiabetic: item.id === true}) }}
                    customItemStyle={{width:'320px'}}
                />
               
                 <div className="cw-row" style={{ marginTop: "23px"}}>
                    {
                        
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.medicineStore.isLoading}
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

export default inject('medicineStore')(observer(MedicineForm));