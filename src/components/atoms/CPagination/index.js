import React, { Component } from 'react';
import Pagination from 'rc-pagination'
import PropTypes from 'prop-types';

import "./style.scss"

class CPagination extends Component {

    render () {
        const props = this.props;
        return <div className="cw-pagination-container" style={props.containerStyle}>
            <Pagination
                {...props}
            />
        </div>
       
    }
}

export default CPagination