import React, { Component } from 'react';
import { CTextInput, CImageButton } from '../../../../../components/atoms'
import {CMTable } from '../../../../../components/molecules';
import { Strings, Constants, Images } from '../../../../../constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';

import { toast } from 'react-toastify';

const fields = [
    {
        title: Strings.txtFieldMealName,
        field: 'mealName'
    },
    {
        title: Strings.txtFieldServingSize,
        field: 'servingSize',
    },
    {
        title: Strings.txtFieldCalories,
        field: 'totalCalories',
    },
    {
        title: "",
        field: 'action',
        type:  'custom'
    },
]

class DietRecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dietRecordID: null,
            date: null,
            totalCalories: null,
            errDate: null,
            dietRecords: []
        };
    }


    componentDidMount() {

        this.reLoad();
    } 

    reLoad = () => {
        const { dietRecordID, employeeID, isEdit } = this.props;
        if( isEdit && dietRecordID ) {
            this.props.dietRecordStore.findOneDietTargetRecord(dietRecordID, {employeeID} )
            .then(result => {
                let detailDietTargetRecord = result.target;
                let detailDietRecords = result.dietRecord;
                console.log("result", result);
                  this.setState({
                    targetID: detailDietTargetRecord.targetID,     
                    date: detailDietTargetRecord.date,
                    dietTotal: detailDietTargetRecord.dietTotal,
                    dietTarget: detailDietTargetRecord.dietTarget,
                    dietTargetAchieved: detailDietTargetRecord.dietTargetAchieved,
                    dietRecords: detailDietRecords.map(record => {
                        return {
                            dietRecordID: record.dietRecordID,
                            mealName: record.meal ? record.meal.name : record.mealName,
                            servingSize: record.servingSize,
                            totalCalories: record.totalCalories
                        }
                    })
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
          
           
        }
    }
    onRemoveItem = ( recordID ) => {
        console.log("recordID", recordID);
        if (window.confirm('Are you sure you wish to delete this diet record?'))  {
            this.onDeleteDietRecord(recordID) 
        }
    }

    onDeleteDietRecord = (id) => {
        this.props.dietRecordStore.deleteDietRecord(id)
        .then(deleted => {
            toast(Strings.txtDietRecordDeleteSuccess);
            this.reLoad();
        })
    }
    render() {
        const { isEdit } = this.props;

        return <div className="cw-default-form-container"> 
            <div className="form-container"> 
                {
                    isEdit &&
                    <CTextInput containerStyle={{width: '320px'}} 
                            label={Strings.txtFieldRecordID} 
                            value={this.state.targetID} 
                            placeholder={Strings.txtFieldDietRecordID} 
                            disable />
                }

                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldDate} 
                        value={convertDateToDisplay(this.state.date)} 
                        placeholder={Strings.txtFieldDate} 
                        disable />
                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldTotalCalories} 
                        value={this.state.dietTotal} 
                        placeholder={Strings.txtFieldDietRecordID} 
                        disable />
                        
                <CTextInput containerStyle={{width: '320px'}} 
                    label={Strings.txtFieldStatus} 
                    value={this.state.dietTargetAchieved? Strings.txtStatusArchieved: Strings.txtStatusNonArchieved} 
                    disable
                        />


                <div className="cw-default-form-sub-section" style={{fontSize: '20px', marginBottom: '16px'}}>{Strings.txtDietList}</div>
            

                <div className="cw-default-form-table-content">
                <CMTable
                        fields={fields}
                        data={this.state.dietRecords}
                        renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            if(field.field == 'action') {
                                return <td key={'key'+ colIndex} style={{justifyContent:'center', alignItems: 'flex-end', display: 'flex'}}>
                                {
                                   
                                    <CImageButton src={Images.trash}
                                    onClick={()=>{
                                        this.onRemoveItem(rowData.dietRecordID);
                                    }} 
                                    containerStyle={{
                                                    width: '48px', 
                                                    height: '48px', 
                                                    marginRight: '8px',
                                                    marginTop: '6px'
                                                 }}/>
                               
                                }
                            </td>
                            }
                            return null
                        }}
                        onRowClick={(rowData, rowIndex) => {}}
                        containerStyle={{marginTop: '16px'}}
                />
              
                </div>
                
            </div>

        </div>
    }
}

export default inject('dietRecordStore')(observer(DietRecordForm));