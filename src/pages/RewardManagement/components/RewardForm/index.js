import React, { Component } from 'react';
import { CButton, CSelectInput, CTextInput, CDatePicker } from '../../../../components/atoms'
import { CMImagePicker } from '../../../../components/molecules'
import { Strings, Constants } from '../../../../constants';
import TermsComponent from '../TermsComponent';
import { inject, observer } from "mobx-react";
import { toast } from 'react-toastify';
import { getRole } from '@helpers/storageHelper';
import { numberValidate, phoneNumberValidate, emailValidate } from '@helpers/validator';
import { checkPermissionAllowed } from '@helpers/permissionHelper';

const statues = [
    {
        id: 'available',
        name: Strings.txtAvailable
    },
    {
        id: 'unavailable',
        name: Strings.txtUnavailable
    },
]

class RewardForm extends Component {
    constructor(props) {
        super(props);
        const role = getRole();
        this.state = {
            rewardIDCode: null,
            name: null,
            imageUrl: null,
            payorID: null,
            category: null,
            isSuperAdmin: role == 'superadmin',
            point: null,
            quantity: null,
            termsAndConditions: [],
            status: 'available',
            startDate: null,
            endDate: null,
        };

    }
    componentDidMount() {
        const { rewardID, isEdit } = this.props;
        if (isEdit && rewardID) {
            this.props.rewardStore.findOneReward(rewardID)
                .then(detailReward => {
                    console.log("detailReward", detailReward);
                    this.setState({
                        rewardIDCode: detailReward.rewardIDCode,
                        name: detailReward.name,
                        imageUrl: detailReward.imageUrl,
                        payorID: detailReward.payorID,
                        payorName: detailReward.payor ? detailReward.payor.name : null,
                        category: detailReward.rewardCategoryID,
                        point: detailReward.point,
                        quantity: detailReward.quantity,
                        termsAndConditions: detailReward.termsAndConditions || [],
                        status: detailReward.status,
                        startDate: new Date(detailReward.startDate),
                        endDate: new Date(detailReward.endDate),

                    })
                })
                .catch(error => {
                    this.props.history.replace(Constants.error.errorUrl)
                })


        }
        if (this.state.isSuperAdmin) {
            this.props.payorStore.findAllPayors();
        }
        this.props.rewardTypeStore.findAllRewardTypes();



    }
    uploadImage = (path) => {
        this.props.rewardStore.uploadImage(path, "reward")
            .then(data => {
                if (data && data.path) {
                    this.setState({ imageUrl: data.path, errImageUrl: null });
                }
            })
    }
    validateForm = () => {
        let valid = true;
        let { isSuperAdmin } = this.state;

        let validName = this.state.name && this.state.name != "";
        if (!validName) this.setState({ errName: Strings.txtErrNameRequired })
        else this.setState({ errName: null })
        valid &= validName;

        /* if(isSuperAdmin) {
             let validPayor = this.state.payorID && this.state.payorID != "";
             if(!validPayor) this.setState({errPayor: Strings.txtErrPayorSelect})
             else this.setState({errPayor: null})
             valid &= validPayor;
         }*/
        let validCategory = this.state.category && this.state.category != "";
        if (!validCategory) this.setState({ errCategory: Strings.txtErrRewardCategory })
        else this.setState({ errPoint: null })
        valid &= validCategory;


        let validPoint = this.state.point && this.state.point != "" && numberValidate(this.state.point);
        if (!validPoint) this.setState({ errPoint: Strings.txtErrCoinInvalid })
        else this.setState({ errPoint: null })
        valid &= validPoint;

        let validQuantity = this.state.quantity && this.state.quantity != "" && numberValidate(this.state.quantity);
        if (!validQuantity) this.setState({ errPoint: Strings.txtErrQuantityInvalid })
        else this.setState({ errQuantity: null })
        valid &= validQuantity;

        let validStartDate = this.state.startDate && this.state.startDate != "";
        if (!validStartDate) this.setState({ errStartDate: Strings.txtErrStartDate });
        else this.setState({ errStartDate: null })
        valid &= validStartDate;

        let validEndDate = this.state.endDate && this.state.endDate != "";
        if (!validEndDate) this.setState({ errEndDate: Strings.txtErrEndDate });
        else {
            if (this.state.startDate && this.state.endDate) {
                let endDate = new Date(this.state.endDate);
                let startDate = new Date(this.state.startDate);
                if (endDate.getTime() < startDate.getTime()) {
                    this.setState({ errEndDate: Strings.txtErrEndDate })
                    validEndDate = false;
                } else {
                    this.setState({ errEndDate: null })
                }
            }
        }
        valid &= validEndDate;
        return valid;
    }
    onSave = () => {
        const {
            name,
            imageUrl,
            payorID,
            category,
            point,
            quantity,
            termsAndConditions,
            startDate,
            endDate,
            status } = this.state;
        if (!this.props.isEdit) {
            if (this.validateForm()) {
                let body = {
                    name,
                    imageUrl,
                    payorID,

                    rewardCategoryID: category,
                    point,
                    quantity,
                    termsAndConditions,
                    status,
                    startDate,
                    endDate,
                }

                this.props.rewardStore.createReward(body)
                    .then(created => {
                        toast(Strings.txtRewardCreateSuccess);
                        this.props.history.go(-1);
                    })
                    .catch(err => {
                        console.log("faild", err);
                        toast(Strings.txtUnexpectedError);
                    });
            }
        } else {
            if (this.validateForm()) {
                let body = {
                    name,
                    imageUrl,
                    payorID,
                    rewardCategoryID: category,
                    point,
                    quantity,
                    termsAndConditions,
                    status,
                    startDate,
                    endDate,
                }

                this.props.rewardStore.updateReward(this.props.rewardID, body)
                    .then(updated => {
                        toast(Strings.txtRewardUpdateSuccess);
                    })
                    .catch(err => {
                        console.log("faild", err);
                        toast(Strings.txtUnexpectedError);
                    });
            }
        }
    }
    onDelete = () => {
        const { rewardID } = this.props;
        if (window.confirm('Are you sure you wish to delete this reward?')) {
            this.onDeleteReward(rewardID)
        }
    }
    onDeleteReward = (id) => {
        this.props.rewardStore.deleteReward(id)
            .then(deleted => {
                toast(Strings.txtRewardDeleteSuccess);
                this.props.history.go(-1);
            })
    }
    render() {
        const { isEdit } = this.props;
        const { isSuperAdmin } = this.state;
        const payors = this.props.payorStore.allPayors || [];
        const rewardTypes = this.props.rewardTypeStore.allRewardTypes || [];
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.REWARDS, Constants.PAGE_PERMISSION.CREATE);
        const permissionUpdate = checkPermissionAllowed(Constants.PAGE.REWARDS, Constants.PAGE_PERMISSION.UPDATE);
        const permissionDelete = checkPermissionAllowed(Constants.PAGE.REWARDS, Constants.PAGE_PERMISSION.DELETE);

        return <div className="cw-default-form-container">
            <div className="form-container">
                {
                    isEdit &&
                    <CTextInput containerStyle={{ width: '320px' }}
                        label={Strings.txtFieldRewardsID}
                        value={this.state.rewardIDCode}
                        placeholder={Strings.txtFieldRewardsID}
                        disable />
                }

                <CTextInput containerStyle={{ width: '320px' }}
                    label={Strings.txtFieldRewardsName}
                    value={this.state.name}
                    placeholder={Strings.txtFieldRewardsName}
                    error={this.state.errName}
                    onChangeValue={(value) => { this.setState({ name: value, errName: null }) }} />
                <CMImagePicker
                    label={Strings.txtFieldImage}
                    buttonLabel={Strings.txtBtnBrowse}
                    description={Strings.txtImageSizeChallengeDesc}
                    imageUrl={this.state.imageUrl}
                    isUploading={this.props.rewardStore.isLoadingImage}
                    onClearImage={() => { this.setState({ imageUrl: null }) }}
                    onSelectImage={(imgURL, file) => {
                        this.uploadImage(file);
                    }}
                    error={this.state.errImageUrl}
                    isRemoteUrlOnly
                />
                <div className="cw-row" style={{ marginTop: '16px' }}>
                    <CSelectInput containerStyle={{ width: '320px' }}
                        data={rewardTypes}
                        label={Strings.txtFieldCategory}
                        selectedItemID={this.state.category}
                        error={this.state.errCategory}
                        onItemSelected={(item) => { this.setState({ category: item.id, errCategory: null }) }}
                        placeholder={Strings.txtFieldCategory} />
                    {


                        <CTextInput containerStyle={{ width: '320px', marginLeft: '16px' }}
                            label={Strings.txtFieldCreator}
                            value={this.state.payorName ? this.state.payorName : Strings.txtSilaomHospitals}
                            disable
                        />

                    }


                </div>

                <div className="cw-row">
                    <CTextInput containerStyle={{ width: '320px' }}
                        label={Strings.txtFieldCoins}
                        placeholder={Strings.txtFieldCoins}
                        value={this.state.point}
                        error={this.state.errPoint}
                        onChangeValue={(value) => {
                            this.setState({ point: value }, () => {
                                this.validateForm();
                            })
                        }} />
                    <CTextInput containerStyle={{ width: '320px', marginLeft: '16px' }}
                        label={Strings.txtFieldRewardQuantity}
                        placeholder={Strings.txtFieldRewardQuantity}
                        value={this.state.quantity}
                        error={this.state.errQuantity}
                        onChangeValue={(value) => {
                            this.setState({ quantity: value }, () => {
                                this.validateForm();
                            })
                        }} />
                </div>
                <div className="cw-default-form-sub-section" style={{ marginBottom: '16px' }}>
                    {Strings.txtSectionRewardValidity}
                </div>
                <div className="cw-row">
                    <CDatePicker containerStyle={{ width: '320px' }}
                        label={Strings.txtFieldStartDate}
                        selected={this.state.startDate}
                        error={this.state.errStartDate}
                        onChange={(value) => { this.setState({ startDate: value, errStartDate: null }) }} />
                    <CDatePicker containerStyle={{ width: '320px', marginLeft: '16px' }}
                        label={Strings.txtFieldEndDate}
                        selected={this.state.endDate}
                        error={this.state.errEndDate}
                        onChange={(value) => {
                            this.setState({ endDate: value }, () => {
                                this.validateForm();
                            })
                        }} />
                </div>

                <div className="cw-default-form-sub-section" style={{ marginBottom: '16px', marginTop: '8px' }}>
                    {Strings.txtSectionTermsAndConditions}
                </div>
                <TermsComponent data={this.state.termsAndConditions}
                    onChangeItem={(data) => { this.setState({ termsAndConditions: data }) }} />
                <CSelectInput containerStyle={{ width: '320px', marginBottom: '16px', marginTop: '16px' }}
                    data={statues}
                    label={Strings.txtFieldStatus}
                    selectedItemID={this.state.status}
                    onItemSelected={(item) => { this.setState({ status: item.id }) }} placeholder={Strings.txtFieldStatus} />

                <div className="cw-row" style={{ marginTop: "23px" }}>
                    {
                        ((isEdit && permissionUpdate && (isSuperAdmin || this.state.payorID)) || (!isEdit && permissionCreate)) &&
                        <CButton containerStyle={{ width: "136px" }}
                            isLoading={this.props.rewardStore.isLoading}
                            onClick={() => { this.onSave(); }}>{Strings.txtBtnSave}</CButton>
                    }
                    {
                        isEdit && permissionDelete && (isSuperAdmin || this.state.payorID) &&
                        <CButton containerStyle={{ width: "136px", marginLeft: "30px" }} type="cancel" onClick={() => { this.onDelete() }}>{Strings.txtBtnDelete}</CButton>
                    }

                </div>

            </div>

        </div>
    }
}

export default inject('payorStore', 'rewardStore', 'rewardTypeStore')(observer(RewardForm));