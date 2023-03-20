import React, { Component } from 'react';
import { CTextInput, CImageButton, CStatus } from '../../../../../components/atoms'
import {CMTable } from '../../../../../components/molecules';
import { Strings, Constants, Images } from '../../../../../constants';
import { inject, observer } from "mobx-react";
import { convertDateToDisplay, convertDatetimeToDisplay } from '@helpers/dateHelper';

import { toast } from 'react-toastify';

const fields = [
    {
        title: Strings.txtFieldPeriod,
        field: 'periodString'
    },
    {
        title: Strings.txtFieldValue,
        field: 'value',
    },
    {
        title: Strings.txtFieldTarget,
        field: 'target',
    },
    {
        title: Strings.txtFieldStatus,
        field: 'status',
        type:  'custom'
    },
    {
        title: "",
        field: 'action',
        type:  'custom'
    },
]

class BloodGlucoseRecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bloodGlucoseRecordID: null,
            date: null,
            totalCalories: null,
            errDate: null,
            bloodGlucoseRecords: []
        };
    }

    
    componentDidMount() {
       this.reLoad();
    } 

    reLoad = () => {
        const { bloodGlucoseRecordID, employeeID, isEdit } = this.props;
        if( isEdit && bloodGlucoseRecordID ) {
            this.props.bloodGlucoseRecordStore.findOneBloodGlucoseTargetRecord(bloodGlucoseRecordID, {employeeID} )
            .then(result => {
                let detailBloodGlucoseTargetRecord = result.target;
                let detailBloodGlucoseRecords = result.bloodGlucoseRecord;
                  this.setState({
                    targetID: detailBloodGlucoseTargetRecord.targetID,     
                    date: detailBloodGlucoseTargetRecord.date,
                    bloodGlucoseRecords: detailBloodGlucoseRecords.map(record => {
                        return {
                            bloodGlucoseRecordID: record.bloodGlucoseRecordID,
                            period: record.period,
                            category: record.category,
                            periodString: this.getStringFromPeriod(record.period),
                            value: record.value,
                            status: record.status,
                            target: this.getMinMaxString(record.category, record.target)
                        }
                    })
                })
            })
            .catch(error => {
                this.props.history.replace(Constants.error.errorUrl)
            })
        }
    }
    getMinMaxFromCategory = ( category, target) => {
        if(!target) return null;
        if(category == 'beforeMeal') {
            return { minTargetValue: target['bloodGlucoseBeforeMealMinTarget'], 
                     maxTargetValue: target['bloodGlucoseBeforeMealMaxTarget']}
        } else if (category == 'afterMeal') {
            return { minTargetValue: target['bloodGlucoseAfterMealMinTarget'], 
            maxTargetValue: target['bloodGlucoseAfterMealMaxTarget']}
        } else if (category == 'bedTime') {
            return { minTargetValue: target['bloodGlucoseBedTimeMinTarget'], 
                     maxTargetValue: target['bloodGlucoseBedTimeMaxTarget']}
        } else if (category == 'hba1c') {
            return { minTargetValue: target['bloodGlucoseHba1cMinTarget'], 
                     maxTargetValue: target['bloodGlucoseHba1cMaxTarget']}
        } else {
            return { minTargetValue: target['bloodGlucoseBeforeMealMinTarget'], 
            maxTargetValue: target['bloodGlucoseBeforeMealMaxTarget']}
        }
    }
    getMinMaxString = (category,  target) => {
        if(!target) return "";
        let minMax = this.getMinMaxFromCategory(category, target);
        if(!minMax) return "";
        return minMax.minTargetValue + " - " + minMax.maxTargetValue
    }
    getStringFromPeriod = ( period ) => {
        switch(period) {
            case 'beforeBreakfast' : return 'Before Breakfast';
            case 'beforeLunch' : return 'Before Lunch';
            case 'beforeDinner' : return 'Before Dinner';
            case 'afterBreakfast' : return 'After Breakfast';
            case 'afterLunch' : return 'After Lunch';
            case 'afterDinner' : return 'After Dinner';
            case 'morning' : return 'Morning';
            case 'bedtime' : return 'Bedtime';
            case 'midnight' : return 'Midnight';
            case 'hba1c' : return 'Hba1c';
            default: return '';
        }
    }
    onRemoveItem = ( recordID ) => {
        console.log("recordID", recordID);
        if (window.confirm('Are you sure you wish to delete this blood glucose record?'))  {
            this.onDeleteBloodGlucoseRecord(recordID) 
        }
    }

    onDeleteBloodGlucoseRecord = (id) => {
        this.props.bloodGlucoseRecordStore.deleteBloodGlucoseRecord(id)
        .then(deleted => {
            toast(Strings.txtBloodGlucoseRecordDeleteSuccess);
            this.reLoad();
        })
    }

    getStatus = (status) => {
        switch(status) {
            case 'hypo': return 'BELOW';
            case 'good': return 'ON TARGET';
            case 'hyper': return 'OVER';
        }
    }
    getColorFromStatus= (status) => {
        switch(status) {
            case 'hypo': return 'yellow';
            case 'good': return 'green';
            case 'hyper': return 'red';
        }
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
                            placeholder={Strings.txtFieldBloodGlucoseRecordID} 
                            disable />
                }

                <CTextInput containerStyle={{width: '320px'}} 
                        label={Strings.txtFieldDate} 
                        value={convertDateToDisplay(this.state.date)} 
                        placeholder={Strings.txtFieldDate} 
                        disable />


                <div className="cw-default-form-sub-section" style={{fontSize: '20px', marginBottom: '16px'}}>{Strings.txtBloodGlucoseList}</div>
            

                <div className="cw-default-form-table-content">
                <CMTable
                        fields={fields}
                        data={this.state.bloodGlucoseRecords}
                        renderCustomField={(field, rowData, rowIndex, colIndex) => {
                            if(field.field == 'action') {
                                return <td key={'key'+ colIndex} style={{justifyContent:'center', alignItems: 'flex-end', display: 'flex'}}>
                                {
                                   
                                    <CImageButton src={Images.trash}
                                    onClick={()=>{
                                        this.onRemoveItem(rowData.bloodGlucoseRecordID);
                                    }} 
                                    containerStyle={{
                                                    width: '48px', 
                                                    height: '48px', 
                                                    marginRight: '8px',
                                                    marginTop: '6px'
                                                 }}/>
                               
                                }
                            </td>
                            }  else if(field.field == 'status') { 
                                  
                                return <td key={'key'+ colIndex}>
                                    {
                                        <div style={{ justifyContent: 'flex-start', alignItems: 'center', display:'flex' }}>
                                            <CStatus value={this.getStatus(rowData['status'])} 
                                                 color={this.getColorFromStatus(rowData['status'])}/>
                                        </div>
                                       
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

export default inject('bloodGlucoseRecordStore')(observer(BloodGlucoseRecordForm));