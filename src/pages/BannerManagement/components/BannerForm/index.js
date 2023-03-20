import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../../../components/atoms'
import { CMImagePicker } from '../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../constants';
import { inject, observer } from "mobx-react";
import './style.scss'
import { toast } from 'react-toastify';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';
class BannerForm extends Component {
    constructor(props) {
        super(props);
        const role = getRole();

        this.state = {
            bannerIDCode: null,
            title: null,
            bannerImageUrl: null,
            payorID: null,
            payorName: null,
            isSuperAdmin:  role == 'superadmin',
            errTitle: null,
            errPayor: null,
            errImageUrl: null
        };
    }


    componentDidMount() {
        const { bannerID, isEdit } = this.props;
        if( isEdit && bannerID ) {
            this.props.bannerStore.findOneBanner(bannerID)
            .then(detailBanner => {
                  this.setState({
                    bannerIDCode: detailBanner.bannerIDCode,
                    payorID: detailBanner.payorID,
                    title: detailBanner.title,
                    bannerImageUrl: detailBanner.bannerImgUrl,
                    payorName: detailBanner.payor ? detailBanner.payor.name : "",
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }else {
            if(this.state.isSuperAdmin) {
                this.props.payorStore.findAllPayors();
            }
        }
 
    } 

    uploadImage = ( path ) => {
        this.props.bannerStore.uploadImage(path, "banner")
        .then(data => {
            if(data && data.path) {
                this.setState({bannerImageUrl: data.path, errImageUrl: null});
            }
        })
    }

    onSave = () => {
        const {  
            title,
            bannerImageUrl,
            payorID, } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    title,
                    bannerImgUrl: bannerImageUrl,
                    payorID,
                }

                this.props.bannerStore.createBanner(body)
                .then(created => {
                    toast(Strings.txtBannerCreateSuccess);
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
                    title,
                    bannerImgUrl: bannerImageUrl,
                    payorID,
                }
                this.props.bannerStore.updateBanner(this.props.bannerID, body)
                .then(updated => {
                    toast(Strings.txtBannerUpdateSuccess);
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

        let validTitle = this.state.title && this.state.title != "";
        if(!validTitle) this.setState({errTitle: Strings.txtErrTitleRequired})
        else this.setState({errTitle: null})
        valid &= validTitle;

        if(isSuperAdmin) {
            let validPayor = this.state.payorID && this.state.payorID != "";
            if(!validPayor) this.setState({errPayor: Strings.txtErrPayorSelect})
            else this.setState({errPayor: null})
            valid &= validPayor;
        }

        // let validImageUrl = this.state.bannerImageUrl && this.state.bannerImageUrl != "";
        // if(!validImageUrl) this.setState({errImageUrl: Strings.txtErrImageRequired})
        // else this.setState({errImageUrl: null})
        // valid &= validImageUrl;


        return valid;
    }
    onDelete = () => {
        const { bannerID } = this.props;
        if (window.confirm('Are you sure you wish to delete this banner?'))  {
            this.onDeleteBanner(bannerID) 
        }
    }
    onDeleteBanner = (id) => {
        this.props.bannerStore.deleteBanner(id)
        .then(deleted => {
            toast(Strings.txtBannerDeleteSuccess);
            this.props.history.go(-1);
        })
    }
    render() {
        const { isEdit } = this.props;
        const { isSuperAdmin } = this.state;
        const payors = this.props.payorStore.allPayors || [];
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.BANNER, Constants.PAGE_PERMISSION.CREATE);
        const permissionUpdate = checkPermissionAllowed(Constants.PAGE.BANNER, Constants.PAGE_PERMISSION.UPDATE);
        const permissionDelete = checkPermissionAllowed(Constants.PAGE.BANNER, Constants.PAGE_PERMISSION.DELETE);
        return <div className="cw-banner-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldBannerID} 
                            value={this.state.bannerIDCode} 
                            placeholder={Strings.txtFieldBannerID} 
                            disable />
                }
                {
                    !isSuperAdmin ?
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldPayorName} 
                        value={this.state.payorName}
                        disable
                       />
                    :
                    <CSelectInput containerStyle={{width: '320px'}} 
                    data={payors} 
                    label={Strings.txtFieldPayorName} 
                    placeholder={Strings.txtFieldPayorName} 
                    selectedItemID={this.state.payorID}
                    error={this.state.errPayor}
                    onItemSelected={(item)=>{this.setState({payorID: item.id, errPayor: null})}}/>
                }


                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldTitle} 
                    value={this.state.title}
                    placeholder={Strings.txtFieldTitle} 
                    error={this.state.errTitle}
                    onChangeValue={(value) => {this.setState({title: value, errTitle: null})}}/>

                <CMImagePicker 
                    label={Strings.txtBannerImage}
                    buttonLabel={Strings.txtBtnBrowse}
                    description={Strings.txtImageSizeDesc}
                    imageUrl={this.state.bannerImageUrl}
                    isUploading={this.props.bannerStore.isLoadingImage}
                    onClearImage={()=>{this.setState({bannerImageUrl: null})}}
                    onSelectImage={(imgURL, file)=> {
                        this.uploadImage(file);
                    }}
                    // error={this.state.errImageUrl}
                    isRemoteUrlOnly
                />
               
                 <div className="cw-row" style={{ marginTop: "23px"}}>
                     {
                        ((isEdit && permissionUpdate) || (!isEdit && permissionCreate)) &&
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.bannerStore.isLoading}
                                 onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>
                     }
                   
                    {
                        isEdit && permissionDelete && 
                        <CButton containerStyle={{width: "136px", marginLeft: "30px"}} type="cancel" onClick={()=>{this.onDelete()}}>{Strings.txtBtnDelete}</CButton>
                    }
                    
                 </div>  


                
            </div>

        </div>
    }
}

export default inject('payorStore', 'bannerStore')(observer(BannerForm));