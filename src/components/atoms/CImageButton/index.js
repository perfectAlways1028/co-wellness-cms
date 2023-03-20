import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CImage from '../CImage'
import "./style.scss"

class CImageButton extends Component {
    onClick = () => {
        if (this.props.onClick) this.props.onClick();
    }

    render() {
        const props = this.props;
        return <button className="cw-image-button" onClick={() => { this.onClick() }} type="button"
            style={props.containerStyle}>
            <CImage style={{ width: '100%', height: '100%' }} src={this.props.src} {...props} />
        </button>
    }
}

CImageButton.propTypes = {
    onClick: PropTypes.func,
};


export default CImageButton