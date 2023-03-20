import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker } from '../../components/atoms'

import { Strings } from '../../constants';
import ColorSelector from './components/ColorSelector';
import { inject, observer } from "mobx-react";
import { getRole } from '@helpers/storageHelper';
import { toast } from 'react-toastify';
const breadcrumbs = [
    {
        to: '/main/setting',
        title: Strings.txtThemeSetting
    }
]

const themeColors = [
    {
        id: 'ironTheme',
        startColor: '#A7C8D7',
        endColor: '#FFFFFF',
        borderColor: '#A7A6C5'
    },
    {
        id: 'greenTheme',
        startColor: '#A7D7BC',
        endColor: '#FFFFFF',
        borderColor: '#A7A6C5'
    },
    {
        id: 'yellowTheme',
        startColor: '#D7CFA7',
        endColor: '#FFFFFF',
        borderColor: '#A7A6C5'
    },
    {
        id: 'redTheme',
        startColor: '#D7A7A7',
        endColor: '#FFFFFF',
        borderColor: '#A7A6C5'
    },
    {
        id: 'pinkTheme',
        startColor: '#D7A7D0',
        endColor: '#FFFFFF',
        borderColor: '#A7A6C5'
    },

    {
        id: 'coldTheme',
        startColor: '#AFA7D7',
        endColor: '#FFFFFF',
        borderColor: '#A7A6C5'
    }
    
]

const buttonColors = [
    {
        id: 'green',
        startColor: '#4CA42F',
        endColor: '#359215',
        borderColor: '#A7A6C5'
    },
    {
        id: 'darkGreen',
        startColor: '#2F9EA4',
        endColor: '#158D92',
        borderColor: '#A7A6C5'
    },
    {
        id: 'blue',
        startColor: '#4A2FA4',
        endColor: '#153392',
        borderColor: '#A7A6C5'
    },
    {
        id: 'pink',
        startColor: '#A42F94',
        endColor: '#761592',
        borderColor: '#A7A6C5'
    },
    {
        id: 'red',
        startColor: '#A42F44',
        endColor: '#921515',
        borderColor: '#A7A6C5'
    },
    {
        id: 'ground',
        startColor: '#A4672F',
        endColor: '#923C15',
        borderColor: '#A7A6C5'
    },
]
class SettingPage extends Component {

    constructor(props) {
      super(props);

      const role = getRole();
      this.state = {
          isSuperAdmin : role == 'superadmin',
          selectedThemeColorID: null,
          selectedTheme: null,
          selectedButtonColorID: null,
          selectedButtonColor: null,
      };
    }
    componentDidMount() {
        this.props.settingStore.getSetting()
        .then(foundSetting => {
            if(foundSetting) {
                this.setState({selectedThemeColorID: foundSetting.themeName, 
                               selectedButtonColorID: foundSetting.buttonColorName,
                               selectedTheme: this.findItemByID(foundSetting.themeName, themeColors),
                               selectedButtonColor: this.findItemByID(foundSetting.buttonColorName, buttonColors)
                            })
            }
        })
    }
    findItemByID = (id, items) => {
        const data = items || this.props.data || [];
        const foundItem = data.find(element => element.id == id);
        return foundItem;
    }
    onSave = () => {
        if(!this.state.selectedTheme || !this.state.selectedButtonColor) {
            return;
        }
        let appSettings = {
            themeName: this.state.selectedThemeColorID,
            buttonColorName: this.state.selectedButtonColorID,
            themeStartColor: this.state.selectedTheme.startColor,
            themeEndColor: this.state.selectedTheme.endColor,
            buttonStartColor: this.state.selectedButtonColor.startColor,
            buttonEndColor: this.state.selectedButtonColor.endColor,
            
        }
        this.props.settingStore.updateSetting(appSettings)
        .then(updated=> {
            toast(Strings.txtThemeSettingUpdateSuccess);
        })
        .catch(err => {
            console.log("faild", err);
            toast(Strings.txtUnexpectedError);
        });
    }
    render () {
        
        return <div className="cw-defaultpage-container">  
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtThemeSetting}</div>
            </div>
            <div className="cw-row" style={{flex: 1}}>
                <div className="cw-column" style={{flex: 1}}>
                    <div className="cw-sub-title" style={{marginLeft: '30px'}}>{Strings.txtThemeColor}</div>
                    <ColorSelector data={themeColors} 
                                   containerStyle={{marginTop:'16px'}} 
                                   selectedItemID={this.state.selectedThemeColorID} 
                                   onSelectItem={(item)=>{ this.setState({selectedThemeColorID: item.id, selectedTheme: item})}}/>
                    <div className="cw-sub-title" style={{marginLeft: '30px'}}>{Strings.txtButtonColor}</div>
                    <ColorSelector data={buttonColors} 
                                   containerStyle={{marginTop:'16px'}} 
                                   selectedItemID={this.state.selectedButtonColorID} 
                                   onSelectItem={(item)=>{ this.setState({selectedButtonColorID: item.id, selectedButtonColor: item})}}/>
                </div>
                <div className="cw-column" style={{flex: 1}}>
                    <div className="cw-sub-title" style={{marginLeft: '30px'}}>{Strings.txtThemePreview}</div>
                </div>
            </div>
            <div className="cw-row" style={{ marginTop: "23px", marginLeft: "30px", marginBottom: '30px'}}>
                    
                <CButton containerStyle={{width: "136px"}} 
                            isLoading={this.props.settingStore.isLoading}
                            onClick={()=>{this.onSave()}}>{Strings.txtBtnSave}</CButton>     
            </div>  
        </div>

    }
}

export default inject('settingStore')(observer(SettingPage));