import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CTextArea } from '../../../../../components/atoms'
import { CMImagePicker } from '../../../../../components/molecules';
import { Link } from 'react-router-dom';
import { Strings, Constants } from '../../../../../constants';
import { inject, observer } from "mobx-react";

import { toast } from 'react-toastify';
import { convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';


class StairForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stairID: null,
            date: null,
            stair: null,
            errDate: null,
            status: null,
        };
    }


    componentDidMount() {
        const { stairID, isEdit } = this.props;
        if( isEdit && stairID ) {
            this.props.stairStore.findOneStair(stairID)
            .then(detailStair => {
                  this.setState({
                    stairID: detailStair.id,     
                    date: detailStair.date,
                    stair: detailStair.stair
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })  
        }
        this.props.stairStore.getTarget()
    } 

    onDelete = () => {
        const { stairID } = this.props;
        if (window.confirm('Are you sure you wish to delete this stair record?'))  {
            this.onDeleteStair(stairID) 
        }
    }
    onDeleteStair = (id) => {
        this.props.stairStore.deleteStair(id)
        .then(deleted => {
            toast(Strings.txtStairDeleteSuccess);
            this.props.history.go(-1);
        })
    }

    getStatusFromValue = (stair, minTarget) => {
        if(stair >=minTarget) 
            return Strings.txtStatusArchieved;
        return Strings.txtStatusNonArchieved;
    }

    render() {
        const { isEdit } = this.props;
        let stairTarget =  this.props.stairStore.target ? this.props.stairStore.target.stairTarget : null;
        return <div className="cw-default-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldRecordID} 
                            value={this.state.stairID} 
                            placeholder={Strings.txtFieldStairID} 
                            disable />
                }
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldDate} 
                        value={convertDateToDisplay(this.state.date)} 
                        placeholder={Strings.txtFieldDate} 
                        disable />
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldStair} 
                        value={this.state.stair} 
                        placeholder={Strings.txtFieldStair} 
                        disable />
               {
                   stairTarget &&
                   <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldStatus} 
                    value={this.getStatusFromValue(this.state.status, stairTarget)} 
                    disable
                        />
               }
            

                 <div className="cw-row" style={{ marginTop: "5px"}}>
                    <CButton containerStyle={{width: "136px"}} type="cancel" onClick={()=>{this.onDelete()}}>{Strings.txtBtnDelete}</CButton>
                 </div>  
            </div>
        </div>
    }
}

export default inject('stairStore')(observer(StairForm));