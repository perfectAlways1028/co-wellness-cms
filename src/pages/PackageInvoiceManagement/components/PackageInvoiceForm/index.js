import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../../components/atoms'
import { CMImagePicker } from '../../../../components/molecules';
import { Link } from 'react-router-dom';
import PackageForm from '../../../PackageManagement/components/PackageForm';
import { Strings, Constants } from '../../../../constants';
import { inject, observer } from "mobx-react";
import { convertDateForDB, convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';
import { toast } from 'react-toastify';
import { getRole } from '@helpers/storageHelper';

class PackageInvoiceForm extends Component {
    constructor(props) {
        super(props);
        const role = getRole();

        this.state = {
            packageInvoiceIDCode: null,
            packageID: null,
            purchaseDatetime: null,
            expireDate: null,
            payorName: null,
            isSuperAdmin:  role == 'superadmin',
        };
    }


    componentDidMount() {
        const { packageInvoiceID, isEdit } = this.props;
        if( isEdit && packageInvoiceID ) {
            this.props.packageInvoiceStore.findOnePackageInvoice(packageInvoiceID)
            .then(detailPackageInvoice => {
                  this.setState({
                    packageInvoiceIDCode: detailPackageInvoice.packageInvoiceIDCode,
                    payorID: detailPackageInvoice.payorID,
                    packageID: detailPackageInvoice.packageID,
                    purchaseDatetime: detailPackageInvoice.purchaseDatetime,
                    expireDate: detailPackageInvoice.expireDate,
                    price: detailPackageInvoice.price,
                    status: detailPackageInvoice.status,
                    payorName: detailPackageInvoice.payor ? detailPackageInvoice.payor.name : "",
                })
            })
            .catch(error => {
                console.log("error", error);
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }
 
    } 


    render() {
        const { isEdit } = this.props;
        const { isSuperAdmin } = this.state;
        return <div className="cw-default-form-container"> 
     
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldPackageInvoiceID} 
                        value={this.state.packageInvoiceIDCode} 
                        placeholder={Strings.txtFieldPackageInvoiceID} 
                        disable />
                
                {/*
                
                    <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldPayorName} 
                        value={this.state.payorName}
                        disable
                       />
                   */
                }
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldPurchaseDateTime} 
                    value={convertDatetimeToDisplay(this.state.purchaseDatetime)}
                    disable
                />
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldExpireDate} 
                    value={convertDateToDisplay(this.state.expireDate)}
                    disable
                />
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldPrice} 
                    value={this.state.price}
                    disable
                />
                
                {
                    this.state.packageID && 
                    <PackageForm history={this.props.history} isEdit={true} isViewOnly={true} hidePrice={true} packageID={this.state.packageID}/>
                }

        </div>
    }
}

export default inject('payorStore', 'packageInvoiceStore')(observer(PackageInvoiceForm));