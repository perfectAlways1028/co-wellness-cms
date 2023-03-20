import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../../components/atoms'
import { CMImagePicker } from '../../../../components/molecules';
import { Strings, Constants } from '../../../../constants';
import ChangePasswordModal from '../ChangePasswordModal';
import { inject, observer } from "mobx-react";
import { numberValidate, phoneNumberValidate, emailValidate } from '@helpers/validator';
import './style.scss'
import { toast } from 'react-toastify';

const statues = [
    {
        id: true,
        name: Strings.txtActive
    },
    {
        id: false,
        name: Strings.txtNonActive
    }
]




class PayorForm extends Component {
    constructor(props) {
        super(props);
        if(!props.isEdit) {
            this.state = {
                name: null,
                address: null,
                logoUrl: null,
                phoneNumber: null,
                email: null,
                packageID: null,
                status: null
            };
        }else {
            this.state = {

            }
        }
    }

    componentDidMount() {
        const { payorID, isEdit } = this.props;
        if( isEdit && payorID ) {
            this.props.payorStore.findOnePayor(payorID)
            .then(detailPayor => {
                this.setState({
                    payorIDcode: detailPayor.payorIDCode,
                    name: detailPayor.name,
                    logoUrl: detailPayor.logoUrl,
                    phoneNumber:  detailPayor.phoneNumber,
                    address: detailPayor.address,
                    email: detailPayor.email,
                    mcuPayorID: detailPayor.mcuPayorID,
                    packageID: detailPayor.packageID,
                    packageInvoiceID: detailPayor.packageInvoiceID,
                    status: true,
                    payorAdminID: detailPayor.payorAdmin && detailPayor.payorAdmin.id,
                    payorAdminName: detailPayor.payorAdmin && detailPayor.payorAdmin.user ? detailPayor.payorAdmin.user.name : null,
                    payorAdminEmail: detailPayor.payorAdmin && detailPayor.payorAdmin.user? detailPayor.payorAdmin.user.email : null,
                })
            })
            .catch(error => {
                //this.props.history.replace(Constants.error.errorUrl)
            })
     
        }
        this.props.payorStore.findMCUPayors()
        .then(foundMCUPayors=> {
            this.setState({mcuPayors: foundMCUPayors})
        })
        this.props.packageInvoiceStore.findPackageInvoiceForPayor(payorID)
        .then(foundPackageInvoices => {
            if(foundPackageInvoices) {
                this.setState({ packages : foundPackageInvoices.map(item=> {return {id: item.packageID, name: item.packageName, packageInvoiceID: item.id}})})
            }
           
        })
    } 

    onSave = () => {
        const { name, logoUrl, phoneNumber, address, email, packageID, packageInvoiceID, status, payorAdminName, payorAdminEmail, payorAdminPassword, mcuPayorID } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    name,
                    logoUrl,
                    phoneNumber,
                    address,
                    packageID,
                    packageInvoiceID,
                    email,
                    mcuPayorID,
                    active: status,
                    payorAdminName,
                    payorAdminEmail,
                    payorAdminPassword
                }

                this.props.payorStore.createPayor(body)
                .then(created => {
                    toast(Strings.txtPayorCreateSuccess);
                    this.props.history.go(-1);
                })
                .catch(err => {
                    if(err && err.message) {
                        toast(err.message);
                    } else {
                        toast(Strings.txtUnexpectedError);
                    }
                    console.log("faild", err);
                });
            }
        } else {
            if( this.validateForm() ) {
                let body = {
                    name,
                    logoUrl,
                    phoneNumber,
                    address,
                    packageID,
                    mcuPayorID,
                    packageInvoiceID,
                    email,
                    active: status,
                    payorAdminName,
                    payorAdminEmail,
                }
            
                this.props.payorStore.updatePayor(this.props.payorID, body)
                .then(updated => {
                    toast(Strings.txtPayorUpdateSuccess);
                })
                .catch(err => {
                    if(err && err.message) {
                        toast(err.message);
                    } else {
                        toast(Strings.txtUnexpectedError);
                    }
                    console.log("faild", err);
                 
                });
            }
        }
    }

    uploadImage = ( path ) => {
        this.props.payorStore.uploadImage(path, "payor")
        .then(data => {
            if(data && data.path) {
                this.setState({logoUrl: data.path});
            }
        })
    }

    validateForm = () => {
        let valid = true;

        let validName = this.state.name && this.state.name != "";
        if(!validName) this.setState({nameInvalidError: Strings.txtErrNameRequired})
        else this.setState({nameInvalidError: null})
        valid &= validName;

        let validAdminName = this.state.payorAdminName && this.state.payorAdminName != "";
        if(!validAdminName) this.setState({adminNameInvalidError: Strings.txtErrNameRequired})
        else this.setState({adminNameInvalidError: null})
        valid &= validAdminName;

        let validAdminEmail = this.state.payorAdminEmail && this.state.payorAdminEmail != "" && emailValidate(this.state.payorAdminEmail)
        if(!validAdminEmail) this.setState({adminEmailInvalidError: Strings.txtErrEmailInvalid})
        else this.setState({adminEmailInvalidError: null})
        valid &= validAdminEmail;

        if(!this.props.isEdit) {
            let validAdminPassword = this.state.payorAdminPassword && this.state.payorAdminPassword != "" && this.state.payorAdminPassword.length >= 8
            if(!validAdminPassword) this.setState({adminPasswordInvalidError: Strings.txtErrPayorPasswordInvalid})
            else this.setState({adminPasswordInvalidError: null})
            valid &= validAdminPassword;
        } 
        return valid;
    }

    onDelete = () => {
        const { payorID } = this.props;
        if (window.confirm('Are you sure you wish to delete this payor?'))  {
            this.onDeletePayor(payorID) 
        }
    }
    onDeletePayor = (id) => {
        this.props.payorStore.deletePayor(id)
        .then(deleted => {
            toast(Strings.txtPayorDeleteSuccess);
            this.props.history.go(-1);
        })
    }

    render() {
        console.log("packages", this.state.packages);
        const { isEdit } = this.props;
        const { payorAdminID, mcuPayors} = this.state;
        console.log("mcuPayors", mcuPayors);
        return <div className="cw-employee-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldPayorID} 
                            value={this.state.payorIDcode} 
                            placeholder={Strings.txtFieldPayorID} 
                            disable />
                }
                <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldPayorName} 
                            value={this.state.name}
                            error={this.state.nameInvalidError}
                            onChangeValue={(value) => {this.setState({name: value})}}/>
                <CMImagePicker 
                    label={Strings.txtFieldLogo}
                    buttonLabel={Strings.txtBtnBrowse}
                    description={Strings.txtImageSizeDesc}
                    imageUrl={this.state.logoUrl}
                    isUploading={this.props.payorStore.isLoadingImage}
                    onClearImage={()=>{this.setState({logoUrl: null})}}
                    onSelectImage={(imgURL, file)=> {
                        this.uploadImage(file);
                    }}
                    isRemoteUrlOnly
                />
                <CTextInput containerStyle={{width: '320px', marginTop: '23px'}} 
                            label={Strings.txtFieldPhoneNumber} 
                            value={this.state.phoneNumber} 
                            placeholder={Strings.txtFieldPhoneNumber} 
                            onChangeValue={(value) => {this.setState({phoneNumber: value})}}/>
                <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldAddress} 
                            value={this.state.address} 
                            placeholder={Strings.txtFieldAddress}
                            onChangeValue={(value) => {this.setState({address: value})}}/>
                <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldEMail} 
                            value={this.state.email} 
                            placeholder={Strings.txtFieldEMail} 
                            onChangeValue={(value) => {this.setState({email: value})}}/>   
                {
                    this.props.isEdit &&
                    <CSelectInput  containerStyle={{width: '320px'}} 
                    data={this.state.packages} 
                    label={Strings.txtFieldPackage} 
                    selectedItemID={this.state.packageID}
                    onItemSelected={(item)=>{this.setState({packageID: item.id, packageInvoiceID: item.packageInvoiceID})}} placeholder={Strings.txtFieldPackage}/>
                }
               

                <CSelectInput  containerStyle={{width: '320px'}} 
                    data={mcuPayors} 
                    label={Strings.txtFieldMCUPayor} 
                    selectedItemID={this.state.mcuPayorID}
                    error={this.state.mcuPayorErr}
                    onItemSelected={(item)=>{this.setState({mcuPayorID: item.id}, ()=>{
                        this.setState({mcuPayorErr: null})
                    })}} placeholder={Strings.txtFieldMCUPayor}/>
      
                <CSelectInput  containerStyle={{width: '320px', marginBottom: '16px'}} 
                            data={statues} 
                            label={Strings.txtFieldStatus} 
                            selectedItemID={this.state.status}
                            onItemSelected={(item)=>{this.setState({status: item.id})}} placeholder={Strings.txtFieldStatus}/>
                 
                 <div className="cw-payor-admin-title">{Strings.txtPayorAdmin}</div>
                 <CTextInput containerStyle={{width: '320px', marginTop: '16px'}} 
                            label={Strings.txtFieldAdminUsername} 
                            value={this.state.payorAdminName} 
                            placeholder={Strings.txtFieldAdminUsername} 
                            error={this.state.adminNameInvalidError}
                
                            onChangeValue={(value) => {this.setState({payorAdminName: value})}}/>   
                <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldEMail} 
                            value={this.state.payorAdminEmail} 
                            placeholder={Strings.txtFieldEMail} 
                            autocomplete={"off"}
                            error={this.state.adminEmailInvalidError}
                            onChangeValue={(value) => {this.setState({payorAdminEmail: value})}}/>  
                {
                    !isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtPassword}
                        value={this.state.payorAdminPassword} 
                        placeholder={Strings.txtPassword} 
                        error={this.state.adminPasswordInvalidError}
                        autocomplete={"off"}
                        type={'password'}
                        onChangeValue={(value) => {this.setState({payorAdminPassword: value})}}/>       
                }   
          
                {
                    isEdit && payorAdminID &&
                    <ChangePasswordModal payorAdminID={payorAdminID}/>
                }
               
                 <div className="cw-row" style={{ marginTop: "23px"}}>
                    <CButton containerStyle={{width: "136px"}} 
                             isLoading={this.props.payorStore.isLoading} 
                             onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>
                    {
                        isEdit && 
                        <CButton containerStyle={{width: "136px", marginLeft: "30px"}} onClick={()=>{this.onDelete()}} type="cancel">{Strings.txtBtnDelete}</CButton>
                    }
                    
                 </div>  


                
            </div>

        </div>
    }
}

export default inject('payorStore', 'packageStore', 'packageInvoiceStore')(observer(PayorForm));
