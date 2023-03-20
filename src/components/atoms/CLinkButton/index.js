import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import "./style.scss"

class CLinkButton extends Component {
    onClick = () => {
        if(this.props.onClick) this.props.onClick();
    }

    render () {
        const props = this.props;
        return <a onClick={()=>{this.onClick()}}
                className="cw-a" style={props.containerStyle}>
          {props.children}
        </a>
    }
}

CLinkButton.propTypes = {
    onClick: PropTypes.func
};
  

export default CLinkButton