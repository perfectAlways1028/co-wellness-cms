import React, { Component } from 'react';
import { CModal, CImageButton, CButton } from '../../../../components/atoms';
import { Strings, Images } from '../../../../constants';
// import csv from 'csv';
import './style.scss'

class InjectCoinImportErrorPopup extends Component {
  constructor(props) {
    super(props);
  }

  closeModal = () => {
    const { closePopup } = this.props;
    closePopup();
  }

  render() {
    const { isErrorOpen, errors, templateFile } = this.props;
    // const { fileName, fileData, progress } = this.state;

    return (
      <div>
        <CModal
          isOpen={isErrorOpen}
          onRequestClose={() => { this.closeModal() }}
          // contentLabel={Strings.txtImportCSV}
          contentStyle={{ width: '770px', height: '558px', overflow: 'unset', padding: 'unset' }}
        >
          <div className="cw-modal-upload-container">
            <CImageButton containerStyle={{
              position: 'absolute',
              width: '48px',
              height: '48px',
              top: '24px',
              right: '24px'
            }}
              src={Images.close}
              onClick={() => { this.closeModal() }}
            />
            <span className="title">Error Report</span>
            <span className="sub-title">Please fix these issues before import again</span>
            <span className="sub-title" style={{ color: 'red' }}>Total Error: {errors.length}</span>
            <div className="report-container">
              <ul>
                {errors.map(item => {
                  const error = item.message.split(', ');
                  return (
                    <li style={{ marginBottom: '15px' }}>
                      <span style={{ fontSize: '18px' }}>On Number {item.index}:</span>
                      <ul>
                        {error.map(err => {
                          return <li style={{ fontSize: '14px', marginLeft: '20px' }}>{err}</li>
                        })}
                      </ul>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </CModal>
      </div >
    )
  }

}

export default InjectCoinImportErrorPopup;