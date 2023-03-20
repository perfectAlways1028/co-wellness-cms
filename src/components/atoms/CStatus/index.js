import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./style.scss"


class CStatus extends Component {

    getColor = (colorString) => {
        switch(colorString) {
            case 'red':
                return '#F06775'
            case 'green':
                return '#68B983'
            case 'yellow': 
                return '#F2C752'
            
        }
        return '#68B983'
    } 
    render () {
        const props = this.props;
        return <div className={'cw-status-container'} style={{backgroundColor: this.getColor(props.color)}}>
            <div className="status-label">
                {this.props.value}
            </div>
        
        </div>
    }
}

export default CStatus