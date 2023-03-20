import React, { Component } from 'react';
import { Strings, Images } from '../../constants';
import { CBreadcrumbs, CButton, CDatePicker } from '../../components/atoms'

import './style/style.scss'

class ErrorPage extends Component {

    constructor(props) {
      super(props);

      this.state = {
      };
    }
    onBackToDashboard() {
        this.props.history.replace('/main/dashboard')
    }
    render () {
         return <div className="cw-error-container">  
            <div className={'cw-error-logo'}>
                <img src={Images.error}/>
            </div>
            <CButton containerStyle={{width: "324px", marginTop: "16px"}} 
                    onClick={()=>{this.onBackToDashboard()}}>{Strings.txtBtnBackToDashboard}</CButton>
        </div>

    }
}

export default ErrorPage;
