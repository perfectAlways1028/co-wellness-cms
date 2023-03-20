import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from "rc-tabs";
import "./style.scss"

class CTabs extends Component {

    render () {
        const props = this.props;
        return <div className="cw-tabs-container" style={this.props.containerStyle}>
            <div className="cw-tabs-inner-container">
                <Tabs
                    {...props}
                />
            </div>
 
        </div>
    }
}

CTabs.propTypes = {
    data: PropTypes.array,
    selectedTabIndex: PropTypes.number,
    onSelectTab: PropTypes.func,
    containerStyle: PropTypes.object
};
  

export default CTabs