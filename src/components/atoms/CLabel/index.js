import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./style.scss"


class CLabel extends Component {

    render () {
        const props = this.props;
        return <div className={'cw-label-container'} style={props.containerStyle}>
            <div className={'label'}>{props.label}</div>

            <div className="field">
                {this.props.value}
            </div>
        
        </div>
    }
}

export default CLabel