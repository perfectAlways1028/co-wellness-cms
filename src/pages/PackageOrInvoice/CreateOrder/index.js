import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput } from '../../../components/atoms'

import { Strings } from '../../../constants';

import { inject, observer } from "mobx-react";
import { toast } from 'react-toastify';
import PackageForm from '../../PackageManagement/components/PackageForm';

class CreateOrder extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            packageID: null
        };
    }
    componentDidMount() {
        this.props.packageStore.findAllPackages();
    }
    getBreadCrumbs = () => {
        return [
            {
                to: '/main/package-invoice-tab',
                title: Strings.txtPackageAndInvoice
            },
            {
                to: `/main/package-invoice-tab/create-order`,
                title: Strings.txtCreateOrder
            },
        ]
    }

    onCreate = () => {
        if(this.state.packageID) {
            this.props.packageInvoiceStore.createPackageInvoice({ packageID: this.state.packageID})
            .then(result => {
                toast(Strings.txtOrderCreateSuccess);
                this.props.history.push('/main/package-invoice-tab')
            })
            .catch(ex => {
                console.log("faild", err);
                toast(Strings.txtUnexpectedError);
            })
        }
   
    }

    onCancel = () => {
        this.props.history.go(-1);
    }

    onSeePackageAccessibility = () => {
        const { packageID } = this.state; 
        this.props.history.push(`/main/package-invoice-tab/package/detail/${packageID}/see-admin-access`)
    }

    render() {
        const { allPackages } = this.props.packageStore;
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs()}/>
            <div className="header">
                <div className="title">{Strings.txtCreateOrder}</div>
              
            </div>
            <div className="form-content-container">

                <div className="cw-row">
                    <CSelectInput containerStyle={{width: '248px'}} 
                                    data={allPackages} label={Strings.txtFilterByPackage} 
                                    placeholder={Strings.txtAll} 
                                    selectedItemID={this.state.packageID}
                                    onItemSelected={(item)=>{this.setState({packageID: item.id})}}/>
                    {
                        this.state.packageID && 
                        <CButton 
                            onClick={()=>{this.onSeePackageAccessibility()}}
                            type="secondary"
                            containerStyle={{width: '172px', height: '40px', marginLeft: '16px', marginTop: '8px'}}>{Strings.txtBtnSeeAdminAccess}</CButton>
                    }
                </div>
                {
                    this.state.packageID && 
                    <PackageForm history={this.props.history} isEdit={true} isViewOnly={true} packageID={this.state.packageID}/>
                }
                {
                    this.state.packageID && 
                    <div className="cw-row" style={{ marginTop: "23px"}}>
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.packageInvoiceStore.isLoading}
                                 onClick={()=>{this.onCreate()}}>{Strings.txtBtnOrder}</CButton>
                        <CButton containerStyle={{width: "136px", marginLeft: "30px"}} type="cancel" onClick={()=>{this.onCancel()}}>{Strings.txtBtnCancel}</CButton>           
                    </div>  
                }
               
            </div>
          
        </div>
    }
}


export default inject('packageInvoiceStore', 'packageStore')(observer(CreateOrder));
