import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination, CDatePicker, CStatus } from '../../components/atoms'
import { CMTable } from '../../components/molecules';
import { getRole } from '@helpers/storageHelper';
import { Strings, Constants } from '../../constants';
import { convertDatetimeToDisplay } from '@helpers/dateHelper';
import { checkPermissionAllowed } from '@helpers/permissionHelper';
import ImportCoinPopup from './components/ImportCoinPopup';
import InjectCoinPopup from './components/InjectCoinPopup';
import InjectCoinErrorPopup from './components/InjectCoinImportErrorPopup';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import * as Excel from "exceljs/dist/exceljs.min.js";
import { saveAs } from 'file-saver';
import { inject, observer } from "mobx-react";
import xlsx from 'xlsx';
import { toast } from 'react-toastify';

const breadcrumbs = [
  {
    to: '/main/point-history-management',
    title: Strings.txtPointHistory
  }
]
const statuses = [
  {
    id: 'in',
    name: Strings.txtStatusIN
  },
  {
    id: 'out',
    name: Strings.txtStatusOUT
  },
]
const styles = {
  loadingColor1: {
    backgroundColor: '#68B983'
  },
  loadingColor2: {
    backgroundColor: '#BEE1CA'
  }
}

const types = [
  {
    id: "challenge",
    name: Strings.txtChallenge
  },
  {
    id: "redeem",
    name: Strings.txtRedeem
  }
]

const fields = [
  {
    title: Strings.txtFieldPointHistoryID,
    field: 'pointHistoryIDCode'
  },
  {
    title: Strings.txtFieldUserName,
    field: 'name',
    sort: true
  },
  {
    title: Strings.txtFieldPayorName,
    field: 'payorName',
    sort: true,
  },
  {
    title: Strings.txtFieldDateAndTime,
    field: 'createdAt',
    type: 'custom',
    sort: true
  },
  {
    title: Strings.txtFieldType,
    field: 'type',
    type: 'custom',
    sort: true
  },
  {
    title: Strings.txtFieldAmount,
    field: 'amount',
    type: 'custom',
    sort: true
  },
  {
    title: Strings.txtFieldStatus,
    field: 'status',
    type: 'custom'
  }
]

class PointHistoryManagementPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      limit: 10,
      sortParam: null,
      isInjectOpen: false,
      isImportOpen: false,
      fileData: [],
      fileName: "",
      errorMessages: [],
      isErrorOpen: false
    };
  }
  componentDidMount() {
    this.onLoad();
  }
  onLoad = () => {
    this.onApplyFilter();
    this.props.payorStore.findAllPayors();
    this.props.employeeStore.findEmployees();
  }

  onRowClick = (rowData, index) => {
    let id = rowData.id;
    this.props.history.push(`/main/point-history-management/detail/${id}`);
  }

  onImportCSV = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const rawFile = event.target.result;

      const xlsxWorkbook = xlsx.read(rawFile, {
        type: 'binary',
        raw: true,
        cellText: true
      });
      let sheetNameList = xlsxWorkbook.SheetNames;

      let xlsxSheet = xlsxWorkbook.Sheets[sheetNameList[0]];

      let csvData = xlsx.utils.sheet_to_json(xlsxSheet, { range: 1 });
      this.replaceKeys(csvData);
      const finalData = {
        data: csvData.map(item => {
          return {
            ...item,
            employeeCode: item?.employeeID || "",
          }
        })
      }
      this.setState({ fileData: finalData, fileName: file.name });
    }
    reader.readAsBinaryString(file);
  }

  submitFunction = data => {
    this.props.pointHistoryStore.useInjectCoin(data)
      .then(created => {
        toast('Coin Injected!');
        this.setState({ isInjectOpen: false })
        this.onLoad();
      })
      .catch(err => {
        toast(Strings.txtUnexpectedError);
      });
  }

  onApplyFilter = () => {
    let filter = {
      query: this.state.query,
      payorID: this.state.payorID,
      type: this.state.type,
      status: this.state.status,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      limit: this.state.limit,
      offset: this.state.limit * (this.state.currentPage - 1)
    }

    if (this.state.sortParam) {
      filter.sort = this.state.sortParam;
    }
    this.props.pointHistoryStore.findPointHistory(filter)
  }
  onClear = () => {
    this.setState({
      query: null,
      status: null,
      payorID: null,
      type: null,
      userID: null,
      startDate: null,
      endDate: null
    })
  }
  onSort = (field, sortDirection) => {
    let sortParam = field.field + ':' + sortDirection;
    this.setState({ sortParam }, () => {
      this.onApplyFilter()
    })

  }

  replaceKeys = object => {
    Object.keys(object).forEach(key => {
      const newKey = key.replace(/\s+/g, "");
      const a = newKey.charAt(0).toLowerCase() + newKey.slice(1);
      if (object[key] && typeof object[key] === "object") {
        this.replaceKeys(object[key]);
      }
      if (key !== a) {
        object[a] = object[key];
        delete object[key];
      }
    });
  }

  onChangePage = (page) => {
    this.setState({ currentPage: page }, () => {
      this.onApplyFilter();
    })

  }
  render() {
    const role = getRole()
    const isSuperAdmin = role == 'superadmin';
    const { totalCount, pointHistoryList, editedData, isLoading } = this.props.pointHistoryStore;
    const { allPayors } = this.props.payorStore;
    const permissionRead = checkPermissionAllowed(Constants.PAGE.POINT_HISTORY, Constants.PAGE_PERMISSION.READ);
    const { classes } = this.props;
    const { employees } = this.props.employeeStore;

    return <div className="cw-defaultpage-container">
      {!!isLoading &&
        <LinearProgress
          variant="determinate"
          classes={{
            bar1Determinate: classes.loadingColor1,
            bar2Determinate: classes.loadingColor1,
            colorPrimary: classes.loadingColor2,

          }}
          value={editedData.progress}
        />
      }
      <CBreadcrumbs data={breadcrumbs} />
      <div className="header">
        <div className="title">{Strings.txtPointHistory}</div>
        <div className="buttons">
          <CButton
            onClick={() => { this.setState({ isImportOpen: true }) }}
            isLoading={this.props.pointHistoryStore.isLoading}
            type="secondary"
            containerStyle={{ width: '136px', height: '40px', marginLeft: '16px' }}>UPLOAD DATA</CButton>
          <CButton
            onClick={() => { this.setState({ isInjectOpen: true }) }}
            isLoading={this.props.pointHistoryStore.isLoading}
            type="secondary"
            containerStyle={{ width: '136px', height: '40px', marginLeft: '16px' }}>INJECT COIN</CButton>
        </div>
      </div>
      {
        permissionRead &&
        <div className="filter" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <div className="cw-row-wrap">
            {
              isSuperAdmin &&
              <CSelectInput containerStyle={{ width: '248px', marginLeft: '16px' }}
                data={allPayors} label={Strings.txtFilterByPayor}
                placeholder={Strings.txtAll}
                selectedItemID={this.state.payorID}
                onItemSelected={(item) => { this.setState({ payorID: item.id }) }} />
            }

            <CDatePicker containerStyle={{ width: '248px', marginLeft: '16px' }}
              label={Strings.txtFieldStartDate}
              selected={this.state.startDate}
              placeholderText={Strings.txtFieldStartDate}
              onChange={(value) => { this.setState({ startDate: value }) }} />
            <CDatePicker containerStyle={{ width: '248px', marginLeft: '16px' }}
              label={Strings.txtFieldEndDate}
              selected={this.state.endDate}
              placeholderText={Strings.txtFieldEndDate}
              onChange={(value) => { this.setState({ endDate: value }) }} />

            <CSelectInput containerStyle={{ width: '248px', marginLeft: '16px' }}
              data={types} label={Strings.txtFilterByType}
              placeholder={Strings.txtAll}
              selectedItemID={this.state.type}
              onItemSelected={(item) => { this.setState({ type: item.id }) }} />
            <CSelectInput containerStyle={{ width: '248px', marginLeft: '16px' }}
              data={statuses} label={Strings.txtFilterByStatus}
              placeholder={Strings.txtAll}
              selectedItemID={this.state.status}
              onItemSelected={(item) => { this.setState({ status: item.id }) }} />
            <CTextInput type="search"
              placeholder={Strings.txtPackageSearchPlaceholder}
              containerStyle={{ minWidth: '248px', marginLeft: '16px' }}
              value={this.state.query}
              onChangeValue={(value) => { this.setState({ query: value }) }}
              label={Strings.txtSearch} />
            <CButton
              onClick={() => { this.onApplyFilter() }}
              isLoading={this.props.pointHistoryStore.isLoading}
              containerStyle={{ width: '136px', height: '40px', marginLeft: '16px', marginTop: '18px' }}>{Strings.txtApply}</CButton>
            <CButton
              onClick={() => { this.onClear() }}
              type='cancel'
              containerStyle={{ width: '136px', height: '40px', marginLeft: '16px', marginTop: '18px' }}>{Strings.txtClear}</CButton>

          </div>
        </div>
      }

      {
        permissionRead &&
        <div className="content-container">
          <CMTable
            fields={fields}
            data={pointHistoryList}
            onSort={(field, sortDirection) => { this.onSort(field, sortDirection) }}
            renderCustomField={(field, rowData, rowIndex, colIndex) => {

              if (field.field == 'status') {

                return <td key={'key' + colIndex}>
                  <div style={{ justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                    <CStatus value={rowData['amount'] < 0 ? Strings.txtStatusOUT : Strings.txtStatusIN}
                      color={rowData['amount'] < 0 ? 'red' : 'green'} />
                  </div>
                </td>
              } else if (field.field == 'createdAt') {

                return <td key={'key' + colIndex}>
                  {
                    <div>{convertDatetimeToDisplay(rowData['createdAt'])}</div>
                  }
                </td>
              } else if (field.field == 'amount') {
                return <td key={'key' + colIndex}>
                  {
                    <div style={{ color: rowData['amount'] < 0 ? '#F06775' : '#68B983' }}>{rowData['amount']}</div>
                  }
                </td>
              }
              else if (field.field == 'type') {
                return <td key={'key' + colIndex}>
                  {
                    <div>{rowData['type'] == 'redeem' ? Strings.txtRedeem : Strings.txtChallenge}</div>
                  }
                </td>
              }
              else {
                return null;
              }

            }}
            onRowClick={(rowData, rowIndex) => { this.onRowClick(rowData, rowIndex) }}
            containerStyle={{ marginTop: '16px' }}
          />
          {
            totalCount > this.state.limit &&
            <CPagination
              onChange={(page) => { this.onChangePage(page) }}
              current={this.state.currentPage}
              pageSize={this.state.limit}
              total={totalCount}
            />
          }

        </div>
      }
      <ImportCoinPopup
        isUploadOpen={this.state.isImportOpen}
        closePopup={() => { this.setState({ isImportOpen: false }) }}
        onImportCSV={this.onImportCSV}
        fileData={this.state.fileData}
        fileName={this.state.fileName}
        progress={editedData.progress}
        deleteCurrentFile={() => { this.setState({ fileName: "", fileData: [] }) }}
        importFunction={() => {
          this.setState({ isImportOpen: false })
          this.props.pointHistoryStore.setEditedData({ progress: 0 });
          this.props.pointHistoryStore.useBulkInjectCoin(this.state.fileData)
            .then(created => {
              this.setState({ fileName: "", fileData: [] });
              toast("Import Successful");
              this.onLoad();
            })
            .catch(err => {
              if (Array.isArray(err.message)) {
                //Test 3
                let workbook = new Excel.Workbook();
                let worksheet = workbook.addWorksheet('Data');

                //Panduan
                worksheet.mergeCells('A1', 'E1');
                worksheet.getCell('A1').value = {
                  'richText': [
                    { 'font': { 'bold': true, 'size': 12 }, 'text': 'Panduan Penggunaan \n' },
                    { 'font': { 'size': 12 }, 'text': '1. Column ' },
                    { 'font': { 'bold': true, 'size': 12 }, 'text': 'Number ' },
                    { 'font': { 'size': 12 }, 'text': 'di isi dengan angka incremental dimulai dari angka 1\n' },
                    { 'font': { 'size': 12 }, 'text': '2. Column ' },
                    { 'font': { 'bold': true, 'size': 12 }, 'text': 'Employee ID ' },
                    { 'font': { 'size': 12 }, 'text': 'di isi dengan ID employee\n' },
                    { 'font': { 'size': 12 }, 'text': '3. Column ' },
                    { 'font': { 'bold': true, 'size': 12 }, 'text': 'Value ' },
                    { 'font': { 'size': 12 }, 'text': 'di isi dengan total coin yang akan diberikan kepada user' },
                  ]
                }
                worksheet.getCell('A1').alignment = { wrapText: true, vertical: "top" };
                worksheet.getCell('A1').font = {
                  size: 12,
                };
                worksheet.getCell('A1').fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'FFFF00' },
                  bgColor: { argb: 'FFFF00' },
                };

                const row = worksheet.getRow(1);
                row.height = 80;
                //--------------------------------------

                //Header

                worksheet.getRow(2).values = [
                  'Number',
                  'Employee ID',
                  'Value',
                  'Error'
                ];

                worksheet.columns = [
                  { key: 'number', width: 10 },
                  { key: 'employeeCode', width: 22.17 },
                  { key: 'value', width: 21 },
                  { key: 'message', width: 21 },
                ];

                worksheet.getCell('A2').font = {
                  size: 12,
                  bold: true
                };
                worksheet.getCell('B2').font = {
                  size: 12,
                  bold: true
                };
                worksheet.getCell('C2').font = {
                  size: 12,
                  bold: true
                };
                worksheet.getCell('D2').font = {
                  size: 12,
                  bold: true
                };

                worksheet.getCell('A2').fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: '9BC2E6' },
                  bgColor: { argb: '9BC2E6' },
                };
                worksheet.getCell('B2').fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: '9BC2E6' },
                  bgColor: { argb: '9BC2E6' },
                };
                worksheet.getCell('C2').fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: '9BC2E6' },
                  bgColor: { argb: '9BC2E6' },
                };
                worksheet.getCell('D2').fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: '9BC2E6' },
                  bgColor: { argb: '9BC2E6' },
                };

                worksheet.getCell('A2').border = {
                  top: { style: 'thin', color: { argb: '000000' } },
                  left: { style: 'thin', color: { argb: '000000' } },
                  bottom: { style: 'thin', color: { argb: '000000' } },
                  right: { style: 'thin', color: { argb: '000000' } }
                };
                worksheet.getCell('B2').border = {
                  top: { style: 'thin', color: { argb: '000000' } },
                  left: { style: 'thin', color: { argb: '000000' } },
                  bottom: { style: 'thin', color: { argb: '000000' } },
                  right: { style: 'thin', color: { argb: '000000' } }
                };
                worksheet.getCell('C2').border = {
                  top: { style: 'thin', color: { argb: '000000' } },
                  left: { style: 'thin', color: { argb: '000000' } },
                  bottom: { style: 'thin', color: { argb: '000000' } },
                  right: { style: 'thin', color: { argb: '000000' } }
                };
                worksheet.getCell('D2').border = {
                  top: { style: 'thin', color: { argb: '000000' } },
                  left: { style: 'thin', color: { argb: '000000' } },
                  bottom: { style: 'thin', color: { argb: '000000' } },
                  right: { style: 'thin', color: { argb: '000000' } }
                };
                //--------------------------------------

                //Adding the Data
                let data = this.state.fileData.data
                let errors = err.message;

                for (let i = 0; i < data.length; i++) {
                  for (let j = 0; j < errors.length; j++) {
                    if (data[i].number === errors[j].index) {
                      Object.assign(data[i], errors[j]);
                    }
                  }
                }

                worksheet.insertRows(3, data);

                workbook.xlsx.writeBuffer()
                  .then(buffer => saveAs(new Blob([buffer]), `Inject Coin Error Report.xlsx`))
                  .catch(err => toast(err));

                this.setState({ isErrorOpen: true, errorMessages: err.message, fileName: "", fileData: [] });
              } else {
                this.setState({ fileName: "", fileData: [] });
                toast(err.message);
              }
            })
        }}
        templateFile={'/template/Template Inject Coin.xlsx'}
      />
      <InjectCoinPopup
        isUploadOpen={this.state.isInjectOpen}
        closePopup={() => { this.setState({ isInjectOpen: false }) }}
        submitFunction={this.submitFunction}
        employees={employees}
        isLoading={isLoading}
      />
      <InjectCoinErrorPopup
        isErrorOpen={this.state.isErrorOpen}
        closePopup={() => { this.setState({ isErrorOpen: false }) }}
        errors={this.state.errorMessages}
      />
    </div>

  }
}

export default withStyles(styles)(inject('payorStore', 'pointHistoryStore', 'employeeStore')(observer(PointHistoryManagementPage)));
