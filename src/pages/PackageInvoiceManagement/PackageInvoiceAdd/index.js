import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CDatePicker, CTextInput } from '../../../components/atoms'

import { Strings } from '../../../constants';
import { numberValidate } from '@helpers/validator';

import { inject, observer } from "mobx-react";
import { toast } from 'react-toastify';
import Moment from 'moment';
import { getRole } from '@helpers/storageHelper';
class PackageInvoiceAddPage extends Component {
    constructor(props) {
        super(props);
        const role = getRole();
        this.state = {
            packageID: null,        
            expireDate: null,
            selectedPackage: null,
        };
    }
    componentDidMount() {
        this.props.payorStore.findAllPayors();
        this.props.packageStore.findAllPackages();
    }
    getBreadCrumbs = () => {
        return [
            {
                to: '/main/package-invoice-management',
                title: Strings.txtPackageInvoice
            },
            {
                to: `/main/package-invoice-management/add`,
                title: Strings.txtAddNewPackageInvoice
            },
        ]
    }

    validateForm = () => {
        let valid = true;
        let validPayor = this.state.payorID && this.state.payorID != "";
        if(!validPayor) this.setState({payorErr: Strings.txtErrPayorSelect})
        else this.setState({payorErr: null})
        valid &= validPayor;

        let validPackage = this.state.packageID && this.state.packageID != "" ;
        if(!validPackage) this.setState({packageErr: Strings.txtErrPackageSelect})
        else this.setState({packageErr: null})
        valid &= validPackage;

        let validPurchaseDateTime = this.state.purchaseDateTime && this.state.purchaseDateTime != "";
        if(!validPurchaseDateTime) this.setState({purchaseDateTimeErr: Strings.txtErrPurchaseDateTime})
        else this.setState({purchaseDateTimeErr: null})
        valid &= validPurchaseDateTime;

        let validPrice = this.state.price && this.state.price != "" && numberValidate(this.state.price);
        if(!validPrice) this.setState({priceErr: Strings.txtErrPrice})
        else this.setState({priceErr: null})
        valid &= validPrice;


        let validInvoiceID = this.state.packageInvoiceIDCode && this.state.packageInvoiceIDCode != "";
        if(!validInvoiceID) this.setState({packageInvoiceIDErr: Strings.txtErrPackageInvoice})
        else this.setState({packageInvoiceIDErr: null})
        valid &= validInvoiceID;
        return valid;
    }

    onCreate = () => {
        console.log("on create")
        let valid = this.validateForm();
        if(valid) {
            console.log("valid")
            let { packageID, payorID, purchaseDateTime, packageInvoiceIDCode, price } = this.state;
            let body = {
                payorID,
                packageID,
                purchaseDatetime: purchaseDateTime, 
                packageInvoiceIDCode, 
                price
            }

            this.props.packageInvoiceStore.createPackageInvoice(body)
            .then(result => {
                toast(Strings.txtPackageInvoiceCreateSuccess);
                this.props.history.go(-1)
            })
            .catch(ex => {
                console.log("faild", err);
                toast(Strings.txtUnexpectedError);
            })
        }
    }
    calculateExpireDate = ( purchaseDateTime, period) => {
        let expireDate = Moment(purchaseDateTime).add(period, 'days').toDate();
        return expireDate;
    }
    onPackageSelect = (item) => {
        this.setState({packageID: item.id, selectedPackage: item, packageErr: null, price: item.price, priceErr: null});
        
    }

    render() {
        const { allPackages } = this.props.packageStore;
        const { allPayors } = this.props.payorStore;
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs()}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewPackageInvoice}</div>
            </div>
            <div className="form-content-container">
                <CSelectInput containerStyle={{width: '320px'}} 
                                data={allPayors} 
                                label={Strings.txtPayor} 
                                placeholder={Strings.txtChoosePayor} 
                                selectedItemID={this.state.payorID}
                                error={this.state.payorErr}
                                onItemSelected={(item)=>{this.setState({payorID: item.id, payorErr: null})}}/>
                
                <CSelectInput containerStyle={{width: '320px'}} 
                                data={allPackages} label={Strings.txtPackage} 
                                placeholder={Strings.txtChoosePackage} 
                                selectedItemID={this.state.packageID}
                                error={this.state.packageErr}
                                onItemSelected={(item)=>{
                                    this.onPackageSelect(item);
                                }}/>

                <CDatePicker containerStyle={{width: '320px'}} 
                                    label={Strings.txtFieldPurchaseDateTime} 
                                    selected={this.state.purchaseDateTime} 
                                    placeholderText={Strings.txtSelectPurchaseDateTime} 
                                    onChange={(value) => {
                                                if(this.state.selectedPackage && this.state.selectedPackage.period && value) {
                                                    let expireDate = this.calculateExpireDate(value, this.state.selectedPackage.period)
                                
                                                    this.setState({expireDate: expireDate})
                                                }
                                                this.setState({purchaseDateTime: value});
                                            }}/>
                 <CDatePicker containerStyle={{width: '320px'}} 
                                    label={Strings.txtFieldExpireDate} 
                                    selected={this.state.expireDate} 
                                    disable
                                />    
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldPrice} 
                    value={this.state.price} 
                    placeholder={Strings.txtInputPrice} 
                    error={this.state.priceErr}
                    onChangeValue={(value) => {this.setState({price: value, priceErr: null})}}
                     />          
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldInvoiceID} 
                    value={this.state.packageInvoiceIDCode} 
                    placeholder={Strings.txtInputInvoiceID} 
                    error={this.state.packageInvoiceIDErr}
                    onChangeValue={(value) => {this.setState({packageInvoiceIDCode: value, packageInvoiceIDErr: null})}}
                     />   
                <div className="cw-row" style={{ marginTop: "23px"}}>
                    <CButton containerStyle={{width: "136px"}} 
                             isLoading={this.props.packageInvoiceStore.isLoading}
                             onClick={()=>{this.onCreate()}}>{Strings.txtBtnSave}</CButton>
                </div>  
                
               
            </div>
          
        </div>
    }
}


export default inject('packageInvoiceStore', 'packageStore', 'payorStore')(observer(PackageInvoiceAddPage));
