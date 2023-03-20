import React, { Component } from 'react';
import { Strings, Images } from '../../../../constants';
import { CImage } from '../../../../components/atoms';
import PieChart from 'react-minimal-pie-chart';
import PropTypes from 'prop-types';
import "./style.scss"

import { CTabs} from '../../../../components/atoms'

import { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";


const data = {
    total: 900,
    params: [
        {
            title: 'Obese',
            value: 200,
            color: '#E05853'
        },
        {
            title: 'Overnight',
            value: 100,
            color: '#FFD230'
        },
        {
            title: 'Nrmal',
            value: 600,
            color: '#8DCF56'
        },
    ]
}

class HealthCharts extends Component {

    constructViewData = (data) => {

    }
    renderParam = (item, total, unit, index) => {
        var percentage = total == 0 ? 0 : Math.floor(item.value / total  * 100);
        return <div className="cw-row" kye={'param'+index} style={{height: '40px'}}>
            <div className={'cw-row'} style={{flex: 1, height: '40px', justifyContent: 'flex-start'}}>
                <div className="cw-chart-oval-container">
                    <div className="cw-chart-oval" style={{backgroundColor: item.color}}/>
                    <div className="cw-chart-oval-inner" style={{backgroundColor: item.color}}/>
                </div>
                <div className="cw-chart-item-title" style={{marginLeft: '8px'}}>
                    {item.title}
                </div>
            </div>
            <div className={'cw-row'} style={{flex: 1, height: '40px', justifyContent: 'flex-end'}}>
                <div className="cw-chart-item-value">
                    {`${item.value} ${unit} (${percentage}%)`}
                </div>
            </div>
        </div>
    }

    renderChart = (icon, title, data, unit) => {
        return <div className="cw-row" >
            <div className="cw-column" style={{flex: 1, marginRight: '120px'}}>
                <div className="cw-row" style={{marginTop: '16px'}}>
                    <CImage style={{width: "32px", height: '32px'}} src={icon}/>
                    <div className="title" style={{marginLeft: '16px'}}>{title}</div>
                </div>
                <div className="cw-column" style={{marginTop: '16px', flex: 1}}>
                    {
                        data.params.map((item, index) => {
                            return this.renderParam(item, data.total, unit, index)
                        })
                    }
                    
                </div>
            </div>
            <div className="cw-chart" style={{justifyContent: 'flex-end', marginTop: '16px', marginBottom: '16px'}}>
            <PieChart data={data.params} 
                startAngle={-90} 
                label={(labelProps)=> {
                    console.log("labelProps", labelProps);
                    let percentage = Math.floor(labelProps.data[labelProps.dataIndex].percentage);
                    const {x, y, dx, dy} = labelProps;
                    return <text text-anchor="middle" 
                    dominant-baseline="middle" 
                    fill="white" 
                    x={x} y={y} 
                    dx={dx}
                    dy={dy} 
                    style={{    
                        fontFamily: "Google Sans",
                        fontSize: "12px",
                        fontWeight: 'bold',
                        letterSpacing: 0,
                        lineHeight: '14px',
                        textAlign: 'right',
                        color: 'white'}}>{`${percentage} %`}</text>
                }}
                />
            </div>
           
        </div>

    }

    render () {
        const props = this.props;
        return <div className="cw-column" style={this.props.containerStyle}>
            <div className="cw-health-chart-card-title">
                {Strings.txtFiveParameters}
            </div>
            <div className="cw-health-chart-container">
                <CTabs defaultActiveKey="1" 
                    onChange={(e)=>{}} 
                    renderTabBar={() => <ScrollableInkTabBar />} 
                    renderTabContent={() => <TabContent />}>
                    
                    <TabPane tab={Strings.txtNutritionalStatus}  key="1">
                        {this.renderChart(Images.nutritional, Strings.txtNutritionalStatus, props.mcuInfo["nutritionalStatus"], Strings.txtUser)}
                    </TabPane>
                    <TabPane tab={Strings.txtBloodPressure} key="2">
                    {this.renderChart(Images.bloodPressure, Strings.txtBloodPressure, props.mcuInfo["bloodPressure"], Strings.txtUser)}
                    </TabPane>
                    <TabPane tab={Strings.txtPhysicalInactivity} key="3">
                    {this.renderChart(Images.physicalActivity, Strings.txtPhysicalInactivity, props.mcuInfo["physicalInactivity"], Strings.txtUser)}
                    
                    </TabPane>
                    <TabPane tab={Strings.txtBloodGlucose} key="4">
                    {this.renderChart(Images.bloodGlucose, Strings.txtBloodGlucose, props.mcuInfo["bloodGlucose"], Strings.txtUser)}
                    
                    </TabPane>
                    <TabPane tab={Strings.txtTotalCholesterol} key="5">
                    {this.renderChart(Images.cholesterol, Strings.txtTotalCholesterol, props.mcuInfo["cholesterol"], Strings.txtUser)}
                   
                    </TabPane>
                </CTabs>
            </div>
        </div>
    }
}

HealthCharts.propTypes = {
    
};
  

export default HealthCharts