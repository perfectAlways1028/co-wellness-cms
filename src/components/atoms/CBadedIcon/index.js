import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./style.scss"

class CBadgedIcon extends Component {

    render () {
        const props = this.props;
        return <div className="cw-notification-badge-container" style={this.props.containerStyle}>
            <img className="icon" src={this.props.icon}/>
            <div className="badge-container">
                {this.props.badgeCount || 0}
            </div>
        </div>
    }
}

CBadgedIcon.propTypes = {
    badgeCount: PropTypes.number,
    icon: PropTypes.string
};
  

export default CBadgedIcon