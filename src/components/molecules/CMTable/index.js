import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./style.scss"

class CMTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedID: 0,
            fields: [],
            data: [],
            sortField: null,
            sortDirection: 'asc'
        };
    }

    onRowClick(rowData, rowIndex) {
        if (this.props.onRowClick) {
            this.props.onRowClick(rowData, rowIndex);
        }
        this.setState({ selectedID: rowData.id })
    }

    onHeaderClick = (field) => {
        let sortDirection = this.state.sortDirection;
        if (field.field != this.state.sortField) {
            sortDirection = 'asc';
        } else {

            sortDirection = sortDirection == 'asc' ? 'desc' : 'asc';

        }
        this.setState({ sortField: field.field, sortDirection })
        if (this.props.onSort) {
            this.props.onSort(field, sortDirection)
        }
    }
    renderHeader = (fields) => {
        return <tr key={'header-row'} className='header-row'>
            {fields.map((field, index) => {
                return this.renderHeaderField(index, field,
                    this.state.sortField, this.state.sortDirection)

            })}
        </tr>
    }

    renderHeaderField = (index, field, sortField, sortDirection) => {
        if (!field.sort) {
            return <th key={'header-col' + index} >{field.title}</th>
        } else {
            let className = 'cw-sorting';
            let sortClassName = 'fa fa-fw fa-sort';
            if (sortField == field.field) {
                if (sortDirection == 'asc') {
                    className = 'cw-sorting-asc';
                    sortClassName = 'fa fa-fw fa-sort-asc';
                }
                else {
                    className = 'cw-sorting-desc';
                    sortClassName = 'fa fa-fw fa-sort-desc';
                }
            }
            return <th className={className} key={'header-col' + index}
                onClick={() => { this.onHeaderClick(field) }}>{field.title}<i class={sortClassName}></i></th>
        }
    }

    renderRow = (rowData, fields, rowIndex, isLast) => {
        let className = isLast ? "last-row" : "rowtable";
        if (this.props.selection && rowData.id == this.state.selectedID) {
            className += " selected"
        }
        return <tr key={'row' + rowIndex} className={className} onClick={(e) => { this.onRowClick(rowData, rowIndex); }}>
            {
                fields.map((item, index) => {
                    return this.renderCell(item, rowData, rowIndex, index)
                })
            }
        </tr>
    }

    renderCell = (field, rowData, rowIndex, colIndex) => {
        const fieldName = field.field;
        if (field.type == 'custom') {
            if (this.props.renderCustomField) {
                return this.props.renderCustomField(field, rowData, rowIndex, colIndex);
            }
        }
        return <td key={'col' + colIndex}>{rowData[fieldName]}</td>
    }
    render() {
        const props = this.props;
        const data = props.data || [];
        const fields = props.fields || [];
        return <div className="cw-table-container">
            <table>
                {this.renderHeader(fields)}
                {
                    data.map((rowData, index) => {
                        return this.renderRow(rowData, fields, index, index == data.length - 1)
                    })
                }
            </table>
        </div>
    }
}

CMTable.propTypes = {
    title: PropTypes.string,
    fields: PropTypes.array,
    data: PropTypes.array,
    onRowClick: PropTypes.func,
    onSort: PropTypes.func,
    renderCustomField: PropTypes.func
};


export default CMTable