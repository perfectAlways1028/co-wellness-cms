import React, { Component } from 'react';
import { CButton, CSelectInput, CTextInput, CTextArea, CCheckbox, CRadioButton, CDatePicker } from '../../../../components/atoms'
import { CMImagePicker, CMRadioGroup } from '../../../../components/molecules'
import { Strings, Constants } from '../../../../constants';
import { toast } from 'react-toastify';
import { inject, observer } from "mobx-react";
import { numberValidate, phoneNumberValidate, emailValidate } from '@helpers/validator';
import { convertDateForDB, convertDateForLocale, convertDatetimeToDisplay } from '@helpers/dateHelper';
import { convertMilisecondsToHours, convertHoursToMiliseconds } from '@helpers/formatHelper'
import { checkPermissionAllowed } from '@helpers/permissionHelper';
import Moment from 'moment';
const statues = [
    {
        id: 1,
        name: Strings.txtActive
    },
    {
        id: 2,
        name: Strings.txtNonActive
    },
]

const jobLevels = [
    {
        id: 1,
        name: "Graphic Designer"
    },
    {
        id: 2,
        name: "Finance"
    },
    {
        id: 3,
        name: "IT Staff"
    },
    {
        id: 4,
        name: "Marketing Staff"
    },
    {
        id: 5,
        name: "Project Manager"
    },
    {
        id: 6,
        name: "Marketing Manager"
    },
    {
        id: 7,
        name: "Business Manager"
    },
    {
        id: 8,
        name: "General Manager"
    },
    {
        id: 9,
        name: "CTO"
    },
    {
        id: 9,
        name: "CEO"
    },
]

const ageSelect = [
    {
        id: true,
        name: Strings.txtAllAge
    },
    {
        id: false,
        name: Strings.txtSelected
    }
]
const genderSelect = [
    {
        id: true,
        name: Strings.txtAllGender
    },
    {
        id: false,
        name: Strings.txtSelected
    }
]
const jobSelect = [
    {
        id: true,
        name: Strings.txtEveryone
    },
    {
        id: false,
        name: Strings.txtSelected
    }
]
const departmentSelect = [
    {
        id: true,
        name: Strings.txtEveryone
    },
    {
        id: false,
        name: Strings.txtSelected
    }
]
const healthRiskSelect = [
    {
        id: true,
        name: Strings.txtEveryone
    },
    {
        id: false,
        name: Strings.txtSelected
    }
]
const repeatSelect = [
    {
        id: false,
        name: Strings.txtOneTime
    },
    {
        id: true,
        name: Strings.txtRepeat
    }
]
const selectedPackageFeatureIDs = [
    'healthRisk',
    'sleep'
]

class ChallengeForm extends Component {
    constructor(props) {
        super(props);

        if (props.isEdit) {
            this.state = {
                isAllAge: true,
                isAllGender: true,
                isAllJob: true,
                isAllDepartment: true,
                isAllHealthRisk: true,
                jobs: [],
                departments: [],
                healthRisks: [],
            };
        } else {
            this.state = {
                challengeIDCode: null,
                title: null,
                period: null,
                imageUrl: null,
                totalTarget: null,
                rewardPrize: null,
                isAllAge: true,
                minimumAge: null,
                maximumAge: null,
                isAllGender: true,
                gender: null,
                isAllJob: true,
                job: null,
                isAllDepartment: true,
                departmentID: null,
                isAllHealthRisk: true,
                healthRiskID: null,
                isRepeat: true,
                repeatFrequency: null,
                repeatFor: null,
                startDate: null,
                endDate: null,
                jobs: [],
                departments: [],
                healthRisks: [],

            };
        }
    }
    onAgeSelect = (item) => {
        this.setState({ isAllAge: item.id === true })
    }

    validateStepOne = () => {
        let valid = true;

        let validCategory = this.state.category && this.state.category != "";
        if (!validCategory) this.setState({ errCategory: Strings.txtErrChallengeCategory })
        else this.setState({ errCategory: null })
        valid &= validCategory;

        let validTitle = this.state.title && this.state.title != "";
        if (!validTitle) this.setState({ errTitle: Strings.txtErrTitleRequired })
        else this.setState({ errTitle: null })
        valid &= validTitle;

        let validTitleInd = this.state.titleLangInd && this.state.titleLangInd != "";
        if (!validTitleInd) this.setState({ errTitleInd: Strings.txtErrTitleRequired })
        else this.setState({ errTitleInd: null })
        valid &= validTitleInd;

        let validDescription = this.state.description && this.state.description != "";
        if (!validDescription) this.setState({ errDescription: Strings.txtErrDescription })
        else this.setState({ errDescription: null })
        valid &= validDescription;

        let validDescriptionInd = this.state.descriptionLangInd && this.state.descriptionLangInd != "";
        if (!validDescriptionInd) this.setState({ errDescriptionInd: Strings.txtErrDescription })
        else this.setState({ errDescriptionInd: null })
        valid &= validDescriptionInd;

        // let validImageUrl = this.state.imageUrl && this.state.imageUrl != "";
        // if(!validImageUrl) this.setState({errImageUrl: Strings.txtErrImageRequired})
        // else this.setState({errImageUrl: null})
        // valid &= validImageUrl;

        let validTotalTarget = this.state.totalTarget && this.state.totalTarget != "" && numberValidate(this.state.totalTarget);
        if (!validTotalTarget) this.setState({ errTotalTarget: Strings.txtErrTotalTarget });
        else this.setState({ errTotalTarget: null })
        valid &= validTotalTarget;

        let validReward = this.state.rewardPrize && this.state.rewardPrize != "" && numberValidate(this.state.rewardPrize);
        if (!validReward) this.setState({ errRewardPrize: Strings.txtErrRewardPrize });
        else this.setState({ errRewardPrize: null })
        valid &= validReward;

        return valid;
    }

    validateStepTwo = () => {
        let valid = true;

        let validStartDate = this.state.startDate && this.state.startDate != "";
        if (!validStartDate) this.setState({ errStartDate: Strings.txtErrStartDate });
        else this.setState({ errStartDate: null })
        valid &= validStartDate;

        if (this.state.isRepeat) {
            this.setState({ errEndDate: null })
            let validRepeatFrequency = this.state.repeatFrequency && this.state.repeatFrequency != ""
            if (!validRepeatFrequency) this.setState({ errRepeatFrequency: Strings.txtErrRepeatFrequency });
            else this.setState({ errRepeatFrequency: null })
            valid &= validRepeatFrequency;

            let validRepeatFor = this.state.repeatFor && this.state.repeatFor != "" && numberValidate(this.state.repeatFor)
            if (!validRepeatFor) this.setState({ errRepeatFor: Strings.txtErrRepeatFor });
            else this.setState({ errRepeatFor: null })
            valid &= validRepeatFor;

        } else {
            this.setState({ errRepeatFor: null, errRepeatFrequency: null })
            if (this.state.startDate && this.state.endDate) {
                let endDate = new Date(this.state.endDate);
                let startDate = new Date(this.state.startDate);
                if (endDate.getTime() < startDate.getTime()) {
                    this.setState({ errEndDate: Strings.txtErrEndDate })
                    valid = false;
                } else {
                    this.setState({ errEndDate: null })
                }
            } else {
                this.setState({ errEndDate: null })
            }
        }
        return valid;
    }
    validateStepThree = () => {
        let valid = true;

        if (!this.state.isAllAge) {
            let validMinimumAge = this.state.minimumAge && this.state.minimumAge != "" && numberValidate(this.state.minimumAge);
            if (!validMinimumAge) this.setState({ errMinimumAge: Strings.txtErrMinimumAge });
            else this.setState({ errMinimumAge: null })
            valid &= validMinimumAge;

            let validMaximumAge = this.state.maximumAge && this.state.maximumAge != "" && numberValidate(this.state.maximumAge);
            if (!validMaximumAge) this.setState({ errMaximumAge: Strings.txtErrMaximumAge });
            else this.setState({ errMaximumAge: null })


            if (validMinimumAge && validMaximumAge) {
                if (Number(this.state.minimumAge) > Number(this.state.maximumAge)) {
                    validMaximumAge = false;
                    this.setState({ errMaximumAge: Strings.txtErrMaximumAgeCompare });
                }
            }
            valid &= validMaximumAge;

        } else {
            this.setState({ errMinimumAge: null, errMaximumAge: null })
        }

        if (!this.state.isAllGender) {
            let validGender = this.state.gender && this.state.gender != "";
            if (!validGender) this.setState({ errGender: Strings.txtErrGender });
            else this.setState({ errGender: null })
            valid &= validGender;
        } else {
            this.setState({ errGender: null })
        }
        if (!this.state.isAllDepartment) {
            let validDepartment = this.state.departmentID && this.state.departmentID != "";
            if (!validDepartment) this.setState({ errDepartment: Strings.txtErrDepartment });
            else this.setState({ errDepartment: null })
            valid &= validDepartment;
        } else {
            this.setState({ errDepartment: null })
        }
        if (!this.state.isAllJob) {
            let validJob = this.state.jobID && this.state.jobID != "";
            if (!validJob) this.setState({ errJob: Strings.txtErrJob });
            else this.setState({ errJob: null })
            valid &= validJob;
        } else {
            this.setState({ errJob: null })
        }

        if (!this.state.isAllHealthRisk) {
            let validHealthRisk = this.state.healthRiskID && this.state.healthRiskID != "";
            if (!validHealthRisk) this.setState({ errHealthRisk: Strings.txtErrHealthRisk });
            else this.setState({ errHealthRisk: null })
            valid &= validHealthRisk;
        } else {
            this.setState({ errHealthRisk: null })
        }


        return valid;
    }
    validateForm = () => {
        let valid = true;
        valid &= this.validateStepOne()
        valid &= this.validateStepTwo()
        valid &= this.validateStepThree()

        return valid;
    }

    componentDidMount() {
        const { challengeID, isEdit } = this.props;
        if (isEdit && challengeID) {
            this.props.challengeStore.findOneChallenge(challengeID)
                .then(detailChallenge => {
                    console.log("detail", detailChallenge);
                    let totalTarget = detailChallenge.totalTarget;
                    if (totalTarget && detailChallenge.category == "sleeps") {
                        totalTarget = convertMilisecondsToHours(totalTarget);
                    }
                    this.setState({
                        challengeIDCode: detailChallenge.challengeIDCode,
                        title: detailChallenge.title,
                        titleLangInd: detailChallenge.titleLangInd,
                        imageUrl: detailChallenge.imageUrl,
                        category: detailChallenge.category,
                        description: detailChallenge.description,
                        descriptionLangInd: detailChallenge.descriptionLangInd,
                        totalTarget: totalTarget,
                        rewardPrize: detailChallenge.rewardPoint,
                        isAllAge: detailChallenge.isAllAge,
                        minimumAge: detailChallenge.minAge,
                        maximumAge: detailChallenge.maxAge,
                        isAllHealthRisk: detailChallenge.isAllHealthRisk,
                        healthRiskID: detailChallenge.healthRiskID,
                        isAllGender: detailChallenge.isAllGender,
                        gender: detailChallenge.gender,
                        isAllJob: detailChallenge.isAllJob,
                        jobID: detailChallenge.jobID,
                        isAllDepartment: detailChallenge.isAllDepartment,
                        departmentID: detailChallenge.departmentID,
                        isRepeat: detailChallenge.isRepeat,
                        repeatFor: detailChallenge.repeatCnt,
                        repeatFrequency: detailChallenge.repeatFrequencyType,
                        startDate: new Date(detailChallenge.startDate),
                        endDate: new Date(detailChallenge.endDate),
                    })
                })
                .catch(error => {
                    this.props.history.replace(Constants.error.errorUrl)
                })
        }

        this.props.jobStore.findAllJobs()
            .then(jobs => {
                this.setState({ jobs: jobs })
            })

        this.props.departmentStore.findAllDepartments()
            .then(departments => {
                this.setState({ departments: departments })
            })

        this.props.healthRiskStore.findAllHealthRisks()
            .then(healthRisks => {
                this.setState({ healthRisks: healthRisks })
            })

    }

    onSave = () => {
        const {
            title,
            titleLangInd,
            category,
            description,
            descriptionLangInd,
            imageUrl,
            period,
            totalTarget,
            rewardPrize,
            isAllAge,
            minimumAge,
            maximumAge,
            isAllGender,
            gender,
            isAllJob,
            jobID,
            isAllDepartment,
            departmentID,
            isAllHealthRisk,
            healthRiskID,
            isRepeat,
            repeatFrequency,
            repeatFor,
            startDate,
            endDate } = this.state;
        if (!this.props.isEdit) {
            let convertedTotalTarget = totalTarget;
            if (convertedTotalTarget && category == "sleeps") {
                convertedTotalTarget = convertHoursToMiliseconds(totalTarget);
            }
            if (this.validateForm()) {
                let body = {
                    title,
                    titleLangInd,
                    descriptionLangInd,
                    imageUrl,
                    period,
                    category,
                    description,
                    totalTarget: convertedTotalTarget,
                    rewardPoint: rewardPrize,
                    isAllAge,
                    minAge: minimumAge,
                    maxAge: maximumAge,
                    isAllGender,
                    gender,
                    isAllJob,
                    jobID: jobID,
                    isAllDepartment,
                    departmentID,
                    isAllHealthRisk,
                    healthRiskID,
                    isRepeat,
                    repeatFrequencyType: repeatFrequency,
                    repeatCnt: repeatFor,
                    startDate,
                    endDate
                }
                if (isAllAge) {
                    body.minAge = null;
                    body.maxAge = null;
                }
                if (isAllJob) {
                    body.jobID = null;
                }
                if (isAllGender) {
                    body.gender = null;
                }
                if (isAllHealthRisk) {
                    body.healthRiskID = null;
                }
                if (isAllDepartment) {
                    body.departmentID = null;
                }
                console.log("body", body);
                this.props.challengeStore.createChallenge(body)
                    .then(created => {
                        toast(Strings.txtChallengeCreateSuccess);
                        this.props.history.go(-1);
                    })
                    .catch(err => {
                        console.log("faild", err);
                        toast(Strings.txtUnexpectedError);
                    });
            }
        }
    }

    uploadImage = (path) => {
        this.props.challengeStore.uploadImage(path, "challenge")
            .then(data => {
                if (data && data.path) {
                    this.setState({ imageUrl: data.path, errImageUrl: null });
                }
            })
    }

    onDelete = () => {
        const { challengeID } = this.props;
        if (window.confirm('Are you sure you wish to delete this challenge?')) {
            this.onDeleteChallenge(challengeID)
        }
    }
    onDeleteChallenge = (id) => {
        this.props.challengeStore.deleteChallenge(id)
            .then(deleted => {
                toast(Strings.txtChallengeDeleteSuccess);
                this.props.history.go(-1);
            })
    }

    render() {
        const { isEdit } = this.props;
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.CREATE);
        const permissionUpdate = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.UPDATE);
        const permissionDelete = checkPermissionAllowed(Constants.PAGE.CHALLENGE, Constants.PAGE_PERMISSION.DELETE);

        return <div className="cw-default-form-container">
            <div className="form-container">
                <div className="cw-default-form-section-header-container">
                    <div className="cw-default-form-section-bubble-number">
                        {1}
                    </div>
                    <div className="cw-default-form-section-title">
                        {Strings.txtChallengeSectionTitleSpecify}
                    </div>
                </div>
                <div className="cw-default-form-section-content-container">
                    <div className="cw-default-form-section-line">
                        <div className="cw-vertical-line" />
                    </div>
                    <div className="cw-default-form-section-content">
                        {
                            isEdit &&
                            <CTextInput containerStyle={{ width: '320px' }}
                                label={Strings.txtFieldChallengeID}
                                value={this.state.challengeIDCode}
                                placeholder={Strings.txtFieldChallengeID}
                                disable />
                        }

                        <CSelectInput containerStyle={{ width: '320px', marginBottom: '16px' }}
                            data={Constants.callengeCategories}
                            label={Strings.txtFieldChallengeCategory}
                            placeholder={Strings.txtFieldChallengeCategory}
                            selectedItemID={this.state.category}
                            onItemSelected={(item) => { this.setState({ category: item.id, errCategory: null }) }}
                            placeholder={Strings.txtFieldChallengeCategory}
                            error={this.state.errCategory}
                            disable={isEdit} />
                        <CTextInput containerStyle={{ width: '320px' }}
                            label={Strings.txtFieldTitle}
                            value={this.state.title}
                            placeholder={Strings.txtFieldTitle}
                            onChangeValue={(value) => { this.setState({ title: value, errTitle: null }) }}
                            error={this.state.errTitle}
                            disable={isEdit} />
                        <CTextInput containerStyle={{ width: '320px' }}
                            label={Strings.txtFieldTitleInd}
                            value={this.state.titleLangInd}
                            placeholder={Strings.txtFieldTitleInd}
                            onChangeValue={(value) => { this.setState({ titleLangInd: value, errTitleInd: null }) }}
                            error={this.state.errTitleInd}
                            disable={isEdit} />
                        <CMImagePicker
                            label={Strings.txtFieldChallengeImage}
                            buttonLabel={Strings.txtBtnBrowse}
                            description={Strings.txtImageSizeChallengeDesc}
                            isUploading={this.props.challengeStore.isLoadingImage}
                            imageUrl={this.state.imageUrl}
                            onClearImage={() => { this.setState({ imageUrl: null }) }}
                            onSelectImage={(imgURL, file) => {
                                this.uploadImage(file);
                            }}
                            isRemoteUrlOnly
                            // error={this.state.errImageUrl}
                            disable={isEdit} />


                        <CTextArea containerStyle={{ width: '320px', marginTop: '16px' }}
                            label={Strings.txtFieldDescription}
                            placeholder={Strings.txtFieldDescription}
                            value={this.state.description}
                            onChangeValue={(value) => { this.setState({ description: value }) }}
                            error={this.state.errDescription}
                            disable={isEdit} />
                        <CTextArea containerStyle={{ width: '320px', marginTop: '16px' }}
                            label={Strings.txtFieldDescriptionInd}
                            placeholder={Strings.txtFieldDescriptionInd}
                            value={this.state.descriptionLangInd}
                            error={this.state.errDescriptionInd}
                            onChangeValue={(value) => { this.setState({ descriptionLangInd: value }) }}
                            disable={isEdit} />
                        <div className={"cw-row"}>
                            <CTextInput containerStyle={{ width: '320px' }}
                                label={Strings.txtFieldTotalTarget}
                                placeholder={Strings.txtFieldTotalTarget}
                                value={this.state.totalTarget}
                                onChangeValue={(value) => { this.setState({ totalTarget: value }, () => { this.validateStepOne() }) }}
                                error={this.state.errTotalTarget}
                                disable={isEdit} />
                            <CTextInput containerStyle={{ width: '320px', marginLeft: '16px' }}
                                label={Strings.txtFieldReward}
                                placeholder={Strings.txtFieldReward}
                                value={this.state.rewardPrize}
                                onChangeValue={(value) => { this.setState({ rewardPrize: value }, () => { this.validateStepOne() }) }}
                                error={this.state.errRewardPrize}
                                disable={isEdit} />
                        </div>


                    </div>
                </div>
                <div className="cw-default-form-section-header-container">
                    <div className="cw-default-form-section-bubble-number">
                        {2}
                    </div>
                    <div className="cw-default-form-section-title">
                        {Strings.txtChallengeSectionTitleChoosePeriod}
                    </div>
                </div>
                <div className="cw-default-form-section-content-container">
                    <div className="cw-default-form-section-line">
                        <div className="cw-vertical-line" />
                    </div>
                    <div className="cw-default-form-section-content">
                        {/*
                        <CMRadioGroup 
                            direction={'row'} 
                            lineCount={1}
                            numPerLine={2}
                            data={repeatSelect}
                            selectedItemID={this.state.isRepeat}
                            onItemSelect={(item)=>{ this.setState({isRepeat: item.id === true}) }}
                            customItemStyle={{width:'320px'}}
                            disable={isEdit}
                        />
                        */}

                        {
                            this.state.isRepeat ?
                                <div className={"cw-column"} style={{ marginTop: '0px' }}>
                                    <CSelectInput containerStyle={{ width: '320px', marginTop: '16px' }}
                                        data={Constants.repeatFrequency}
                                        label={Strings.txtRepeatFrequency}
                                        placeholder={Strings.txtRepeatFrequency}
                                        selectedItemID={this.state.repeatFrequency}
                                        onItemSelected={(item) => { this.setState({ repeatFrequency: item.id, errRepeatFrequency: null }) }}
                                        error={this.state.errRepeatFrequency}
                                        disable={isEdit} />
                                    <div className={"cw-row"}>
                                        <CDatePicker containerStyle={{ width: '320px' }}
                                            label={Strings.txtFieldStartDate}
                                            selected={this.state.startDate}
                                            placeholderText={Strings.txtFieldStartDate}
                                            onChange={(value) => { this.setState({ startDate: value, errStartDate: null }) }}
                                            error={this.state.errStartDate}
                                            disable={isEdit} />
                                        <CTextInput containerStyle={{ width: '320px', marginLeft: '16px' }}
                                            label={Strings.txtRepeatForOnly}
                                            placeholder={Strings.txtRepeatForOnly}
                                            value={this.state.repeatFor}
                                            onChangeValue={(value) => { this.setState({ repeatFor: value, errRepeatFor: null }) }}
                                            error={this.state.errRepeatFor}
                                            disable={isEdit} />
                                    </div>


                                </div>
                                :
                                <div className={"cw-row"} style={{ marginTop: '16px' }}>
                                    <CDatePicker containerStyle={{ width: '320px' }}
                                        label={Strings.txtFieldStartDate}
                                        selected={this.state.startDate}
                                        placeholderText={Strings.txtFieldStartDate}
                                        onChange={(value) => { this.setState({ startDate: value, errStartDate: null }) }}
                                        error={this.state.errStartDate}
                                        disable={isEdit} />
                                    <CDatePicker containerStyle={{ width: '320px', marginLeft: '16px' }}
                                        label={Strings.txtFieldEndDate}
                                        selected={this.state.endDate}
                                        placeholderText={Strings.txtFieldEndDate}
                                        onChange={(value) => {
                                            var dateString = Moment(value).format('YYYY-MM-DD');
                                            var newDateObj = Moment(dateString).add(23, 'h').add(59, 'm').add(59, 's').toDate();

                                            this.setState({ endDate: newDateObj }, () => { this.validateStepTwo() })
                                        }}
                                        error={this.state.errEndDate}
                                        disable={isEdit} />
                                </div>
                        }
                    </div>
                </div>
                <div className="cw-default-form-section-header-container">
                    <div className="cw-default-form-section-bubble-number">
                        {3}
                    </div>
                    <div className="cw-default-form-section-title">
                        {Strings.txtChallengeSectionTitleChooseRange}
                    </div>
                </div>
                <div className="cw-default-form-section-content-container">
                    <div className="cw-default-form-section-line">
                    </div>
                    <div className="cw-default-form-section-content">
                        <div className="cw-default-form-sub-section" style={{ marginBottom: '16px' }}>
                            {Strings.txtSectionAge}
                        </div>
                        <CMRadioGroup
                            direction={'row'}
                            lineCount={1}
                            numPerLine={2}
                            data={ageSelect}
                            selectedItemID={this.state.isAllAge}
                            onItemSelect={(item) => { this.onAgeSelect(item) }}
                            customItemStyle={{ width: '320px' }}
                            disable={isEdit}
                        />
                        {
                            !this.state.isAllAge &&
                            <div className={"cw-row"} style={{ marginTop: '16px' }}>
                                <CTextInput containerStyle={{ width: '320px' }}
                                    label={Strings.txtFieldMinimumAge}
                                    placeholder={Strings.txtFieldMinimumAge}
                                    value={this.state.minimumAge}
                                    error={this.state.errMinimumAge}
                                    onChangeValue={(value) => { this.setState({ minimumAge: value }) }}
                                    disable={isEdit} />
                                <CTextInput containerStyle={{ width: '320px', marginLeft: '16px' }}
                                    label={Strings.txtFieldMaximumAge}
                                    placeholder={Strings.txtFieldMaximumAge}
                                    value={this.state.maximumAge}
                                    error={this.state.errMaximumAge}
                                    onChangeValue={(value) => { this.setState({ maximumAge: value }) }}
                                    disable={isEdit} />
                            </div>
                        }
                        <div className="cw-default-form-sub-section" style={{ marginBottom: '16px', marginTop: '16px' }}>
                            {Strings.txtSectionGender}
                        </div>
                        <CMRadioGroup
                            direction={'row'}
                            lineCount={1}
                            numPerLine={2}
                            data={genderSelect}
                            selectedItemID={this.state.isAllGender}
                            onItemSelect={(item) => { this.setState({ isAllGender: item.id === true }) }}
                            customItemStyle={{ width: '320px' }}
                            disable={isEdit}
                        />
                        {
                            !this.state.isAllGender &&
                            <CSelectInput containerStyle={{ width: '320px', marginTop: '16px' }}
                                data={Constants.genders}
                                label={Strings.txtFieldGender}
                                placeholder={Strings.txtFieldGender}
                                selectedItemID={this.state.gender}
                                error={this.state.errGender}
                                onItemSelected={(item) => { this.setState({ gender: item.id }) }}
                                disable={isEdit} />
                        }
                        <div className="cw-default-form-sub-section" style={{ marginBottom: '16px', marginTop: '16px' }}>
                            {Strings.txtJobLevel}
                        </div>
                        <CMRadioGroup
                            direction={'row'}
                            lineCount={1}
                            numPerLine={2}
                            data={jobSelect}
                            selectedItemID={this.state.isAllJob}
                            onItemSelect={(item) => { this.setState({ isAllJob: item.id === true }) }}
                            customItemStyle={{ width: '320px' }}
                            disable={isEdit}
                        />
                        {
                            !this.state.isAllJob &&
                            <CSelectInput containerStyle={{ width: '320px', marginTop: '16px' }}
                                data={this.state.jobs}
                                label={Strings.txtFieldJobLevel}
                                placeholder={Strings.txtFieldJobLevel}
                                selectedItemID={this.state.jobID}
                                error={this.state.errJob}
                                onItemSelected={(item) => { this.setState({ jobID: item.id }) }}
                                disable={isEdit} />
                        }
                        <div className="cw-default-form-sub-section" style={{ marginBottom: '16px', marginTop: '16px' }}>
                            {Strings.txtDepartment}
                        </div>
                        <CMRadioGroup
                            direction={'row'}
                            lineCount={1}
                            numPerLine={2}
                            data={departmentSelect}
                            selectedItemID={this.state.isAllDepartment}
                            onItemSelect={(item) => { this.setState({ isAllDepartment: item.id === true }) }}
                            customItemStyle={{ width: '320px' }}
                            disable={isEdit}
                        />
                        {
                            !this.state.isAllDepartment &&
                            <CSelectInput containerStyle={{ width: '320px', marginTop: '16px' }}
                                data={this.state.departments}
                                label={Strings.txtFieldDepartment}
                                placeholder={Strings.txtFieldDepartment}
                                selectedItemID={this.state.departmentID}
                                error={this.state.errDepartment}
                                onItemSelected={(item) => { this.setState({ departmentID: item.id }) }}
                                disable={isEdit} />
                        }
                        <div className="cw-default-form-sub-section" style={{ marginBottom: '16px', marginTop: '16px' }}>
                            {Strings.txtHealthRisk}
                        </div>
                        <CMRadioGroup
                            direction={'row'}
                            lineCount={1}
                            numPerLine={2}
                            data={healthRiskSelect}
                            selectedItemID={this.state.isAllHealthRisk}
                            onItemSelect={(item) => { this.setState({ isAllHealthRisk: item.id === true }) }}
                            customItemStyle={{ width: '320px' }}
                            disable={isEdit}
                        />
                        {
                            !this.state.isAllHealthRisk &&
                            <CSelectInput containerStyle={{ width: '320px', marginTop: '16px' }}
                                data={this.state.healthRisks}
                                label={Strings.txtFieldHealthRisk}
                                placeholder={Strings.txtFieldHealthRisk}
                                selectedItemID={this.state.healthRiskID}
                                error={this.state.errHealthRisk}
                                onItemSelected={(item) => { this.setState({ healthRiskID: item.id }) }}
                                disable={isEdit} />
                        }
                        <div className="cw-row" style={{ marginTop: "23px" }}>
                            {
                                !isEdit && permissionCreate &&
                                <CButton containerStyle={{ width: "136px" }}
                                    isLoading={this.props.challengeStore.isLoading}
                                    onClick={() => { this.onSave() }}>{Strings.txtBtnSave}</CButton>
                            }

                            {
                                isEdit && permissionDelete &&
                                <CButton containerStyle={{ width: "136px" }} type="cancel" onClick={() => { this.onDelete() }}>{Strings.txtBtnDelete}</CButton>
                            }

                        </div>

                    </div>
                </div>
            </div>

        </div>
    }
}

export default inject('challengeStore', 'jobStore', 'departmentStore', 'healthRiskStore')(observer(ChallengeForm));
