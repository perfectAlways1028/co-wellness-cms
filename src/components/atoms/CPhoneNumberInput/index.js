import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import './phoneInputStyle.css'
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumber, isValidPhoneNumber, getCountryCallingCode } from 'react-phone-number-input'
import { Icon } from '@material-ui/core';
class CPhoneNumberInput extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          value: props.value !== null ? props.value : "",
          countryCode: props.countryCode !== null ? props.countryCode : "",
          error: props.error || "",
          label: props.label || "Label",
          eyeOn: true
        };
    }
    setValue = (value) => {
        var countryCode = this.state.countryCode;
        if(isValidPhoneNumber(value)) {
            const phoneNumber = parsePhoneNumber(value);
            countryCode = getCountryCallingCode(phoneNumber.country)
        } else {
            countryCode = null;
        }
        if(this.props.onChangeValue) this.props.onChangeValue(value, countryCode);
    } 
    render () {
        const props = this.props;
        const { value, error, label } = this.state;
        return <div className={'cw-textfield-phone-number-container'} style={props.containerStyle}>
                <div className={this.props.disable ? 'label_disabled' : 'label'}>{props.label}</div>
                {
                    this.props.disable ?
                    <div className="field_disabled">
                        {this.props.value}
                    </div>
                    :
                    <div className="field">
                        <PhoneInput
                            placeholder={this.props.placeholder}
                            value={props.value !== null ? props.value : ""}
                            onChange={this.setValue}/>
                    </div>
                }
                
                <div className={'error'}>{props.error}</div>
            </div>
    }
}

CPhoneNumberInput.propTypes = {
    label: PropTypes.string,
    countryCode: PropTypes.string,
    value: PropTypes.string,
    helperText: PropTypes.string
  };
  

export default CPhoneNumberInput