import React, { Component } from 'react';
import { CButton, CSelectInput, CTextInput, CDatePicker, CTextArea } from '../../../../components/atoms'
import { CMImagePicker } from '../../../../components/molecules'
import { Strings, Constants } from '../../../../constants';
import { inject, observer } from "mobx-react";
import { toast } from 'react-toastify';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

class BroadcastForm extends Component {
    constructor(props) {
        super(props);
  
        if(props.isEdit) {
            this.state = {
                title: null,
                description: null
            };
        } else {
            this.state = {
                broadcastIDCode: null,
                title: null,
                description: null
       
            };
        }
    }
    componentDidMount() {
        const { broadcastID, isEdit } = this.props;
        if( isEdit && broadcastID ) {
            this.props.broadcastStore.findOneBroadcast(broadcastID)
            .then(detailBroadcast => {
                  this.setState({
                    broadcastIDCode: detailBroadcast.broadcastIDCode,
                    title: detailBroadcast.title,
                    description: detailBroadcast.description,
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

    onSave = () => {
        const {  
            title,
            description,
            } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    title,
                    description
                }

                this.props.broadcastStore.createBroadcast(body)
                .then(created => {
                    toast(Strings.txtBroadcastCreateSuccess);
                    this.props.history.go(-1);
                })
                .catch(err => {
                    console.log("faild", err);
                    toast(Strings.txtUnexpectedError);
                });
            }
        } else {
         /*   if( this.validateForm() ) {
                let body = {
                    title,
                    description
                }
                this.props.broadcastStore.updateBroadcast(this.props.broadcastID, body)
                .then(updated => {
                    toast(Strings.txtBroadcastUpdateSuccess);
                })
                .catch(err => {
                    console.log("faild", err);
                    toast(Strings.txtUnexpectedError);
                });
            }*/
        }
    }
    validateForm = () => {
        let valid = true;
        let {isSuperAdmin} = this.state;

        let validTitle = this.state.title && this.state.title != "";
        if(!validTitle) this.setState({errTitle: Strings.txtErrTitleRequired})
        else this.setState({errTitle: null})
        valid &= validTitle;

        return valid;
    }

    render() {
        const { isEdit } = this.props;
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.BROADCAST, Constants.PAGE_PERMISSION.CREATE);
        const permissionUpdate = checkPermissionAllowed(Constants.PAGE.BROADCAST, Constants.PAGE_PERMISSION.UPDATE);
        const permissionDelete = checkPermissionAllowed(Constants.PAGE.BABROADCASTNNER, Constants.PAGE_PERMISSION.DELETE);
        return <div className="cw-default-form-container"> 
            <div className="form-container">
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldBroadcastID} 
                            value={this.state.broadcastIDCode} 
                            placeholder={Strings.txtFieldBroadcastID} 
                            disable />
                }
            <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldBroadcastTitle} 
                            placeholder={Strings.txtFieldBroadcastTitle} 
                            value={this.state.title}
                            error={this.state.errTitle}
                            disable={isEdit}
                            onChangeValue={(value) => {this.setState({title: value, errTitle: null})}}/>

            {
                /*
                <CDatePicker containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldPostedDate} 
                        selected={this.state.postedDate} 
                        placeholderText={Strings.txtFieldPostedDate} 
                        onChange={(value) => {this.setState({postedDate: value})}}/>
                */
            }
           
            <CTextArea containerStyle={{width: '320px'}} 
                label={Strings.txtFieldDescription} 
                placeholder={Strings.txtFieldDescription} 
                value={this.state.description}
                disable={isEdit}
                onChangeValue={(value) => {this.setState({description: value})}}/>

            <div className="cw-row" style={{ marginTop: "23px"}}>
                {
                    !isEdit && permissionCreate &&
                    <CButton containerStyle={{width: "136px"}} 
                        isLoading={this.props.broadcastStore.isLoading}
                        onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>
                }
              
            
            </div>  

            </div>

        </div>
    }
}

export default inject('payorStore', 'broadcastStore')(observer(BroadcastForm));