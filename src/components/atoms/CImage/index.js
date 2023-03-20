import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'rc-img';

import "./style.scss"
import "rc-img/assets/index.css"

class CImage extends Component {

    render () {
        const props = this.props;
        return <img
            title="Loading"
            {...props}
        />
    }
}

export default CImage