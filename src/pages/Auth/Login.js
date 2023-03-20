import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from "mobx-react";
import { CTextInput, CButton } from '../../components/atoms';
import { Strings, Images } from '../../constants';
import './style/Login.scss'
import { ToastContainer, toast } from 'react-toastify';
class LoginPage extends Component {
    constructor(props) {
        super(props);

    }
    static propTypes = {
        history: PropTypes.object.isRequired,
    };
    componentDidMount = () => {
        this.props.authStore.reset();
    }

    onLoginClick = () => {

        this.props.authStore.login()
            .then(() => {
                if (this.props.authStore.role === 'superadmin') {
                    this.props.history.push('/main/dashboard')
                }
                else if (this.props.authStore.role == 'payoradmin') {
                    this.props.history.push('/main/dashboard')
                }
                toast(Strings.txtLoginSuccess);

            })
            .catch(err => {
                toast(Strings.txtLoginFailure);
            });
    }
    render() {
        const { authStore } = this.props;
        return <div className={'cow-login-container'}>
            <div className={'logo'}>
                <img src={Images.logo} />
            </div>
            <div className={'card'}>
                <div className={'title'}>{Strings.txtLogin}</div>
                <div className={'description'}>{Strings.txtLoginDescription}</div>
                <CTextInput label={Strings.txtFieldEMail}
                    placeholder={Strings.txtFieldEMail}
                    value={authStore.values ? authStore.values.email : ""}
                    onChangeValue={(value) => { this.props.authStore.setEmail(value) }}
                    containerStyle={{ alignSelf: 'stretch', marginTop: '40px' }} />
                <CTextInput label={Strings.txtPassword}
                    placeholder={Strings.txtPasswordPlaceholder}
                    type={'password'}
                    value={authStore.values ? authStore.values.password : ""}
                    onChangeValue={(value) => { this.props.authStore.setPassword(value) }}
                    containerStyle={{ alignSelf: 'stretch', marginTop: '15px' }} />
                <CButton
                    onClick={() => { this.onLoginClick() }}
                    isLoading={this.props.authStore.isLoading}
                    label={'Log In'}
                    containerStyle={{ alignSelf: 'stretch', marginTop: '32px' }}>LOG IN</CButton>
            </div>
            <ToastContainer />
        </div>
    }
}

export default inject('authStore')(observer(LoginPage));