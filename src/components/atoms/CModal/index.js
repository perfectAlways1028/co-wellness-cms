import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import "./style.scss"

class CModal extends Component {

    render () {
        const props = this.props;
        return <div className="cw-modal-container" style={props.containerStyle}>
            <Modal
                {...props}
                isOpen={props.isOpen}
                style={{
                    overlay: {
                        backgroundColor: '#00000099'
                    },
                    content : {
                      top                   : '50%',
                      left                  : '50%',
                      right                 : 'auto',
                      bottom                : 'auto',
                      marginRight           : '-50%',
                      transform             : 'translate(-50%, -50%)',
                      ...props.contentStyle
                    }
                }}
            />
        </div>
       
    }
}

export default CModal