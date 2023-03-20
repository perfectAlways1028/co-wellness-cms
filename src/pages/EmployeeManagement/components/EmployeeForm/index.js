import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CPhoneNumberInput, CDatePicker } from '../../../../components/atoms'
import { CMImagePicker } from '../../../../components/molecules';

import { Strings, Constants } from '../../../../constants';
import { inject, observer } from "mobx-react";
import { isValidPhoneNumber } from 'react-phone-number-input'
import { numberValidate, emailValidate } from '@helpers/validator';
import { convertDateForDB, convertDateForLocale, convertDatetimeToDisplay } from '@helpers/dateHelper';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';
import moment from 'moment';
import './style.scss'
import { toast } from 'react-toastify';


class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        const role = getRole();
        let isSuperAdmin = role == 'superadmin'
        if(props.isEdit) {
            this.state = {
                isSuperAdmin: isSuperAdmin,
                jobs: []
            };
        } else {
            this.state = {
                employeeIDCode: null,
                payorName: null,
                name: null,
                jobID: null,
                phoneNumber: null,
                countryCode: null,
                email: null,
                packageName: null,
                imageUrl: null,
                gender: null,
                departmentID: null,
                birthday: null,
                isSuperAdmin: isSuperAdmin, 
                jobs: [],
                departments: []
            };
        }
    
    }
    validateForm = () => {
        let valid = true;
        let {isSuperAdmin} = this.state;
        
        let validEmployeeIDCode = this.state.employeeIDCode && this.state.employeeIDCode != "" 
        if(!validEmployeeIDCode) this.setState({errEmployeeIDCode: Strings.txtErrEmployeeIDCode})
        else this.setState({errEmployeeIDCode: null})
        valid &= validEmployeeIDCode;

        let validName = this.state.name && this.state.name != "";
        if(!validName) this.setState({errName: Strings.txtErrNameRequired})
        else this.setState({errName: null})
        valid &= validName;
        if(isSuperAdmin) {
            let validPayor = this.state.payorID && this.state.payorID != "";
            if(!validPayor) this.setState({errPayor: Strings.txtErrPayorSelect})
            else this.setState({errPayor: null})
            valid &= validPayor;
        }
        let validPhoneNumber = this.state.phoneNumber && this.state.phoneNumber != "" && isValidPhoneNumber(this.state.phoneNumber);
        if(!validPhoneNumber) this.setState({errPhoneNumber: Strings.txtErrPhoneNumberInvalid})
        else this.setState({errPhoneNumber: null})
        valid &= validPhoneNumber;

        let validBirthday = this.state.birthday && this.state.birthday != "";
        if(!validBirthday) this.setState({errBirthday: Strings.txtErrBirthday})
        else this.setState({errBirthday: null})
        valid &= validBirthday;

        let validDepartment = this.state.departmentID && this.state.departmentID != "";
        if(!validDepartment) this.setState({errDepartment: Strings.txtErrDepartment})
        else this.setState({errDepartment: null})
        valid &= validDepartment;

        let validEmail = this.state.email && this.state.email != "" && emailValidate(this.state.email);
        if(!validEmail) this.setState({errEmail: Strings.txtErrEmailInvalid})
        else this.setState({errEmail: null})
        valid &= validEmail;

        return valid;
    }

    componentDidMount() {
        const { employeeID, isEdit } = this.props;
        if( isEdit && employeeID ) {
            this.props.employeeStore.findOneEmployee(employeeID)
            .then(detailEmployee => {
                this.setState({
                    employeeIDCode: detailEmployee.employeeIDCode,
                    payorName: detailEmployee.payor ? detailEmployee.payor.name || "" : "",
                    payorID: detailEmployee.payorID,
                    name: detailEmployee.user ? detailEmployee.user.name || "" : "",
                    jobID: detailEmployee.user.jobID,
                    departmentID: detailEmployee.user.departmentID,
                    gender: detailEmployee.user.gender,
                    phoneNumber: detailEmployee.user.phoneNumber,
                    countryCode: detailEmployee.user.countryCode,
                    email: detailEmployee.user.email,
                    birthday: new Date(detailEmployee.user.birthday),
                    packageName: detailEmployee.package ? detailEmployee.package.name || "" : "",
                    imageUrl: detailEmployee.user.imageUrl
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }
        if(this.state.isSuperAdmin) {
            this.props.payorStore.findAllPayors();
        }  else {
            this.props.jobStore.findAllJobs()
            .then(jobs => {
                this.setState({jobs: jobs})
            })
            this.props.departmentStore.findAllDepartments()
            .then(departments => {
                this.setState({departments: departments})
            })
        }
 
    } 

    fetchInfosForPayor = (payorID) => {
        if(!payorID) return;
        this.props.jobStore.findAllJobs({payorID})
        .then(jobs => {
            this.setState({jobs: jobs})
        })
        this.props.departmentStore.findAllDepartments({payorID})
        .then(departments => {
            this.setState({departments: departments})
        })
    }

    onSave = () => {
        const { employeeIDCode, name, payorID, jobID, phoneNumber, email, imageUrl, birthday, countryCode, gender, departmentID } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    employeeIDCode,
                    name,
                    gender,
                    payorID,
                    jobID,
                    departmentID,
                    phoneNumber,
                    email,
                    birthday,
                    imageUrl,
                    countryCode
                }

                this.props.employeeStore.createEmployee(body)
                .then(created => {
                    toast(Strings.txtEmployeeCreateSuccess);
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
                    payorID,
                    jobID,
                    phoneNumber,
                    email,
                    birthday,
                    imageUrl,
                    countryCode,
                    gender,
                    departmentID
                }
           
                this.props.employeeStore.updateEmployee(this.props.employeeID, body)
                .then(updated => {
                    toast(Strings.txtEmployeeUpdateSuccess);
                })
                .catch(err => {
                    console.log("faild", err);
                    toast(Strings.txtUnexpectedError);
                });
            }
        }
    }

    uploadImage = ( path ) => {
        this.props.employeeStore.uploadImage(path, "employee")
        .then(data => {
            if(data && data.path) {
                this.setState({imageUrl: data.path});
            }
        })
    }

    onDelete = () => {
        const { employeeID } = this.props;
        if (window.confirm('Are you sure you wish to delete this employee?'))  {
            this.onDeleteEmployee(employeeID) 
        }
    }
    onDeleteEmployee = (id) => {
        this.props.employeeStore.deleteEmployee(id)
        .then(deleted => {
            toast(Strings.txtEmployeeDeleteSuccess);
            this.props.history.go(-1);
        })
    }
    getInitialDob = () => {
        return moment(new Date()).subtract(30, 'year').toDate();
    }

    render() {
        const { isEdit } = this.props;
        const { isSuperAdmin } = this.state;
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.USER_MANAGEMENT, Constants.PAGE_PERMISSION.CREATE);
        const permissionUpdate = checkPermissionAllowed(Constants.PAGE.USER_MANAGEMENT, Constants.PAGE_PERMISSION.UPDATE);
        const permissionDelete = checkPermissionAllowed(Constants.PAGE.USER_MANAGEMENT, Constants.PAGE_PERMISSION.DELETE);
        const payorName = this.props.appStore.payor ? this.props.appStore.payor.name : "";
        
        const payors = this.props.payorStore.allPayors || [];
        return <div className="cw-employee-form-container"> 
            <div className="form-container">
                <CMImagePicker 
                    label={Strings.txtProfilePicture}
                    buttonLabel={Strings.txtBtnBrowse}
                    description={Strings.txtImageSizeDesc}
                    imageUrl={this.state.imageUrl}
                    isUploading={this.props.employeeStore.isLoadingImage}
                    onClearImage={()=>{this.setState({imageUrl: null})}}
                    onSelectImage={(imgURL, file)=> {
                        this.uploadImage(file);
                    }}
                    isRemoteUrlOnly
                />
                <div className="cw-row" style={{marginTop: '16px'}}>
                    <CTextInput containerStyle={{width: '320px'}} 
                                label={Strings.txtFieldEmployeeID} 
                                value={this.state.employeeIDCode} 
                                error={this.state.errEmployeeIDCode}
                                placeholder={Strings.txtFieldEmployeeID} 
                                disable={isEdit}
                                onChangeValue={(value) => {this.setState({employeeIDCode: value, errEmployeeIDCode: null})}}/>
                    {
                        isSuperAdmin ?
                        <CSelectInput  containerStyle={{width: '320px', marginLeft: '30px'}} 
                        data={payors} 
                        label={Strings.txtFieldPayor} 
                        error={this.state.errPayor}
                        selectedItemID={this.state.payorID}
                        onItemSelected={(item)=>{ 
                            this.fetchInfosForPayor(item.id); 
                            this.setState({payorID: item.id, errPayor: null})
                        }} placeholder={Strings.txtFieldPayor}/>
                        :
                        <CTextInput containerStyle={{width: '320px', marginLeft: '30px'}} 
                        label={Strings.txtFieldPayorName} 
                        value={payorName} 
                        placeholder={Strings.txtFieldPayorName} 
                        disable
                        />
                    }
               
                             
                </div>
                <div className="cw-row">
                <CTextInput containerStyle={{width: '320px'}} 
                                label={Strings.txtFieldName} 
                                value={this.state.name} 
                                error={this.state.errName}
                                placeholder={Strings.txtFieldName} 
                                onChangeValue={(value) => {this.setState({name: value, errName: null})}}/>
                 
                 <CDatePicker containerStyle={{width: '320px', marginLeft: '30px'}} 
                                label={Strings.txtFieldDateOfBirth} 
                                selected={this.state.birthday} 
                                error={this.state.errBirthday}
                                info={Strings.txtFieldDateOfBirthInfo}
                                placeholderText={Strings.txtFieldDateOfBirth} 
                                onChange={(value) => {this.setState({birthday: value, errBirthday: null}); console.log("birthday",value)}}/>
                 
                 </div>  
                 <div className="cw-row">
                      <CPhoneNumberInput containerStyle={{width: '320px'}} 
                                label={Strings.txtFieldPhoneNumber} 
                                value={this.state.phoneNumber} 
                                error={this.state.errPhoneNumber}
                                placeholder={Strings.txtFieldPhoneNumber} 
                                onChangeValue={(value, countryCode) => {this.setState({phoneNumber: value, countryCode: countryCode ? '+'+countryCode : null}, ()=> {
                              
                                        this.setState({errPhoneNumber: isValidPhoneNumber(value)? null : Strings.txtErrPhoneNumberInvalid})
                                    
                                })}}/>
                       <CTextInput containerStyle={{width: '320px', marginLeft: '30px'}} 
                                label={Strings.txtFieldEMail} 
                                value={this.state.email} 
                                placeholder={Strings.txtFieldEMail} 
                                error={this.state.errEmail}
                                onChangeValue={(value) => {this.setState({email: value }, ()=>{ this.validateForm()})}}/>
                 </div>  
                 <div className="cw-row">
                    <CSelectInput  containerStyle={{width: '320px'}} 
                                data={Constants.genders} 
                                label={Strings.txtFieldGender} 
                                error={this.state.errGender}
                                selectedItemID={this.state.gender}
                                onItemSelected={(item)=>{this.setState({gender: item.id, errGender: null})}} placeholder={Strings.txtFieldGender}/>
                </div>
                <div className="cw-row">
                    <CSelectInput  containerStyle={{width: '320px'}} 
                                data={this.state.departments} 
                                label={Strings.txtFieldDepartment} 
                                error={this.state.errDepartment}
                                selectedItemID={this.state.departmentID}
                                onItemSelected={(item)=>{this.setState({departmentID: item.id, errDepartment: null})}} placeholder={Strings.txtFieldDepartment}/>
                    <CSelectInput  containerStyle={{width: '320px', marginLeft: '30px'}} 
                                data={this.state.jobs} 
                                label={Strings.txtFieldJobLevel} 
                                error={this.state.errJobLevel}
                                selectedItemID={this.state.jobID}
                                onItemSelected={(item)=>{this.setState({jobID: item.id, errJobLevel: null})}} placeholder={Strings.txtFieldJobLevel}/>
                </div>
                 <div className="cw-row">
                 
                    {
                        isEdit &&
                            <CTextInput  containerStyle={{width: '320px'}} 
                            value={this.state.packageName}
                            label={Strings.txtFieldPackage}
                            placeholder={Strings.txtFieldPackage} 
                            disable/>
                    }
                   
                 </div>  
                 <div className="cw-row" style={{ marginTop: "23px"}}>
                    {
                        ((isEdit && permissionUpdate) || (!isEdit && permissionCreate)) &&
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.employeeStore.isLoading}
                                 onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>
                    }
                    {
                        isEdit && permissionDelete && 
                        <CButton containerStyle={{width: "136px", marginLeft: "30px"}} 
                                 onClick={()=>{this.onDelete()}}
                                 type="cancel">{Strings.txtBtnDelete}</CButton>
                    }
                    
                 </div>  
                
            </div>

        </div>
    }
}

export default inject('appStore', 'payorStore', 'packageStore', 'employeeStore', 'jobStore', 'departmentStore')(observer(EmployeeForm));
