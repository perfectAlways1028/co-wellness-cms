import React, { Component } from 'react';
import { CModal, CButton, CTextInput, CImageButton } from '../../../../components/atoms'

import { Strings, Images } from '../../../../constants';

import './style.scss'

import { toast } from 'react-toastify';
import { inject, observer } from "mobx-react";

class ChangePasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state= {
            modalOpened: false,
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,
            errOldPassword: null,
            errNewPassword: null,
            errConfirmPassword: null,
        }
    }

    onClose = () => {
        this.setState({modalOpened : false})
    }
    onOpen = () => {
        this.setState({modalOpened: true})
    }
    
    validateForm = () => {
        let valid = true;
        let validOldPassword = this.state.oldPassword && this.state.oldPassword != "";
        if(!validOldPassword) this.setState({errOldPassword: Strings.txtErrOldPassword})
        else this.setState({errOldPassword: null})
        valid &= validOldPassword;
        let validNewPassword = this.state.newPassword && this.state.newPassword != "";
        if(!validNewPassword) this.setState({errNewPassword: Strings.txtErrNewPassword})
        else this.setState({errNewPassword: null})
        valid &= validNewPassword;
        let validConfirmPassword = this.state.confirmPassword && this.state.confirmPassword != "" && this.state.newPassword == this.state.confirmPassword;
        if(!validConfirmPassword) this.setState({errConfirmPassword: Strings.txtErrConfirmPassword})
        else  this.setState({errConfirmPassword: null})
        valid &= validConfirmPassword;
        return valid;
    }
    onSave = () => {
        const { oldPassword, newPassword} = this.state;
   
        const { payorAdminID } = this.props;
        if(payorAdminID && this.validateForm()) {
            this.props.payorStore.payorAdminChangePassword(payorAdminID ,oldPassword, newPassword)
            .then(success =>{
                this.setState({
                    modalOpened: false,
                    oldPassword: null,
                    newPassword: null,
                    confirmPassword: null,
                    errOldPassword: null,
                    errNewPassword: null,
                    errConfirmPassword: null,
                })
                toast(Strings.txtChangePasswordSuccess)
            })
            .catch(err => {
                toast(Strings.txtOldPasswordNotCorrect, {type: 'error'})
                
            })
        }
    }
    render() {
        const { modalOpened } = this.state;
        return <div className='cw-column'>
            <a href className="cw-changepassword" onClick={()=>{this.onOpen()}}>
                {Strings.txtChangePassword}
            </a>
            <CModal
                isOpen={modalOpened}
                onRequestClose={()=>{this.onClose()}}
                contentLabel={Strings.txtChangePassword}
                contentStyle={{width: '770px', height: '558px'}}
            >   
                <div className="cw-modal-change-password-container">
                    <CImageButton containerStyle={{    
                        position: 'absolute',
                        width: '48px',
                        height: '48px',
                        top: '24px',
                        right: '24px'}}
                        src={Images.close}
                        onClick={()=>{this.onClose()}}/>

                    <div className={'title'}>
                        {Strings.txtChangePassword}
                    </div>
                    <CTextInput
                        label={Strings.txtOldPassword}
                        value={this.state.oldPassword}
                        onChangeValue={(value) => {this.setState({oldPassword: value})}}
                        placeholder={Strings.txtOldPassword}
                        error={this.state.errOldPassword}
                        type="password"
                        containerStyle={{marginTop: '27px', width: '335px'}}
                    />
                    <CTextInput
                        label={Strings.txtNewPassword}
                        value={this.state.newPassword}
                        onChangeValue={(value) => {this.setState({newPassword: value})}}
                        placeholder={Strings.txtNewPassword}
                        error={this.state.errNewPassword}
                        containerStyle={{marginTop: '12px', width: '335px'}}
                        type="password"
                    />
                    <CTextInput
                        label={Strings.txtNewPasswordConfrim}
                        value={this.state.confirmPassword}
                        onChangeValue={(value) => {this.setState({confirmPassword: value})}}
                        placeholder={Strings.txtNewPasswordConfrim}
                        error={this.state.errConfirmPassword}
                        containerStyle={{marginTop: '12px', width: '335px'}}
                        type="password"
                    />

                    <CButton containerStyle={{width:'160px', marginTop: '70px'}}
                             isLoading={this.props.payorStore.isLoading} 
                             onClick={()=>{this.onSave()}} >{Strings.txtBtnSave}</CButton>

                </div>
            </CModal>
      </div>
    }
}

export default inject('payorStore')(observer(ChangePasswordModal));
