import React, { Component } from 'react';
import { CModal, CImageButton, CButton } from '../../../../components/atoms';
import { Strings, Images } from '../../../../constants';
import { toast } from 'react-toastify';
// import csv from 'csv';
import './style.scss'

class EmployeeUploadPopup extends Component {
  constructor(props) {
    super(props);
  }

  closeModal = () => {
    const { closePopup } = this.props;
    closePopup();
  }

  onImportCSV = e => {
    const { onImportCSV } = this.props;
    onImportCSV(e);
  }

  importFunction = () => {
    const { importFunction } = this.props;
    importFunction();
  }

  deleteCurrentFile = () => {
    const { deleteCurrentFile } = this.props;
    deleteCurrentFile();
  }

  render() {
    const { isUploadOpen, fileName, templateFile } = this.props;
    // const { fileName, fileData, progress } = this.state;

    return (
      <div>
        <CModal
          isOpen={isUploadOpen}
          onRequestClose={() => { this.closeModal() }}
          contentLabel={Strings.txtImportCSV}
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

            <span className="title">Import User</span>
            <div className="sub-title"><span>Download and fill this template file with your data</span></div>
            <a
              href={templateFile}
              style={{ color: '#338718', fontWeight: "bold", fontSize: '14px', marginBottom: '10px' }}
            >
              Download Template
            </a>
            <div className="sub-title"><span>Then, upload your data using the given template format</span></div>

            {!fileName &&
              <>
                <div className="cw-file-container">
                  <div className="image-container">
                    <CButton
                      isFilePicker
                      onFileChange={(e) => { this.onImportCSV(e) }}
                      fileAccept=".xlsx"
                      // onClick={() => { this.setState({ isUploadOpen: true }) }}
                      type="upload"
                      containerStyle={{ width: '172px', height: '40px' }}>{Strings.txtChooseFile}
                    </CButton>
                  </div>
                </div>
              </>
            }

            {!!fileName &&
              <div>
                <div style={{
                  whiteSpace: "nowrap",
                  alignItems: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  padding: "unset",
                  width: "400px",
                  height: "25px",
                  backgroundColor: "#f5f5f5",
                  margin: "120px 0"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                  >
                    <span>{fileName}</span>
                    <CImageButton containerStyle={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      height: "100%",
                      width: "100%"
                    }}
                      style={{ height: "100%", width: "initial" }}
                      src={Images.close}
                      onClick={() => { this.deleteCurrentFile() }}
                    />
                  </div>
                </div>

              </div>
            }
            <div style={{ justifyContent: "center", display: "flex" }}>
              <CButton
                onClick={() => {

                  this.importFunction();
                }}
                containerStyle={{
                  width: '172px',
                  height: '40px',
                  marginTop: "25px",
                }}
                disabled={!fileName}
              >
                {Strings.txtImportButton}
              </CButton>
            </div>
            {/* {
              progress > 0 &&
              <div style={{ height: "inherit", width: "100%", display: "flex", margin: "120px 0" }}>
                <CLoadingBar progress={progress} />
              </div>
            } */}
          </div>
        </CModal>
      </div >
    )
  }

}

export default EmployeeUploadPopup;