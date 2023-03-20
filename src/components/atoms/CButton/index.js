import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import "./style.scss"

class CButton extends Component {
    onClick = () => {
        if (!this.props.isLoading) {
            if (this.props.onClick) this.props.onClick();
            if (this.props.isFilePicker) {
                this.upload.click();
            }
        }

    }
    onFileChange = (e) => {
        if (this.props.onFileChange) {
            this.props.onFileChange(e);
        }
    }
    getClassByType = (type) => {
        if (type == 'delete')
            return 'cw-button-container-delete'
        if (type == 'cancel')
            return 'cw-button-container-cancel'
        if (type == 'secondary')
            return 'cw-button-container-secondary'
        if (type == 'upload')
            return 'cw-button-container-upload'
        return 'cw-button-container'
    }
    render() {
        const props = this.props;
        return <button onClick={() => { this.onClick() }} type="button" disabled={props.disabled}
            className={this.getClassByType(this.props.type)} style={props.containerStyle}>
            {this.props.isLoading ? <div><i class="fa fa-circle-o-notch fa-spin"></i> Loading</div> : props.children}
            {
                props.isFilePicker &&
                <input id="myInput" type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} accept={this.props.fileAccept} onChange={e => { this.onFileChange(e) }} />
            }
        </button>
    }
}

CButton.propTypes = {
    disabled: PropTypes.bool,
    isFilePicker: PropTypes.bool,
    fileAccept: PropTypes.string,
    onClick: PropTypes.func,
    onFileChange: PropTypes.func,
    isLoading: PropTypes.func
};


export default CButton