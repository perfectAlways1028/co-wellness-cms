import React, { Component } from 'react';
import { CButton, CSelectInput, CTextInput,  CCheckbox } from '../../../../components/atoms'
import { CMCheckBoxGroup } from '../../../../components/molecules'
import { Strings, Constants } from '../../../../constants';
import { numberValidate } from '@helpers/validator';
import { inject, observer } from "mobx-react";
import { toast } from 'react-toastify';
const statues = [
    {
        id: true,
        name: Strings.txtActive
    },
    {
        id: false,
        name: Strings.txtNonActive
    },
]

class PackageForm extends Component {
    constructor(props) {
        super(props);
  
        if(props.isEdit) {
            this.state = {
                id: this.props.packageID,
            };
        } else {
            this.state = {
                packageIDCode: null,
                name: null,
                period: null,
                price: null,
                selectedPackageFeatures: [],
                status: true
            };
        }
    }

    componentDidMount() {
        this.load()
    } 

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.packageID!==this.props.packageID){
            this.load();
        }
    }
    load = () => {
        const { packageID, isEdit } = this.props;
        if( isEdit && packageID ) {
            this.props.packageStore.findOnePackage(packageID)
            .then(detailPackage => {

                let selectedPackageFeatureIDs = [];
                detailPackage.packageFeatures.map(item => {
                    if(item.active == true) {
                        selectedPackageFeatureIDs.push(item.feature);
                    }
                })
                this.setState({
                    packageIDCode: detailPackage.packageIDCode,
                    name: detailPackage.name,
                    period: detailPackage.period,
                    price: detailPackage.price,
                    status: detailPackage.active,
                    selectedPackageFeatureIDs
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
        }
    }

    gotoSetAdminAccess = (id) => {
        this.props.history.push(`/main/package-management/detail/${id}/set-admin-access`)
    }
    onSave = () => {
        const { name, period, price, selectedPackageFeatures, status } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    name,
                    period,
                    price,
                    active: status,
                    packageFeatures : this.generatePackageFeatures(selectedPackageFeatures)
                }

                this.props.packageStore.createPackage(body)
                .then(created => {
                    if(created && created.id)
                    this.gotoSetAdminAccess(created.id)
                    toast(Strings.txtPackageCreateSuccess);
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
                    period,
                    price,
                    active: status
                }
                if(selectedPackageFeatures) {
                    body.packageFeatures = this.generatePackageFeatures(selectedPackageFeatures);
                }

                this.props.packageStore.updatePackage(this.props.packageID, body)
                .then(updated => {
                    toast(Strings.txtPackageUpdateSuccess);
                })
                .catch(err => {
                    console.log("faild", err);
                    toast(Strings.txtUnexpectedError);
                });
            }
        }
    }

    checkSelected = (feature, selectedFeatures) => {
        let item = selectedFeatures.find((item)=>{
            return item.id == feature.id
        })
        return item && true;
    }
    generatePackageFeatures = (features) => {
        return Constants.packageFeatures.map(feature => {
            return {
                feature: feature.id,
                active: this.checkSelected(feature, features)
            }
        })
    }

    validateForm = () => {
        let valid = true;

        let validName = this.state.name && this.state.name != "";
        if(!validName) this.setState({nameInvalidError: Strings.txtErrNameRequired})
        else this.setState({nameInvalidError: null})
        valid &= validName;

        let validPeriod = this.state.period && this.state.period != "" && numberValidate(this.state.period);
        if(!validPeriod) this.setState({periodInvalidError: Strings.txtErrPeriod})
        else this.setState({periodInvalidError: null})
        valid &= validPeriod;

        let validPrice = this.state.price && this.state.price != "" && numberValidate(this.state.price);
        if(!validPrice) this.setState({priceInvalidError: Strings.txtErrPrice})
        else this.setState({priceInvalidError: null})
        valid &= validPrice;
        return valid;
    }

    onDelete = () => {
        const { packageID } = this.props;
        if (window.confirm('Are you sure you wish to delete this package?'))  {
            this.onDeletePackage(packageID) 
        }
    }
    onDeletePackage = (id) => {
        this.props.packageStore.deletePackage(id)
        .then(deleted => {
            toast(Strings.txtPackageDeleteSuccess);
            this.props.history.go(-1);
        })
    }
    render() {
        const { isEdit, isViewOnly } = this.props;
        return <div className="cw-default-form-container"> 
            <div className="form-container">
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px', marginBottom: '16px'}} 
                            label={Strings.txtFieldPackageID} 
                            value={this.state.packageIDCode} 
                            placeholder={Strings.txtFieldPackageID} 
                            disable />
                }
            <CTextInput containerStyle={{width: '320px', marginBottom: '16px'}} 
                            label={Strings.txtFieldPackageName} 
                            value={this.state.name}
                            error={this.state.nameInvalidError}
                            disable={isViewOnly}
                            onChangeValue={(value) => {this.setState({name: value})}}/>
            <CTextInput containerStyle={{width: '320px', marginBottom: '16px'}} 
                    label={Strings.txtFieldPeriod} 
                    value={this.state.period}
                    error={this.state.periodInvalidError}
                    disable={isViewOnly}
                    onChangeValue={(value) => {this.setState({period: value})}}/>
            {
            !this.props.hidePrice &&
            <CTextInput containerStyle={{width: '320px', marginBottom: '16px'}} 
                    label={Strings.txtFieldPrice} 
                    value={this.state.price}
                    error={this.state.priceInvalidError}
                    disable={isViewOnly}
                    onChangeValue={(value) => {this.setState({price: value})}}/>
            }
            <CMCheckBoxGroup
                data={Constants.packageFeatures}
                countPerLine= {6}
                lineCount= {3}
                direction={'col'}
                selectedItemIDs ={this.state.selectedPackageFeatureIDs}
                disable={isViewOnly}
                onItemSelect={(items) => {
                    this.setState({selectedPackageFeatures: items, selectedPackageFeatureIDs: items.map(item=>{return item.id})});
                }}
            />
            {
                !isViewOnly && 
                <CSelectInput  containerStyle={{width: '320px', marginTop: '16px'}} 
                data={statues} 
                label={Strings.txtFieldStatus} 
                selectedItemID={this.state.status}
                disable={isViewOnly}
                onItemSelected={(item)=>{this.setState({status: item.id})}} placeholder={Strings.txtFieldStatus}/>
            }
        

            {
                !isViewOnly && 
                <div className="cw-row" style={{ marginTop: "23px"}}>
                <CButton containerStyle={{width: "136px"}} 
                          isLoading={this.props.packageStore.isLoading}
                          onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>
                    {
                        isEdit && 
                        <CButton containerStyle={{width: "136px", marginLeft: "30px"}} 
                                type="cancel"
                                onClick={()=>{this.onDelete()}}>{Strings.txtBtnDelete}</CButton>
                    }
                
                </div>  
            }
           

            </div>

        </div>
    }
}

export default inject('packageStore')(observer(PackageForm));
