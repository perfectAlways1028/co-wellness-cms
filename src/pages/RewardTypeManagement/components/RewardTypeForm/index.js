import React, { Component } from 'react';
import { CButton, CSelectInput, CTextInput, CDatePicker } from '../../../../components/atoms'
import { Strings, Constants } from '../../../../constants';
import { inject, observer } from "mobx-react";
import { toast } from 'react-toastify';
class RewardTypeForm extends Component {
    constructor(props) {
        super(props);
  
        if(props.isEdit) {
            this.state = {
          
            };
        } else {
            this.state = {
                rewardTypeIDCode: null,
                name: null,
            };
        }
    }
    componentDidMount() {
        const { rewardTypeID, isEdit } = this.props;
        if( isEdit && rewardTypeID ) {
            this.props.rewardTypeStore.findOneRewardType(rewardTypeID)
            .then(detailRewardType => {
                  this.setState({
                    rewardTypeIDCode: detailRewardType.rewardCategoryIDCode,
                    name: detailRewardType.name,
                   
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
        }
 
    } 
    onSave = () => {
        const {  
            name,
            } = this.state;
        if( !this.props.isEdit ) {
            if( this.validateForm() ) {
                let body = {
                    name,
                }

                this.props.rewardTypeStore.createRewardType(body)
                .then(created => {
                    toast(Strings.txtRewardTypeCreateSuccess);
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
                   name,
                }
                this.props.rewardTypeStore.updateRewardType(this.props.rewardTypeID, body)
                .then(updated => {
                    toast(Strings.txtRewardTypeUpdateSuccess);
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

        let validName = this.state.name && this.state.name != "";
        if(!validName) this.setState({errName: Strings.txtErrNameRequired})
        else this.setState({errName: null})
        valid &= validName;

        return valid;
    }
    onDelete = () => {
        const { rewardTypeID } = this.props;
        if (window.confirm('Are you sure you wish to delete this reward type?'))  {
            this.onDeleteRewardType(rewardTypeID) 
        }
    }
    onDeleteRewardType = (id) => {
        this.props.rewardTypeStore.deleteRewardType(id)
        .then(deleted => {
            toast(Strings.txtRewardTypeDeleteSuccess);
            this.props.history.go(-1);
        })
    }
    render() {
        const { isEdit } = this.props;
        return <div className="cw-default-form-container"> 
            <div className="form-container">
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldRewardsID} 
                            value={this.state.rewardTypeIDCode} 
                            placeholder={Strings.txtFieldRewardsID} 
                            disable />
                }
            <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldRewardType}
                            placeholder={Strings.txtFieldRewardType}
                            value={this.state.name}
                            onChangeValue={(value) => {this.setState({name: value})}}/>
        
        
            <div className="cw-row" style={{ marginTop: "23px"}}>
                <CButton containerStyle={{width: "136px"}}
                         isLoading={this.props.rewardTypeStore.isLoading} 
                         onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>
                {
                    isEdit && 
                    <CButton containerStyle={{width: "136px", marginLeft: "30px"}} type="cancel" onClick={()=>{this.onDelete()}}>{Strings.txtBtnDelete}</CButton>
                }
            
            </div>  

            </div>

        </div>
    }
}


export default inject('rewardTypeStore')(observer(RewardTypeForm));