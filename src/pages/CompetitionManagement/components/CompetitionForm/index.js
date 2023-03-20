import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CTextArea } from '../../../../components/atoms'
import { CMImagePicker } from '../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../constants';
import { inject, observer } from "mobx-react";
import './style.scss'
import { toast } from 'react-toastify';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';
import Moment from 'moment';
class CompetitionForm extends Component {
    constructor(props) {
        super(props);
        const role = getRole();

        this.state = {
            competitionIDCode: null,
            name: null,
            bannerUrl: null,
            description: null,
            descriptionLangInd: null,
            shortDescription: null,
            shortDescriptionLangInd: null,
            startDate: null,
            endDate: null,
            numberOfWinners: null,
            numberOfTeams: null,
            isSuperAdmin: role == 'superadmin',
            errTitle: null,
            errPayor: null,
            errImageUrl: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.competitionID != prevProps.competitionID) {
            this.onReload();
        }
    }
    onReload() {
        const { competitionID, isEdit } = this.props;
        if (isEdit && competitionID) {
            this.props.competitionStore.findOneCompetition(competitionID)
                .then(detailCompetition => {
                    this.setState({
                        competitionIDCode: detailCompetition.competitionIDCode,
                        name: detailCompetition.name,
                        nameLangInd: detailCompetition.nameLangInd,
                        bannerUrl: detailCompetition.bannerUrl,
                        description: detailCompetition.description,
                        descriptionLangInd: detailCompetition.descriptionLangInd,
                        shortDescription: detailCompetition.shortDescription,
                        shortDescriptionLangInd: detailCompetition.shortDescriptionLangInd,
                        startDate: new Date(detailCompetition.startDate),
                        endDate: new Date(detailCompetition.endDate),
                        numberOfWinners: detailCompetition.numberOfWinners,
                    })
                })
                .catch(error => {
                    this.props.history.replace(Constants.error.errorUrl)
                })
        }
    }
    componentDidMount() {
        this.onReload();
    }

    uploadImage = (path) => {
        this.props.competitionStore.uploadImage(path, "competition")
            .then(data => {
                if (data && data.path) {
                    this.setState({ bannerUrl: data.path, errImageUrl: null });
                }
            })
    }

    onSave = () => {
        const { teamConfigration } = this.props.competitionStore;
        const {
            name,
            nameLangInd,
            bannerUrl,
            description,
            descriptionLangInd,
            shortDescription,
            shortDescriptionLangInd,
            startDate,
            endDate,
            numberOfWinners,
            numberOfTeams
        } = this.state;
        if (!this.props.isEdit) {
            if (this.validateForm()) {
                let body = {
                    name,
                    nameLangInd,
                    bannerUrl,
                    description,
                    descriptionLangInd,
                    shortDescription,
                    shortDescriptionLangInd,
                    startDate,
                    endDate,
                    numberOfWinners
                }

                this.props.competitionStore.createCompetition(body)
                    .then(created => {

                        if (teamConfigration == Constants.teamConfigration.MANUALLY) {
                            toast(Strings.txtCompetitionCreateSuccess);
                            if (this.props.onNext) {
                                this.props.onNext();
                            }
                        } else {
                            if (created && created.id) {
                                let input = {
                                    totalTeam: numberOfTeams,
                                    competitionID: created.id
                                }
                                this.props.competitionTeamStore.generateTeams(input)
                                    .then(generatedTeams => {
                                        toast(Strings.txtCompetitionCreateSuccess);
                                        if (this.props.onNext) {
                                            this.props.onNext();
                                        }
                                    })
                                    .catch(err => {
                                        console.log("err", err);
                                        toast(Strings.txtUnexpectedError);
                                    });
                            }
                        }

                    })
                    .catch(err => {
                        toast(Strings.txtUnexpectedError);
                    });
            }
        } else {
            if (this.validateForm()) {
                let body = {
                    name,
                    nameLangInd,
                    bannerUrl,
                    description,
                    descriptionLangInd,
                    shortDescription,
                    shortDescriptionLangInd,
                    startDate,
                    endDate,
                    numberOfWinners
                }
                this.props.competitionStore.updateCompetition(this.props.competitionID, body)
                    .then(updated => {
                        if (this.props.onNext) {
                            this.props.onNext();
                        }
                        toast(Strings.txtCompetitionUpdateSuccess);
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
        const { detailCompetition, teamConfigration } = this.props.competitionStore;
        const { isEdit } = this.props;
        let validName = this.state.name && this.state.name != "";
        if (!validName) this.setState({ errName: Strings.txtErrTitleRequired })
        else this.setState({ errName: null })
        valid &= validName;

        let validNameLangInd = this.state.nameLangInd && this.state.nameLangInd != "";
        if (!validNameLangInd) this.setState({ errNameLangInd: Strings.txtErrTitleRequired })
        else this.setState({ errNameLangInd: null })
        valid &= validNameLangInd;

        let validNumberOfWinners = this.state.numberOfWinners && this.state.numberOfWinners != "";
        if (!validNumberOfWinners) this.setState({ errNumberOfWinners: Strings.txtErrNumberOfWinners });
        else this.setState({ errNumberOfWinners: null })

        valid &= validNumberOfWinners;
        if (teamConfigration == Constants.teamConfigration.AUTOMATICALLY) {
            let validNumberOfTeams = this.state.numberOfTeams && this.state.numberOfTeams > 0;
            if (!validNumberOfTeams) this.setState({ errNumberOfTeams: Strings.txtErrNumberOfTeams });
            else this.setState({ validNumberOfTeams: null })
            valid &= validNumberOfTeams;
        }


        let validStartDate = this.state.startDate && this.state.startDate != "";
        if (!validStartDate) this.setState({ errStartDate: Strings.txtErrStartDate });
        else this.setState({ errStartDate: null })
        valid &= validStartDate;

        let validEndDate = this.state.endDate && this.state.endDate != "";
        if (!validEndDate) this.setState({ errEndDate: Strings.txtErrEndDate });
        else this.setState({ errStartDate: null })
        valid &= validEndDate;


        if (this.state.startDate && this.state.endDate) {
            let endDate = new Date(this.state.endDate);
            let startDate = new Date(this.state.startDate);
            if (endDate.getTime() < startDate.getTime()) {
                this.setState({ errEndDate: Strings.txtErrEndDate })
                valid = false;
            }
            if (isEdit && detailCompetition) {
                let oldEndDate = new Date(detailCompetition.endDate);
                if (endDate.getTime() < oldEndDate.getTime()) {
                    this.setState({ errEndDate: Strings.txtErrEndDateExtend })
                    valid = false;
                } else if (validEndDate) {
                    this.setState({ errEndDate: null })
                }
            }
        }


        return valid;
    }
    onDelete = () => {
        const { competitionID } = this.props;
        if (window.confirm('Are you sure you wish to delete this competition?')) {
            this.onDeleteCompetition(competitionID)
        }
    }
    onDeleteCompetition = (id) => {
        this.props.competitionStore.deleteCompetition(id)
            .then(deleted => {
                toast(Strings.txtCompetitionDeleteSuccess);
                this.props.history.go(-1);
            })
    }
    render() {
        const { isEdit } = this.props;
        const { isSuperAdmin } = this.state;
        const payors = this.props.payorStore.allPayors || [];
        const { teamConfigration } = this.props.competitionStore;
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.CREATE);
        const permissionUpdate = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.UPDATE);
        const permissionDelete = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.DELETE);

        return <div className="cw-competition-form-container">
            <div className="form-container">
                {
                    isEdit &&
                    <CTextInput containerStyle={{ width: '320px', marginTop: '16px' }}
                        label={Strings.txtFieldCompetitionID}
                        value={this.state.competitionIDCode}
                        placeholder={Strings.txtFieldCompetitionID}
                        disable />
                }
                <CMImagePicker
                    containerStyle={{ marginTop: '16px' }}
                    label={Strings.txtFieldCompetitionBanner}
                    buttonLabel={Strings.txtBtnBrowse}
                    description={Strings.txtImageSizeChallengeDesc}
                    imageUrl={this.state.bannerUrl}
                    isUploading={this.props.competitionStore.isLoadingImage}
                    onClearImage={() => { this.setState({ bannerUrl: null }) }}
                    onSelectImage={(imgURL, file) => {
                        this.uploadImage(file);
                    }}
                    // error={this.state.errImageUrl}
                    isRemoteUrlOnly
                />
                <div className="cw-row" style={{ marginTop: '16px' }}>
                    <CTextInput containerStyle={{ width: '320px' }}
                        label={Strings.txtFieldCompetitionTitle}
                        value={this.state.name}
                        placeholder={Strings.txtFieldCompetitionTitle}
                        error={this.state.errName}
                        onChangeValue={(value) => { this.setState({ name: value, errName: null }) }}
                        disable={isEdit} />

                    <CTextInput containerStyle={{ width: '320px', marginLeft: '16px' }}
                        label={Strings.txtFieldCompetitionTitleInd}
                        value={this.state.nameLangInd}
                        placeholder={Strings.txtFieldCompetitionTitleInd}
                        error={this.state.errNameLangInd}
                        onChangeValue={(value) => { this.setState({ nameLangInd: value, errNameLangInd: null }) }}
                        disable={isEdit} />
                </div>
                <div className="cw-row">
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
                            this.setState({ endDate: newDateObj }, () => { this.validateForm() })
                        }}
                        error={this.state.errEndDate}
                    />
                </div>
                <div className="cw-row">
                    {
                        !isEdit &&
                        <CSelectInput containerStyle={{ width: '320px' }}
                            data={Constants.competitionCreationWays}
                            label={Strings.txtFieldTeamConfigration}
                            selectedItemID={teamConfigration}
                            onItemSelected={(item) => { this.props.competitionStore.updateTeamConfigration(item.id) }}
                            placeholder={Strings.txtFieldTeamConfigration} />
                    }
                    {
                        isEdit || teamConfigration == Constants.teamConfigration.MANUALLY ?
                            <CTextInput containerStyle={{ width: '320px', marginLeft: isEdit ? '0px' : '16px' }}
                                label={Strings.txtFieldNumberOfWinners}
                                value={this.state.numberOfWinners}
                                placeholder={Strings.txtFieldNumberOfWinners}
                                error={this.state.errNumberOfWinners}
                                disable={isEdit}
                                onChangeValue={(value) => { this.setState({ numberOfWinners: Number(value), errNumberOfWinners: null }) }} />
                            :
                            <CTextInput containerStyle={{ width: '320px', marginLeft: '16px' }}
                                label={Strings.txtFieldNumberOfTeams}
                                value={this.state.numberOfTeams}
                                placeholder={Strings.txtFieldNumberOfTeams}
                                error={this.state.errNumberOfTeams}
                                onChangeValue={(value) => { this.setState({ numberOfTeams: Number(value), errNumberOfTeams: null }) }} />
                    }
                </div>
                {
                    !isEdit && teamConfigration == Constants.teamConfigration.AUTOMATICALLY &&
                    <CTextInput containerStyle={{ width: '320px' }}
                        label={Strings.txtFieldNumberOfWinners}
                        value={this.state.numberOfWinners}
                        placeholder={Strings.txtFieldNumberOfWinners}
                        error={this.state.errNumberOfWinners}
                        onChangeValue={(value) => { this.setState({ numberOfWinners: Number(value), errNumberOfWinners: null }) }} />
                }
                <div className="cw-row">
                    <CTextArea containerStyle={{ width: '320px' }}
                        label={Strings.txtFieldShortDescription}
                        placeholder={Strings.txtFieldShortDescription}
                        value={this.state.shortDescription}
                        onChangeValue={(value) => { this.setState({ shortDescription: value }) }} />
                    <CTextArea containerStyle={{ width: '320px', marginLeft: '16px' }}
                        label={Strings.txtFieldShortDescriptionInd}
                        placeholder={Strings.txtFieldShortDescriptionInd}
                        value={this.state.shortDescriptionLangInd}
                        onChangeValue={(value) => { this.setState({ shortDescriptionLangInd: value }) }} />
                </div>
                <div className="cw-row">
                    <CTextArea containerStyle={{ width: '320px' }}
                        label={Strings.txtFieldDescription}
                        placeholder={Strings.txtFieldDescription}
                        value={this.state.description}
                        onChangeValue={(value) => { this.setState({ description: value }) }} />
                    <CTextArea containerStyle={{ width: '320px', marginLeft: '16px' }}
                        label={Strings.txtFieldDescriptionInd}
                        placeholder={Strings.txtFieldDescriptionInd}
                        value={this.state.descriptionLangInd}
                        onChangeValue={(value) => { this.setState({ descriptionLangInd: value }) }} />
                </div>
                <div className="cw-row" style={{ marginTop: "23px", marginBottom: "16px" }}>
                    {
                        ((isEdit && permissionUpdate) || (!isEdit && permissionCreate)) &&
                        <CButton containerStyle={{ width: "136px" }}
                            isLoading={this.props.competitionStore.isLoading || this.props.competitionTeamStore.isLoading}
                            onClick={() => { this.onSave() }}>{Strings.txtBtnNext}</CButton>
                    }

                    {
                        isEdit && permissionDelete &&
                        <CButton containerStyle={{ width: "136px", marginLeft: "16px" }} type="delete" onClick={() => { this.onDelete() }}>{Strings.txtBtnDelete}</CButton>
                    }
                </div>




            </div>

        </div>
    }
}

export default inject('payorStore', 'competitionStore', 'competitionTeamStore')(observer(CompetitionForm));