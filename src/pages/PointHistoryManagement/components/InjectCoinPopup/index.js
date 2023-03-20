import React, { Component } from 'react';
import { CModal, CImageButton, CButton, CTextInput, CSelectInput } from '../../../../components/atoms';
import { Strings, Images } from '../../../../constants';
import { toast } from 'react-toastify';
// import csv from 'csv';
import './style.scss'

class EmployeeUploadPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      amount: 0,
      errUsername: '',
      errAmount: ''
    };
  }

  closeModal = () => {
    const { closePopup } = this.props;
    closePopup();
  }

  validateForm = () => {
    let valid = true;
    let validEmployeeIDCode = this.state.username && this.state.username != ''
    if (!validEmployeeIDCode) this.setState({ errUsername: "User Name cannot be blank" })
    else this.setState({ errEmployeeIDCode: null })
    valid &= validEmployeeIDCode;

    let validAmount = this.state.amount && this.state.amount != 0
    if (!validAmount) this.setState({ errAmount: "Amount must be more than 0" })
    else this.setState({ errAmount: null })
    valid &= validAmount;

    return valid;
  }


  submitFunction = (data) => {
    const { submitFunction } = this.props;
    if (this.validateForm()) {
      submitFunction(data);
      this.setState({ username: '', amount: 0 })
    }
  }


  render() {
    const { isUploadOpen, isLoading, employees } = this.props;
    // const { fileName, fileData, progress } = this.state;

    return (
      <div>
        <CModal
          isOpen={isUploadOpen}
          onRequestClose={() => { this.closeModal() }}
          contentLabel={Strings.txtImportCSV}
          contentStyle={{ width: '770px', height: '450px', overflow: 'unset', padding: 'unset' }}
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

            <span className="title">Inject Coins</span>
            <div className="sub-title"><span>You can directly inject coins to user, Choose the user and the coins amount</span></div>
            <div style={{ height: "inherit" }}>
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                  <CSelectInput containerStyle={{ width: '248px' }}
                    data={employees} label="User Name"
                    placeholder="Choose User"
                    error={this.state.errUsername}
                    selectedItemID={this.state.username}
                    onItemSelected={(item) => { this.setState({ username: item.id }) }}
                  />
                </div>
                <div className="col-lg-12 d-flex justify-content-center">
                  <CTextInput
                    placeholder="Input Coins Amount"
                    containerStyle={{ minWidth: '248px' }}
                    value={this.state.amount}
                    type="number"
                    error={this.state.errAmount}
                    onChangeValue={(value) => { this.setState({ amount: value }) }}
                    label="Coin Amounts"
                  />
                </div>
              </div>

              <div style={{ justifyContent: "center", display: "flex" }}>
                <CButton
                  onClick={() => {
                    this.submitFunction({ employeeID: this.state.username, value: this.state.amount });
                  }}
                  isLoading={isLoading}
                  containerStyle={{
                    width: '172px',
                    height: '40px',
                    marginTop: "25px",
                  }}
                >
                  Inject Coins
              </CButton>
              </div>
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