import React, { Component } from 'react';
import { CBreadcrumbs, CButton, CSelectInput, CTextInput, CPagination } from '../../components/atoms'
import { CMTable } from '../../components/molecules';
import xlsx from 'xlsx';
import { Strings, Constants } from '../../constants';
import { inject, observer } from "mobx-react";
import './style/style.scss'
import { checkPermissionAllowed } from '@helpers/permissionHelper';
import { toast } from 'react-toastify';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getRole } from '@helpers/storageHelper';
import EmployeeUploadPopup from './components/EmployeeUploadPopup';
import EmployeeImportErrorPopup from './components/EmployeeImportErrorPopup';
import { withStyles } from '@material-ui/core/styles';
import * as Excel from "exceljs/dist/exceljs.min.js";
import { saveAs } from 'file-saver';

const breadcrumbs = [
    {
        to: '/main/user-management',
        title: Strings.txtUserManagement
    }
]

const payorAdminFields = [
    {
        title: Strings.txtFieldEmployeeID,
        field: 'employeeIDCode'
    },
    {
        title: Strings.txtFieldName,
        field: 'name',
        sort: true
    },
    {
        title: Strings.txtFieldPhoneNumber,
        field: 'phoneNumber'
    },
    {
        title: Strings.txtFieldJobName,
        field: 'jobName',
        sort: true
    },
    {
        title: Strings.txtFieldDepartment,
        field: 'departmentName',
        sort: true
    }
]

const styles = {
    loadingColor1: {
        backgroundColor: '#68B983'
    },
    loadingColor2: {
        backgroundColor: '#BEE1CA'
    }
}

const superAdminFields = [
    {
        title: Strings.txtFieldEmployeeID,
        field: 'employeeIDCode'
    },
    {
        title: Strings.txtFieldUserName,
        field: 'name',
        sort: true
    },
    {
        title: Strings.txtFieldPhoneNumber,
        field: 'phoneNumber'
    },
    {
        title: Strings.txtFieldPayorName,
        field: 'payorName',
        sort: true
    }
]


class EmployeeManagementPage extends Component {

    constructor(props) {
        super(props);
        const role = getRole()
        const isSuperAdmin = role == 'superadmin';
        this.state = {
            limit: 10,
            currentPage: 1,
            query: null,
            status: null,
            jobID: null,
            jobs: [],
            isSuperAdmin,
            sortParam: null,
            isUploadOpen: false,
            fileName: "",
            fileData: [],
            errorMessages: [],
            isErrorOpen: false,
        };
    }

    componentDidMount() {
        this.props.employeeStore.setEditedData({ progress: 0 })
        this.onLoad();
    }
    onLoad = () => {
        this.onApplyFilter();
        this.props.jobStore.findAllJobs()
            .then(jobs => {
                this.setState({ jobs: jobs })
            })
    }

    onRowClick = (rowData, index) => {
        let id = rowData.id;
        this.props.history.push(`/main/user-management/detail/${id}`);

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
                    if (!!this.state.isSuperAdmin) {
                        return {
                            ...item,
                            number: item.no,
                            payorID: item.payorID
                        }
                    }
                    return {
                        ...item,
                        number: item.no,
                    }
                })
            }
            this.setState({ fileData: finalData, fileName: file.name });
        }
        reader.readAsBinaryString(file);
    }

    onAddNewUser = () => {
        this.props.history.push('/main/user-management/add');
    }

    onApplyFilter = () => {
        let filter = {
            query: this.state.query,
            jobLevel: this.state.jobID,
            active: this.state.status,
            limit: this.state.limit,
            offset: this.state.limit * (this.state.currentPage - 1)
        }
        if (this.state.sortParam) {
            filter.sort = this.state.sortParam;
        }
        this.props.employeeStore.findEmployees(filter)
            .then(result => {

            })
    }
    onClear = () => {
        this.setState({
            query: null,
            status: null,
            jobID: null,
        })
    }

    onChangePage = (page) => {
        this.setState({ currentPage: page }, () => {
            this.onApplyFilter();
        })

    }

    onSort = (field, sortDirection) => {
        let sortParam = field.field + ':' + sortDirection;
        this.setState({ sortParam }, () => {
            this.onApplyFilter()
        })

    }

    render() {
        const fields = this.state.isSuperAdmin ? superAdminFields : payorAdminFields
        const permissionRead = checkPermissionAllowed(Constants.PAGE.USER_MANAGEMENT, Constants.PAGE_PERMISSION.READ);
        const permissionCreate = checkPermissionAllowed(Constants.PAGE.USER_MANAGEMENT, Constants.PAGE_PERMISSION.CREATE);
        const { totalCount, employees, editedData, isLoading } = this.props.employeeStore;
        const { classes } = this.props;

        return <div className="cw-employeemanagement-container">
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
                <div className="title">{Strings.txtUserManagement}</div>
                {
                    permissionCreate &&
                    <div className="buttons">
                        <CButton
                            // isFilePicker
                            // onFileChange={(e) => { this.onImportCSV(e) }}
                            // fileAccept=".csv"
                            onClick={() => { this.setState({ isUploadOpen: true }) }}
                            type="secondary"
                            containerStyle={{ width: '172px', height: '40px' }}>{Strings.txtImportCSV}</CButton>
                        <CButton
                            onClick={() => { this.onAddNewUser() }}
                            type="secondary"
                            containerStyle={{ width: '172px', height: '40px', marginLeft: '16px' }}>{Strings.txtAddNewUser}</CButton>
                    </div>
                }

            </div>
            {
                permissionRead &&
                <div className="filter">
                    {
                        !this.state.isSuperAdmin &&
                        <div className="cw-row">
                            <CSelectInput containerStyle={{ width: '248px' }}
                                data={this.state.jobs}
                                label={Strings.txtFilterByJobLevel}
                                placeholder={Strings.txtAll}
                                selectedItemID={this.state.jobID}
                                onItemSelected={(item) => {
                                    this.setState({ jobID: item.id })
                                }} />
                        </div>
                    }

                    <div className="cw-row">
                        <CTextInput type="search"
                            placeholder={Strings.txtUserManagementSearchPlaceholder}
                            containerStyle={{ minWidth: '248px' }}
                            value={this.state.query}
                            onChangeValue={(value) => { this.setState({ query: value }) }}
                            label={Strings.txtSearch} />
                        <CButton
                            onClick={() => { this.onApplyFilter() }}
                            isLoading={this.props.employeeStore.isLoading}
                            containerStyle={{ width: '136px', height: '40px', marginLeft: '16px', marginTop: '8px' }}>{Strings.txtApply}</CButton>
                        <CButton
                            onClick={() => { this.onClear() }}
                            type='cancel'
                            containerStyle={{ width: '136px', height: '40px', marginLeft: '16px', marginTop: '8px' }}>{Strings.txtClear}</CButton>

                    </div>
                </div>
            }
            {
                permissionRead &&
                <div className="content-container">
                    <CMTable
                        fields={fields}
                        data={employees}
                        onSort={(field, sortDirection) => { this.onSort(field, sortDirection) }}
                        renderCustomField={(row, col, field, item) => {
                            return null;
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
            <EmployeeUploadPopup
                isUploadOpen={this.state.isUploadOpen}
                closePopup={() => { this.setState({ isUploadOpen: false }) }}
                onImportCSV={this.onImportCSV}
                fileData={this.state.fileData}
                fileName={this.state.fileName}
                progress={editedData.progress}
                deleteCurrentFile={() => { this.setState({ fileName: "", fileData: [] }) }}
                importFunction={() => {
                    this.setState({ isUploadOpen: false })
                    this.props.employeeStore.setEditedData({ progress: 0 });
                    this.props.employeeStore.bulkCreateEmployee(this.state.fileData)
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
                                worksheet.mergeCells('A1', 'G1');
                                worksheet.getCell('A1').value = {
                                    'richText': [
                                        { 'font': { 'bold': true, 'size': 12 }, 'text': 'Panduan Penggunaan \n' },
                                        { 'font': { 'size': 12 }, 'text': '1. Column ' },
                                        { 'font': { 'bold': true, 'size': 12 }, 'text': 'No ' },
                                        { 'font': { 'size': 12 }, 'text': 'di isi dengan angka incremental dimulai dari angka 1\n' },
                                        { 'font': { 'size': 12 }, 'text': '2. Column ' },
                                        { 'font': { 'bold': true, 'size': 12 }, 'text': 'Full Name ' },
                                        { 'font': { 'size': 12 }, 'text': 'di isi dengan format text\n' },
                                        { 'font': { 'size': 12 }, 'text': '3. Column ' },
                                        { 'font': { 'bold': true, 'size': 12 }, 'text': 'Phone Number ' },
                                        { 'font': { 'size': 12 }, 'text': 'di isi dengan kode negara dan di ikuti dengan nomor telepon e.g: +6281010100019' },
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
                                if (!!this.state.isSuperAdmin) {
                                    worksheet.getRow(2).values = [
                                        'No',
                                        'Name',
                                        'Phone Number',
                                        'Employee ID Code',
                                        'Payor ID',
                                        'Error'
                                    ];
                                } else {
                                    worksheet.getRow(2).values = [
                                        'No',
                                        'Name',
                                        'Phone Number',
                                        'Employee ID Code',
                                        'Error'
                                    ];
                                }


                                if (!!this.state.isSuperAdmin) {
                                    worksheet.columns = [
                                        { key: 'number', width: 7 },
                                        { key: 'name', width: 10 },
                                        { key: 'phoneNumber', width: 14.33 },
                                        { key: 'employeeIDCode', width: 16 },
                                        { key: 'payorID', width: 14 },
                                        { key: 'message', width: 50 }
                                    ];
                                } else {
                                    worksheet.columns = [
                                        { key: 'number', width: 7 },
                                        { key: 'name', width: 10 },
                                        { key: 'phoneNumber', width: 14.33 },
                                        { key: 'employeeIDCode', width: 16 },
                                        { key: 'message', width: 50 }
                                    ];
                                }

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
                                if (!!this.state.isSuperAdmin) {
                                    worksheet.getCell('E2').font = {
                                        size: 12,
                                        bold: true
                                    };
                                }
                                worksheet.getCell(!!this.state.isSuperAdmin ? 'F2' : 'E2').font = {
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
                                if (!!this.state.isSuperAdmin) {
                                    worksheet.getCell('E2').fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: '9BC2E6' },
                                        bgColor: { argb: '9BC2E6' },
                                    };
                                }
                                worksheet.getCell(!!this.state.isSuperAdmin ? 'F2' : 'E2').fill = {
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
                                if (!!this.state.isSuperAdmin) {
                                    worksheet.getCell('E2').border = {
                                        top: { style: 'thin', color: { argb: '000000' } },
                                        left: { style: 'thin', color: { argb: '000000' } },
                                        bottom: { style: 'thin', color: { argb: '000000' } },
                                        right: { style: 'thin', color: { argb: '000000' } }
                                    };
                                }
                                worksheet.getCell(!!this.state.isSuperAdmin ? 'F2' : 'E2').border = {
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
                                    .then(buffer => saveAs(new Blob([buffer]), `Error Report.xlsx`))
                                    .catch(err => toast(err));

                                this.setState({ isErrorOpen: true, errorMessages: err.message, fileName: "", fileData: [] });
                            } else {
                                this.setState({ fileName: "", fileData: [] });
                                toast(err.message);
                            }
                        })
                }}
                templateFile={this.state.isSuperAdmin ?
                    '/template/Template Upload User (Superadmin).xlsx' : '/template/Template Upload User (Payor CW).xlsx'
                }
            />
            <EmployeeImportErrorPopup
                isErrorOpen={this.state.isErrorOpen}
                closePopup={() => { this.setState({ isErrorOpen: false }) }}
                errors={this.state.errorMessages}
            />
        </div>

    }
}


export default withStyles(styles)(inject('employeeStore', 'jobStore')(observer(EmployeeManagementPage)));
