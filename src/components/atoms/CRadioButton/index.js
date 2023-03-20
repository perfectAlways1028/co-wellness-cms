import React, { Component } from 'react';
import Checkbox from 'rc-checkbox'

import "./style.scss"

class CRadioButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked || false
        }
    }
    onChange = (e) => {
        if(this.props.onChange) {
            this.props.onChange();
        }
    }
    render () {
        return <label className="cw-radio" style={this.props.containerStyle}>

            <div style={{marginLeft:'32px', marginTop:'1px'}}>
            {this.props.label}
            </div>
            
            <input type="checkbox" checked={this.props.checked} onChange={(e)=>{this.onChange()}} disabled={this.props.disable}/>
            <span class="checkmark"></span>
        </label>
       
    }
}

export default CRadioButton