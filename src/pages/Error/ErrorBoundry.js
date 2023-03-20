import React, { Component } from 'react';
import { Strings, Images } from '../../constants';
import { CBreadcrumbs, CButton, CDatePicker } from '../../components/atoms'

import './style/style.scss'

class ErrorBoundry extends Component {

    constructor(props) {
      super(props);

      this.state = { hasError: false };
    }
    onBackToDashboard() {
        this.props.history.replace('/main/dashboard')
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }
    
      componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
      }
    render () {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div className="cw-error-container">  
                <div className={'cw-error-logo'}>
                    <img src={Images.error}/>
                </div>
                <CButton containerStyle={{width: "324px", marginTop: "16px"}} 
                        onClick={()=>{this.onBackToDashboard()}}>{Strings.txtBtnBackToDashboard}</CButton>
            </div>
        }
        return this.props.children; 
       

    }
}

export default ErrorBoundry;
