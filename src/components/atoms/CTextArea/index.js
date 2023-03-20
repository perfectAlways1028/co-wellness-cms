import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import { Icon } from '@material-ui/core';
class CTextInput extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          value: props.value || "",
          error: props.error || "",
          label: props.label || "Label",
          eyeOn: true
        };
    }
    onChangeValue = (event) => {
        const value = event.target.value;
        if(this.props.onChangeValue) this.props.onChangeValue(value);
        this.setState({ value, error: "" });
    }
    onKeyPress= (event) => {
        if(this.props.onKeyPress) this.props.onKeyPress(event)
    }

    getType = (type) => {

        if(!this.props.type)
        return 'text';
        if(this.props.type == 'password') {
            if(this.state.eyeOn) return 'password';
            else return 'text';
        }
        if(this.props.type == 'search') {
            return 'text';
        }
        return this.props.type
    } 
    render () {
        const props = this.props;
        const { value, error, label } = this.state;
        return <div className={'cw-textarea-container'} style={props.containerStyle}>
                 <div className={this.props.disable ? 'label_disabled' : 'label'}>{props.label}</div>
                {
                    this.props.disable ?
                    <div className="field_disabled">
                        {this.props.value}
                    </div>
                    :
                    <div className="field">
                        <textarea
                            type={this.getType(this.props.type)}
                            value={props.value || ""}
                            placeholder={props.placeholder}
                            onKeyPress={()=>{this.onKeyPress(event)}}
                            onChange={(event)=>{this.onChangeValue(event)}}
                        />
                    </div>
                }
                
                <div className={'error'}>{props.error}</div>
            </div>
    }
}

CTextInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    helperText: PropTypes.string
  };
  

export default CTextInput