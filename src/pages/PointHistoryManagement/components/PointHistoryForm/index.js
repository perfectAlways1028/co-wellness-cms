import React, { Component } from 'react';
import { CButton, CSelectInput, CTextInput, CDatePicker } from '../../../../components/atoms'
import { CMImagePicker } from '../../../../components/molecules'
import { Strings, Constants } from '../../../../constants';
import { convertDatetimeToDisplay } from '@helpers/dateHelper';
import { inject, observer } from "mobx-react";

class PointHistoryForm extends Component {
    constructor(props) {
        super(props);
        
        let isEdit = true;
        if(isEdit) {
            this.state = {
           
            };
        } 
    }
    componentDidMount() {
        const { pointHistoryID, isEdit } = this.props;
        if( isEdit && pointHistoryID ) {
            this.props.pointHistoryStore.findOnePointHistory(pointHistoryID)
            .then(detailPointHistory => {
                console.log("detailPointHistory", detailPointHistory);
                  this.setState({
                    pointHistoryIDCode: detailPointHistory.pointHistoryIDCode,
                    name: detailPointHistory.user ? detailPointHistory.user.name : "",
                    payorName: detailPointHistory.payor ? detailPointHistory.payor.name : "",
                    createdAt: convertDatetimeToDisplay(detailPointHistory.createdAt),
                    amount: detailPointHistory.amount,
                    type: detailPointHistory.type,
                    typeID: '',
                    status: detailPointHistory.amount < 0 ? Strings.txtStatusOUT : Strings.txtStatusIN
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }

        
 
    } 
    render() {
        const { isEdit } = this.props;
        return <div className="cw-default-form-container"> 
            <div className="form-container">

            <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldPointHistoryID} 
                    value={this.state.pointHistoryIDCode} 
                    disable />
            <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldUserName} 
                    value={this.state.name}
                    disable
                    />
            <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldPayorName} 
                    value={this.state.payorName}
                    disable
                    />                  
            <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldDateAndTime} 
                    value={this.state.createdAt}
                    disable
                    />         
            <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldAmount} 
                    value={this.state.amount}
                    disable
                    /> 
            <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldType} 
                    value={this.state.type == 'redeem' ? Strings.txtRedeem : Strings.txtChallenge}
                    disable
                    /> 
            {/*<CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldTypeID} 
                    value={this.state.typeID}
                    disable
            /> */}
            <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldStatus} 
                    value={this.state.status}
                    disable
                    /> 
            </div>

        </div>
    }
}
export default inject('pointHistoryStore')(observer(PointHistoryForm));
