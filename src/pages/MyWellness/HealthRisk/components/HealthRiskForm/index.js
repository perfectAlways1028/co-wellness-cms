import React, { Component } from 'react';
import {CButton, CTextArea, CTextInput,} from '../../../../../components/atoms'
import { CMRadioGroup } from '../../../../../components/molecules'

import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";
import { numberValidate } from '@helpers/validator';
import { toast } from 'react-toastify';

class HealthRiskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            healthRiskID: null,
            name: null,
            caloriesPerMin: null,
            errTitle: null,
            errPayor: null,
            errImageUrl: null
        };
    }


    componentDidMount() {
        const { healthRiskID, isEdit } = this.props;
        if( isEdit && healthRiskID ) {
            this.props.healthRiskStore.findOneHealthRisk(healthRiskID)
            .then(detailHealthRisk => {
                  this.setState({
                    healthRiskIDCode: detailHealthRisk.healthRiskIDCode,                 
                    name: detailHealthRisk.name,
                    nameLangInd: detailHealthRisk.nameLangInd,
                    shortDescription: detailHealthRisk.shortDescription,
                    shortDescriptionLangInd: detailHealthRisk.shortDescriptionLangInd,
                    description: detailHealthRisk.description,
                    descriptionLangInd: detailHealthRisk.descriptionLangInd,
                    sort: detailHealthRisk.sort
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
            nameLangInd,
            shortDescription,
            shortDescriptionLangInd,
            description,
            descriptionLangInd,
            sort
            } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    name,
                    nameLangInd,
                    shortDescription,
                    shortDescriptionLangInd,
                    description,
                    descriptionLangInd,
                    sort
                }

                this.props.healthRiskStore.createHealthRisk(body)
                .then(created => {
                    toast(Strings.txtHealthRiskCreateSuccess);
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
                    nameLangInd,
                    shortDescription,
                    shortDescriptionLangInd,
                    description,
                    descriptionLangInd,
                    sort
                }
                this.props.healthRiskStore.updateHealthRisk(this.props.healthRiskID, body)
                .then(updated => {
                    toast(Strings.txtHealthRiskUpdateSuccess);
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
        const { healthRiskID } = this.props;
        if (window.confirm('Are you sure you wish to delete this health risk?'))  {
            this.onDeleteHealthRisk(healthRiskID) 
        }
    }
    onDeleteHealthRisk = (id) => {
        this.props.healthRiskStore.deleteHealthRisk(id)
        .then(deleted => {
            toast(Strings.txtHealthRiskDeleteSuccess);
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
                            label={Strings.txtFieldHealthRiskID} 
                            value={this.state.healthRiskIDCode} 
                            placeholder={Strings.txtFieldHealthRiskID} 
                            disable />
                }

                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldHealthRiskName} 
                    value={this.state.name}
                    placeholder={Strings.txtFieldHealthRiskName} 
                    error={this.state.errName}
                    onChangeValue={(value) => {this.setState({name: value, errName: null})}}/>
                
                <CTextArea containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldHealthRiskShortDescription} 
                    value={this.state.shortDescription}
                    placeholder={Strings.txtFieldHealthRiskShortDescription} 
                    onChangeValue={(value) => {this.setState({shortDescription: value})}}/>
                
                <CTextArea containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldHealthRiskDescription} 
                    value={this.state.description}
                    placeholder={Strings.txtFieldHealthRiskDescription} 
                    onChangeValue={(value) => {this.setState({description: value})}}/>
                
                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldHealthRiskNameInd} 
                    value={this.state.nameLangInd}
                    placeholder={Strings.txtFieldHealthRiskNameInd} 
                    onChangeValue={(value) => {this.setState({nameLangInd: value, errName: null})}}/>
                
                <CTextArea containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldHealthRiskShortDescriptionInd} 
                    value={this.state.shortDescriptionLangInd}
                    placeholder={Strings.txtFieldHealthRiskShortDescriptionInd} 
                    onChangeValue={(value) => {this.setState({shortDescriptionLangInd: value})}}/>
                
                <CTextArea containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldHealthRiskDescriptionInd} 
                    value={this.state.descriptionLangInd}
                    placeholder={Strings.txtFieldHealthRiskDescriptionInd} 
                    onChangeValue={(value) => {this.setState({descriptionLangInd: value})}}/>

                <CTextInput containerStyle={{width: '320px', marginBottom: '16px', marginTop: '4px'}} 
                    label={Strings.txtFieldSort} 
                    value={this.state.sort}
                    placeholder={Strings.txtFieldSort} 
                    onChangeValue={(value) => {this.setState({sort: value})}}/>
              
               
                 <div className="cw-row" style={{ marginTop: "23px"}}>
                    {
                        
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.healthRiskStore.isLoading}
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

export default inject('healthRiskStore')(observer(HealthRiskForm));