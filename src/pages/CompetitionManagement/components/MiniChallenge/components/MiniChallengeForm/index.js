import React, { Component } from 'react';
import { CButton, CSelectInput, CTextInput, CTextArea,  CCheckbox, CRadioButton, CDatePicker } from '@components/atoms'

import { Link } from 'react-router-dom';
import { Strings, Constants } from '@constants';
import { inject, observer } from "mobx-react";
import { toast } from 'react-toastify';
import { getRole } from '@helpers/storageHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';
import { numberValidate, phoneNumberValidate, emailValidate } from '@helpers/validator';
import Moment from 'moment';
class MiniChallengeForm extends Component {
    constructor(props) {
        super(props);
        const isEdit = this.props.params? this.props.params.isEdit : false
        if(props.isEdit) {
            this.state = {  

            };
        } else {
            this.state = {
                challengeIDCode: null,
                title: null,
                period: null,
                totalTarget: null,
                rewardPrize: null,
                isRepeat: true,
                repeatFrequency: 'daily',
                repeatFor: null,
                startDate: null,
                endDate: null
            };
        }
    }


    componentDidMount() {
        if(!this.props.params) return;
        const { id, isEdit } = this.props.params;
        if( isEdit && id ) {
            this.props.competitionChallengeStore.findOneCompetitionChallenge(id)
            .then(detailChallenge => {
                  this.setState({
                    challengeIDCode: detailChallenge.challengeIDCode,
                    title: detailChallenge.title,
                    titleLangInd: detailChallenge.titleLangInd,
                    imageUrl: detailChallenge.imageUrl,
                    category: detailChallenge.category,
                    description: detailChallenge.description,
                    descriptionLangInd: detailChallenge.descriptionLangInd,
                    totalTarget: detailChallenge.totalTarget,
                    rewardPrize: detailChallenge.rewardCompetitionPoint,
                    isRepeat: detailChallenge.isRepeat,
                    repeatFor: detailChallenge.repeatCnt,
                    repeatFrequency: detailChallenge.repeatFrequencyType,
                    startDate: new Date(detailChallenge.startDate),
                    endDate: new Date(detailChallenge.endDate),
                })
            })
            .catch(error => {
                //this.props.history.replace(Constants.error.errorUrl)
            })
        }
 
    } 

    onSave = () => {
        const  competitionID = this.props.competitionID;
        const {                 
            title,
            titleLangInd,
            category,
            description,
            descriptionLangInd,
            period,
            totalTarget,
            rewardPrize,
            isRepeat,
            repeatFrequency,
            repeatFor,
            startDate,
            endDate } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    competitionID: competitionID,
                    title,
                    titleLangInd,
                    descriptionLangInd,
                    period,
                    category,
                    description,
                    totalTarget,
                    rewardCompetitionPoint: rewardPrize,
                    isRepeat,
                    repeatFrequencyType: repeatFrequency,
                    repeatCnt: repeatFor,
                    startDate,
                    endDate
                }

                this.props.competitionChallengeStore.createCompetitionChallenge(body)
                .then(created => {
                    toast(Strings.txtChallengeCreateSuccess);
                    this.onCancel();
                })
                .catch(err => {
                    console.log("faild", err);
                    toast(Strings.txtUnexpectedError);
                });
            }
        }
    }
    validateForm = () => {
        const { detailCompetition } = this.props.competitionStore;
        let valid = true;

        let validCategory = this.state.category && this.state.category != "";
        if(!validCategory) this.setState({errCategory: Strings.txtErrChallengeCategory})
        else this.setState({errCategory: null})
        valid &= validCategory;

        let validTitle = this.state.title && this.state.title != "";
        if(!validTitle) this.setState({errTitle: Strings.txtErrTitleRequired})
        else this.setState({errTitle: null})
        valid &= validTitle;
        
        let validTitleInd = this.state.titleLangInd && this.state.titleLangInd != "";
        if(!validTitleInd) this.setState({errTitleInd: Strings.txtErrTitleRequired})
        else this.setState({errTitleInd: null})
        valid &= validTitleInd;

        let validDescription = this.state.description && this.state.description != "";
        if(!validDescription) this.setState({errDescription: Strings.txtErrDescription})
        else this.setState({errDescription: null})
        valid &= validDescription;
        
        let validDescriptionInd = this.state.descriptionLangInd && this.state.descriptionLangInd != "";
        if(!validDescriptionInd) this.setState({errDescriptionInd: Strings.txtErrDescription})
        else this.setState({errDescriptionInd: null})
        valid &= validDescriptionInd;


        let validTotalTarget = this.state.totalTarget && this.state.totalTarget != "" && numberValidate(this.state.totalTarget);
        if(!validTotalTarget) this.setState({errTotalTarget: Strings.txtErrTotalTarget});
        else this.setState({errTotalTarget: null})
        valid &= validTotalTarget;

        let validReward = this.state.rewardPrize && this.state.rewardPrize != "" && numberValidate(this.state.rewardPrize);
        if(!validReward) this.setState({errRewardPrize: Strings.txtErrRewardPrize});
        else this.setState({errRewardPrize: null})
        valid &= validReward;

        let validStartDate = this.state.startDate && this.state.startDate != "";
        if(!validStartDate) this.setState({errStartDate: Strings.txtErrStartDate});
        else this.setState({errStartDate: null})
        valid &= validStartDate;

        if(this.state.isRepeat) {
            this.setState({errEndDate: null})
            let validRepeatFor = this.state.repeatFor && this.state.repeatFor != "" && numberValidate(this.state.repeatFor)
            if(!validRepeatFor) this.setState({errRepeatFor: Strings.txtErrRepeatFor});
            else this.setState({errRepeatFor: null})
            valid &= validRepeatFor;

            
        }else {
            this.setState({errRepeatFor: null, errRepeatFrequency: null})
            if(this.state.startDate && this.state.endDate) {
                let endDate = new Date(this.state.endDate);
                let startDate = new Date(this.state.startDate);
                if(endDate.getTime() < startDate.getTime()) {
                    this.setState({errEndDate: Strings.txtErrEndDate})
                    valid = false;
                }else {
                    this.setState({errEndDate: null})
                }
            }else {
                this.setState({errEndDate: null})
            }
        }
        if(detailCompetition) {
            let competitionStartDate = new Date(detailCompetition.startDate);
            let competitionEndDate = new Date(detailCompetition.endDate);
           
            let startDate = new Date(this.state.startDate);
            let endDate = Moment(startDate).add(this.state.repeatFor, 'days').subtract(1, "seconds") .toDate();
            if(competitionStartDate.getTime() > startDate.getTime()) {
                this.setState({errStartDate: Strings.txtErrStartDateCompetition})
                valid = false;
            }

            //daily
            if(competitionEndDate.getTime() < endDate.getTime()) {
                this.setState({errRepeatFor: Strings.txtErrRepeatForCompetition})
                valid = false;
            }
        }
        
        return valid;
    }
    onDelete = () => {
        if(!this.props.params) return;
        const { id } = this.props.params;
        if (window.confirm('Are you sure you wish to delete this mini challenge?'))  {
            this.onDeleteChallenge(id) 
        }
    }
    onDeleteChallenge = (id) => {
        this.props.competitionChallengeStore.deleteCompetitionChallenge(id)
        .then(deleted => {
            toast(Strings.txtCompetitionChallengeDeleteSuccess);
            this.onCancel();
        })
    }

    onCancel = () => {
        if(this.props.onChangePage) {
            this.props.onChangePage('list')
        }
    }
    render() {
        const isEdit = this.props.params ? this.props.params.isEdit : false
        const { teamConfigration } = this.props.competitionStore;
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.CREATE);
        const permissionUpdate = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.UPDATE);
        const permissionDelete = checkPermissionAllowed(Constants.PAGE.COMPETITION, Constants.PAGE_PERMISSION.DELETE);

        return <div className="form-container"> 
                <div className="header" style={{marginLeft: '0px', paddingLeft: '0px'}}>
                    <div className="title">{isEdit ? Strings.txtMiniChallengeDetail : Strings.txtAddMiniChallenge}</div>
                </div>
                {
                  isEdit &&
                  <CTextInput containerStyle={{width: '320px', marginBottom:'16px'}} 
                          label={Strings.txtFieldChallengeID} 
                          value={this.state.challengeIDCode} 
                          placeholder={Strings.txtFieldChallengeID} 
                          disable />
                }
                <CSelectInput  containerStyle={{width: '320px', marginBottom: '16px'}} 
                            data={Constants.callengeCategories} 
                            label={Strings.txtFieldChallengeCategory} 
                            placeholder={Strings.txtFieldChallengeCategory} 
                            selectedItemID={this.state.category}
                            onItemSelected={(item)=>{this.setState({category: item.id, errCategory: null})}} 
                            placeholder={Strings.txtFieldChallengeCategory}
                            error={this.state.errCategory}
                            disable={isEdit}/>
              
                <div className="cw-row">
                <CTextInput containerStyle={{width: '320px'}} 
                                    label={Strings.txtFieldTotalDailyTarget} 
                                    placeholder={Strings.txtFieldTotalDailyTarget} 
                                    value={this.state.totalTarget}
                                    onChangeValue={(value) => {this.setState({totalTarget: value,  errTotalTarget: null})}}
                                    error={this.state.errTotalTarget}
                                    disable={isEdit}/>
                <CTextInput containerStyle={{width: '320px', marginLeft: '16px'}} 
                    label={Strings.txtFieldRewardDiamond} 
                    placeholder={Strings.txtFieldRewardDiamond} 
                    value={this.state.rewardPrize}
                    onChangeValue={(value) => {this.setState({rewardPrize: value, errRewardPrize: null})}}
                    error={this.state.errRewardPrize}
                    disable={isEdit}/>
                </div>
     
                    <div className={"cw-row"}>
                    <CDatePicker containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldStartDate} 
                        selected={this.state.startDate} 
                        placeholderText={Strings.txtFieldStartDate} 
                        onChange={(value) => {this.setState({startDate: value, errStartDate: null})}}
                        error={this.state.errStartDate}
                        disable={isEdit}/>
                    <CTextInput containerStyle={{width: '320px', marginLeft: '16px'}} 
                        label={Strings.txtRepeatForOnly} 
                        placeholder={Strings.txtRepeatForOnly} 
                        value={this.state.repeatFor}
                        onChangeValue={(value) => {this.setState({repeatFor: value,  errRepeatFor: null})}}
                        error={this.state.errRepeatFor}
                        disable={isEdit}/>
                    </div>
           
               <div className="cw-row">
                    <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldTitle} 
                        value={this.state.title}
                        placeholder={Strings.txtFieldTitle} 
                        onChangeValue={(value) => {this.setState({title: value, errTitle: null})}}
                        error={this.state.errTitle}
                        disable={isEdit}/>
                    <CTextInput containerStyle={{width: '320px', marginLeft: '16px'}} 
                        label={Strings.txtFieldTitleInd} 
                        value={this.state.titleLangInd}
                        placeholder={Strings.txtFieldTitleInd} 
                        onChangeValue={(value) => {this.setState({titleLangInd: value, errTitleInd: null})}}
                        error={this.state.errTitleInd}
                        disable={isEdit}/>
                </div>
                <div className="cw-row">
                    <CTextArea containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldDescription} 
                        placeholder={Strings.txtFieldDescription} 
                        value={this.state.description}
                        error={this.state.errDescription}
                        onChangeValue={(value) => {this.setState({description: value})}}
                        disable={isEdit}/>
                    <CTextArea containerStyle={{width: '320px', marginLeft: '16px'}} 
                        label={Strings.txtFieldDescriptionInd} 
                        placeholder={Strings.txtFieldDescriptionInd} 
                        value={this.state.descriptionLangInd}
                        error={this.state.errDescriptionInd}
                        onChangeValue={(value) => {this.setState({descriptionLangInd: value})}}
                        disable={isEdit}/>
                </div>
                 <div className="cw-row" style={{ marginTop: "23px", marginBottom: "16px"}}>
                     {
                        (!isEdit && permissionCreate) &&
                        <CButton containerStyle={{width: "136px"}} 
                                 isLoading={this.props.competitionChallengeStore.isLoading}
                                 onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>
                     }
                    {
                        isEdit && permissionDelete &&
                        <CButton containerStyle={{width: "136px"}} type="delete" onClick={()=>{this.onDelete()}}>{Strings.txtBtnDelete}</CButton>
                    }
                    {
                        <CButton containerStyle={{width: "136px", marginLeft: "16px"}} type="cancel" onClick={()=>{this.onCancel()}}>{Strings.txtBtnCancel}</CButton>
                    }
                 </div>  


                
            </div>
    }
}

export default inject('competitionChallengeStore', 'competitionStore')(observer(MiniChallengeForm));