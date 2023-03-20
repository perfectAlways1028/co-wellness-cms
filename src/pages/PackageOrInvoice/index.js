import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CTabs} from '../../components/atoms'
import { Strings } from '../../constants';
import PackageInvoiceList from '../PackageInvoiceManagement/components/PackageInvoiceList';
import PackageList from '../PackageManagement/components/PackageList';

import { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import './style/style.scss'
const breadcrumbs = [
    {
        to: '/main/package-invoice-tab',
        title: Strings.txtPackageAndInvoice
    }
]
class PackageInvoiceTabPage extends Component {

    constructor(props) {
      super(props);

      this.state = {
          currentPage : 1
      };
    }
    onCreateOrder = () => {
        this.props.history.push('/main/package-invoice-tab/create-order');
    }
    
    render () {
        
        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtPackageAndInvoice}</div>
                <div className="buttons">
                    <CButton 
                        onClick={()=>{this.onCreateOrder()}}
                        type="secondary"
                        containerStyle={{width: '172px', height: '40px', marginLeft: '16px'}}>{Strings.txtBtnCreateOrder}</CButton>
                </div>
            </div>
            <div className="cw-package-invoice-tab-container" >
                <CTabs defaultActiveKey="1" 
                    onChange={(e)=>{}} 
                    renderTabBar={() => <ScrollableInkTabBar />} 
                    renderTabContent={() => <TabContent />}
                    containerStyle={{marginLeft: '30px', marignRight: '30px' }}>
                    
                    <TabPane tab={Strings.txtPackage}  key="1">
                        <PackageList history={this.props.history} containerStyle={{marginLeft: 0, marginTop: '24px'}}/>
                    </TabPane>
                    <TabPane tab={Strings.txtInvoice} key="2">
                        <PackageInvoiceList history={this.props.history} containerStyle={{marginLeft: 0, marginTop: '24px'}}/>
                    </TabPane>
                </CTabs>
            </div>
           
        </div>

    }
}

export default PackageInvoiceTabPage